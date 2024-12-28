import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGame } from '../Context/GameContext';
import { shuffleArray } from '../utill/Shuffle';
import { useTheme } from '../Context/ThemeContext';

interface Card {
  id: number;
  image: string;
  matched: boolean;
}

const Game = () => {
  const location = useLocation();
  const { level, incrementMoves, updateScore, resetGame } = useGame();
  const { font } = useTheme();

  const [cards, setCards] = useState<Card[]>([]);
  const [firstCard, setFirstCard] = useState<Card | null>(null);
  const [secondCard, setSecondCard] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);

  // Initialize cards based on level
  useEffect(() => {
    resetGame();
    const cardCount = level === 'medium' ? 24 : level === 'hard' ? 36 : 12;
    const images = [
      'https://picsum.photos/200/300',
      'https://picsum.photos/201/300',
      'https://picsum.photos/202/300',
      'https://picsum.photos/203/300',
      'https://picsum.photos/204/300',
      'https://picsum.photos/205/300',
    ];
    const initialCards = Array.from({ length: cardCount / 2 }, (_, i) => ({
      id: i,
      image: images[i % images.length],
      matched: false,
    }));
    const shuffledCards = shuffleArray([...initialCards, ...initialCards]);
    setCards(shuffledCards);
  }, [level, resetGame]);

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
        // Cards match
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.image === card.image ? { ...c, matched: true } : c
          )
        );
        updateScore(10);
        resetTurn();
      } else {
        // No match
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
    resetGame();
    setCards([]);
    setTimeout(() => {
      const cardCount = level === 'medium' ? 24 : level === 'hard' ? 36 : 12;
      const images = [
        'https://picsum.photos/200/300',
        'https://picsum.photos/201/300',
        'https://picsum.photos/202/300',
        'https://picsum.photos/203/300',
        'https://picsum.photos/204/300',
        'https://picsum.photos/205/300',
      ];
      const initialCards = Array.from({ length: cardCount / 2 }, (_, i) => ({
        id: i,
        image: images[i % images.length],
        matched: false,
      }));
      const shuffledCards = shuffleArray([...initialCards, ...initialCards]);
      setCards(shuffledCards);
    }, 100);
  };

  return (
    <div className={`flex flex-col items-center min-h-screen font-${font} bg-gray-100 p-4`}>
      <h1 className="text-4xl font-bold text-gray-700 mb-6">Memory Game</h1>
      <div
        className={`grid gap-4 ${
          level === 'easy' ? 'grid-cols-6' : level === 'medium' ? 'grid-cols-8' : 'grid-cols-12'
        }`}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card)}
            className={`card w-32 h-20 cursor-pointer rounded-lg shadow-md transition-transform transform-style-preserve-3d ${
              card === firstCard || card === secondCard || card.matched ? 'flipped' : ''
            }`}
          >
            <div className="card-inner w-full h-full relative">
              <div className="card-front absolute w-full h-full bg-gray-300 rounded-lg flex items-center justify-center backface-hidden">
                <span className="text-xl font-bold text-gray-700">?</span>
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
      <button
        onClick={handleRestart}
        className="mt-8 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-200"
      >
        Restart Game
      </button>
    </div>
  );
};

export default Game;