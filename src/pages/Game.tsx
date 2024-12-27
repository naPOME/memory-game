import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGame } from '../Context/GameContext';
import { shuffleArray } from '../utill/Shuffle';

interface Card {
  id: number;
  value: string;
  matched: boolean;
}

const Game = () => {
  const location = useLocation();
  const { level, incrementMoves, updateScore, resetGame } = useGame();

  const [cards, setCards] = useState<Card[]>([]);
  const [firstCard, setFirstCard] = useState<Card | null>(null);
  const [secondCard, setSecondCard] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    // Reset game state and initialize cards
    resetGame();
    const cardCount = location.state?.level === 'medium' ? 24 : location.state?.level === 'hard' ? 36 : 12;
    const initialCards = Array.from({ length: cardCount / 2 }, (_, i) => ({
      id: i,
      value: `Card ${i + 1}`,
      matched: false,
    }));
    const shuffledCards = shuffleArray([...initialCards, ...initialCards]);
    setCards(shuffledCards);
  }, [location.state?.level, resetGame]);

  const handleCardClick = (card: Card) => {
    if (disabled || card.matched || (firstCard && card.id === firstCard.id)) return;

    if (!firstCard) {
      setFirstCard(card);
    } else {
      setSecondCard(card);
      setDisabled(true);
      incrementMoves();

      if (firstCard.value === card.value) {
        // Cards match
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.value === card.value ? { ...c, matched: true } : c
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

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-700 mb-6">Memory Game</h1>
      <div
        className={`grid gap-4 ${
          level === 'hard' ? 'grid-cols-6' : level === 'medium' ? 'grid-cols-4' : 'grid-cols-3'
        }`}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card)}
            className={`w-20 h-28 flex items-center justify-center cursor-pointer border rounded-lg shadow-md 
              ${
                card.matched || card === firstCard || card === secondCard
                  ? 'bg-green-300 text-gray-800'
                  : 'bg-gray-300'
              }`}
          >
            {(card.matched || card === firstCard || card === secondCard) && (
              <span className="text-xl font-bold">{card.value}</span>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() => window.location.reload()}
        className="mt-8 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-200"
      >
        Restart Game
      </button>
    </div>
  );
};

export default Game;
