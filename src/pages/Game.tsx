import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import { VictoryScreen } from '../components/VictoryScreen';
import imageData from '../Data/ImageData.json';
import { useImageCategory } from '../Context/ImageCategory'; 
import { useGame } from '../Context/GameContext';
import { ConfirmationModal } from '../components/ConfirmationModal'; 

interface Card {
  id: number;
  image: string;
  matched: boolean;
}

const Game = () => {
  const location = useLocation();
  const selectedLevel = location.state?.level || 'easy'; 
  const [cards, setCards] = useState<Card[]>([]);
  const [firstCard, setFirstCard] = useState<Card | null>(null);
  const [secondCard, setSecondCard] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [showVictoryScreen, setShowVictoryScreen] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for modal visibility
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

  
  const getCardWidth = () => {
    switch (selectedLevel) {
      case 'easy':
        return 'w-44 h-44'; 
      case 'medium':
        return 'w-44 h-28'; 
      case 'hard':
        return 'w-36 h-28 lg:grid-cols-9'; 
      default:
        return 'w-44 h-44 '; 
    }
  };
  const getCardAlignment = () => {
    switch (selectedLevel) {
      
      case 'hard':
        return 'lg:grid-cols-9'; 
      default:
        return 'lg:grid-cols-6'; 
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

  const shuffleArray = (array: Card[]): Card[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setShowVictoryScreen(true);
      stopTimer(); 
    }
  }, [cards]);

  const handleCardClick = (card: Card) => {
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

  return (
    <div className={`flex flex-col items-center  min-h-screen font-${font} bg-background p-4 z-10`}>
      {/* <h1 className="text-4xl font-bold text-primary mb-6">Memory Game</h1> */}
      <p className="text-lg text-text mb-4">Level: {selectedLevel}</p>
      <div className={`grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 z-0 ${getCardAlignment()}`}>
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card)}
            className={`card ${getCardWidth()}  cursor-pointer rounded-lg shadow-md transition-transform z-10 transform-style-preserve-3d ${
              card === firstCard || card === secondCard || card.matched ? 'flipped' : ''
            } ${matchedCards.includes(card.id) ? 'animate-pulse' : ''}`}
          >
            <div className="card-inner w-full h-full relative">
              <div className="card-front absolute w-full h-full bg-background border border-b-2 border-accent rounded-lg flex items-center justify-center backface-hidden">
                <span className="text-xl font-bold text-primary">?</span>
              </div>
              <div className="card-back absolute w-full h-full bg-white rounded-lg flex items-center justify-center backface-hidden z-0 transform rotate-y-180">
                <img
                  src={card.image}
                  alt="Card"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Restart Button */}
      <button
        onClick={handleRestart}
        className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
      >
        Restart Game
      </button>

      {/* Victory Screen */}
      {showVictoryScreen && <VictoryScreen onRestart={handleRestart} />}

      {/* Confirmation Modal */}
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