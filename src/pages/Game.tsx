import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import { VictoryScreen } from '../components/VictoryScreen';
import imageData from '../Data/ImageData.json';
import { useImageCategory } from '../Context/ImageCategory'; // Import the context
import { useGame } from '../Context/GameContext';

interface Card {
  id: number;
  image: string;
  matched: boolean;
}

const Game = () => {
  const location = useLocation();
  const selectedLevel = location.state?.level || 'easy'; // Default to 'easy' if no level is provided
  const [cards, setCards] = useState<Card[]>([]);
  const [firstCard, setFirstCard] = useState<Card | null>(null);
  const [secondCard, setSecondCard] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [showVictoryScreen, setShowVictoryScreen] = useState(false);
  const { font } = useTheme();
  const { imageCategory, setImageCategory, resetGame: resetImageCategory } = useImageCategory(); // Consume the context
  const { score, moves, incrementScore, incrementMoves, resetGame } = useGame();
  const prevImageCategory = useRef(imageCategory); // Track the previous image category

  // Determine the number of cards based on the selected level
  const getCardCount = () => {
    switch (selectedLevel) {
      case 'easy':
        return 12;
      case 'medium':
        return 24;
      case 'hard':
        return 36;
      default:
        return 12; // Default to easy
    }
  };

  // Generate cards based on the selected category and level
  useEffect(() => {
    if (prevImageCategory.current !== imageCategory) {
      const confirmChange = window.confirm(
        'Changing the image category will restart the game. Do you want to continue?'
      );
      if (!confirmChange) {
        // If the user cancels, revert to the previous category
        setImageCategory(prevImageCategory.current);
        return;
      }
    }

    const images = imageData[imageCategory as keyof typeof imageData];
    const cardCount = getCardCount();
    const selectedImages = images.slice(0, cardCount / 2); // Select half the required images
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
    resetGame(); // Reset the game state (score and moves)

    prevImageCategory.current = imageCategory; // Update the previous category
  }, [imageCategory, selectedLevel]);

  // Shuffle array function
  const shuffleArray = (array: Card[]): Card[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Check if all cards are matched
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setShowVictoryScreen(true);
    }
  }, [cards]);

  // Handle card click
  const handleCardClick = (card: Card) => {
    if (disabled || card.matched || card === firstCard) return;

    if (!firstCard) {
      setFirstCard(card);
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

  // Reset turn
  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  };

  // Restart game
  const handleRestart = () => {
    const images = imageData[imageCategory as keyof typeof imageData];
    const cardCount = getCardCount();
    const selectedImages = images.slice(0, cardCount / 2); // Select half the required images
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
    resetImageCategory(imageCategory);
  };

  return (
    <div className={`flex flex-col items-center min-h-screen font-${font} bg-background p-4`}>
      <h1 className="text-4xl font-bold text-primary mb-6">Memory Game</h1>
      <p className="text-lg text-text mb-4">Level: {selectedLevel}</p>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card)}
            className={`card w-32 h-16 cursor-pointer rounded-lg shadow-md transition-transform transform-style-preserve-3d ${
              card === firstCard || card === secondCard || card.matched ? 'flipped' : ''
            } ${matchedCards.includes(card.id) ? 'animate-pulse' : ''}`}
          >
            <div className="card-inner w-full h-full relative">
              <div className="card-front absolute w-full h-full bg-background border border-b-2 border-accent rounded-lg flex items-center justify-center backface-hidden">
                <span className="text-xl font-bold text-primary">?</span>
              </div>
              <div className="card-back absolute w-full h-full bg-white rounded-lg flex items-center justify-center backface-hidden transform rotate-y-180">
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

      {showVictoryScreen && <VictoryScreen onRestart={handleRestart} />}
    </div>
  );
};

export default Game;