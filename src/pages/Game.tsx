import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import { VictoryScreen } from '../components/VictoryScreen';
import imageData from '../Data/ImageData.json';
import { useImageCategory } from '../Context/ImageCategory';
import { useGame } from '../Context/GameContext';
import { ConfirmationModal } from '../components/ConfirmationModal';
import Card from '../components/Card';
import { shuffleArray } from '../utill/Shuffle';

interface CardType {
  id: number;
  image: string;
  matched: boolean;
}

const getCardStyles = (level: string) => {
  switch (level) {
    case 'easy':
      return {
        width: 'w-20 h-20 sm:w-20 sm:h-20 md:w-44 md:h-44 lg:w-48 lg:h-48',
        alignment: 'lg:grid-cols-6 grid-cols-3',
        gap: 'gap-4',
      };
    case 'medium':
      return {
        width: 'w-16 h-16 sm:w-24 sm:h-20 md:w-48 md:h-28 lg:w-44 lg:h-28',
        alignment: 'lg:grid-cols-6 grid-cols-4',
        gap: 'gap-4',
      };
    case 'hard':
      return {
        width: 'w-12 h-12 sm:w-20 sm:h-16 md:w-36 md:h-28 lg:w-36 lg:h-28',
        alignment: 'lg:grid-cols-9 grid-col-5 grid-cols-6',
        gap: 'gap-3',
      };
    default:
      return {
        width: 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28',
        alignment: 'lg:grid-cols-6 grid-cols-3',
        gap: 'gap-4',
      };
  }
};

const Game = () => {
  const location = useLocation();
  const selectedLevel = location.state?.level || 'easy';
  const [cards, setCards] = useState<CardType[]>([]);
  const [firstCard, setFirstCard] = useState<CardType | null>(null);
  const [secondCard, setSecondCard] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [showVictoryScreen, setShowVictoryScreen] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { font } = useTheme();
  const { imageCategory, setImageCategory } = useImageCategory();
  const { score, moves, incrementScore, incrementMoves, resetGame, startTimer, stopTimer, isTimerRunning } = useGame();
  const prevImageCategory = useRef(imageCategory);

  const getCardCount = () => {
    switch (selectedLevel) {
      case 'easy':
        return 12;
      case 'medium':
        return 24;
      case 'hard':
        return 36;
      default:
        return 12;
    }
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (prevImageCategory.current !== imageCategory) {
      setShowConfirmationModal(true);
    }
  }, [imageCategory]);

  const initializeGame = () => {
    const images = imageData[imageCategory as keyof typeof imageData];
    const cardCount = getCardCount();
    const selectedImages = images.slice(0, cardCount / 2);
    const cardPairs = [...selectedImages, ...selectedImages].map((image, index) => ({
      id: index,
      image,
      matched: false,
    }));
    const shuffledCards = shuffleArray(cardPairs);
    setCards(shuffledCards);
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
    setShowVictoryScreen(false);
    resetGame();
    prevImageCategory.current = imageCategory;
  };

  const handleConfirmCategoryChange = () => {
    initializeGame();
    setShowConfirmationModal(false);
  };

  const handleCancelCategoryChange = () => {
    setImageCategory(prevImageCategory.current);
    setShowConfirmationModal(false);
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setShowVictoryScreen(true);
      stopTimer();
    }
  }, [cards]);

  const handleCardClick = (card: CardType) => {
    if (disabled || card.matched || card === firstCard) return;

    if (!firstCard) {
      setFirstCard(card);
      if (!isTimerRunning) {
        startTimer();
      }
    } else {
      setSecondCard(card);
      setDisabled(true);
      incrementMoves();

      if (firstCard.image === card.image) {
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.image === card.image ? { ...c, matched: true } : c
          )
        );
        incrementScore();
        setMatchedCards([firstCard.id, card.id]);
        setTimeout(() => setMatchedCards([]), 500);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  };

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  };

  const handleRestart = () => {
    initializeGame();
  };

  const { width, alignment, gap } = getCardStyles(selectedLevel);

  return (
    <div className={`flex flex-col items-center min-h-screen font-${font} bg-background p-4 z-10`}>
      <p className="text-lg text-text mb-4">Level: {selectedLevel}</p>
      <div className={`grid ${gap}  sm:grid-cols-3 md:grid-cols-4 ${alignment}`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isFlipped={card === firstCard || card === secondCard}
            isMatched={card.matched}
            onClick={() => handleCardClick(card)}
            className={width}
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