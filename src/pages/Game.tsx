import React, { useState, useEffect, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import { VictoryScreen } from '../components/VictoryScreen';
import imageData from '../Data/ImageData.json';
import { useImageCategory } from '../Context/ImageCategory';
import { useGame } from '../Context/GameContext';
import { ConfirmationModal } from '../components/ConfirmationModal';
import Card from '../components/Card';

interface CardType {
  id: number;
  image: string;
  matched: boolean;
}

const LEVEL_CONFIG = {
  easy: { cardCount: 12, cardWidth: 'w-44 h-44', gridCols: 'lg:grid-cols-6' },
  medium: { cardCount: 24, cardWidth: 'w-44 h-28', gridCols: 'lg:grid-cols-6' },
  hard: { cardCount: 36, cardWidth: 'w-36 h-28', gridCols: 'lg:grid-cols-9' },
};

const Game = () => {
  const location = useLocation();
  const selectedLevel = location.state?.level || 'easy';
  const currentLevelConfig = LEVEL_CONFIG[selectedLevel] || LEVEL_CONFIG.easy;

  const [cards, setCards] = useState<CardType[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [showVictoryScreen, setShowVictoryScreen] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const { font } = useTheme();
  const { imageCategory, setImageCategory } = useImageCategory();
  const { score, moves, incrementScore, incrementMoves, resetGame, startTimer, stopTimer, isTimerRunning } = useGame();

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (cards.length && cards.every((card) => card.matched)) {
      stopTimer();
      setShowVictoryScreen(true);
    }
  }, [cards, stopTimer]);

  useEffect(() => {
    setShowConfirmationModal(true);
  }, [imageCategory]);

  const initializeGame = () => {
    const images = imageData[imageCategory as keyof typeof imageData] || [];
    const selectedImages = images.slice(0, currentLevelConfig.cardCount / 2);
    const shuffledCards = shuffleArray(
      selectedImages.flatMap((image, index) => [
        { id: index * 2, image, matched: false },
        { id: index * 2 + 1, image, matched: false },
      ])
    );
    setCards(shuffledCards);
    setSelectedCards([]);
    setDisabled(false);
    setShowVictoryScreen(false);
    resetGame();
  };

  const handleCardClick = (card: CardType) => {
    if (disabled || card.matched || selectedCards.includes(card)) return;

    const updatedSelectedCards = [...selectedCards, card];
    setSelectedCards(updatedSelectedCards);

    if (updatedSelectedCards.length === 2) {
      setDisabled(true);
      incrementMoves();

      if (updatedSelectedCards[0].image === updatedSelectedCards[1].image) {
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.image === card.image ? { ...c, matched: true } : c
          )
        );
        incrementScore();
        setTimeout(() => setSelectedCards([]), 500);
      } else {
        setTimeout(() => setSelectedCards([]), 1000);
      }

      setDisabled(false);
    } else if (!isTimerRunning) {
      startTimer();
    }
  };

  const handleRestart = () => initializeGame();

  const handleConfirmCategoryChange = () => {
    initializeGame();
    setShowConfirmationModal(false);
  };

  const handleCancelCategoryChange = () => {
    setImageCategory(imageCategory); 
    setShowConfirmationModal(false);
  };

  const shuffleArray = (array: CardType[]): CardType[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className={`flex flex-col items-center min-h-screen font-${font} bg-background p-4 z-10`}>
      <p className="text-lg text-text mb-4">Level: {selectedLevel}</p>
      <div className={`grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 z-0 ${currentLevelConfig.gridCols}`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isFlipped={selectedCards.includes(card) || card.matched}
            isMatched={card.matched}
            onClick={() => handleCardClick(card)}
            className={currentLevelConfig.cardWidth}
          />
        ))}
      </div>

      <button
        onClick={handleRestart}
        className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
      >
        Restart Game
      </button>

      {showVictoryScreen && <VictoryScreen onRestart={handleRestart} />}

      <ConfirmationModal
        isOpen={showConfirmationModal}
        onConfirm={handleConfirmCategoryChange}
        onCancel={handleCancelCategoryChange}
        message="Changing the image category will restart the game. Do you want to continue?"
      />
    </div>
  );
};

export default Game;
