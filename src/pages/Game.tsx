import React, { useState } from 'react';
import { useTheme } from '../Context/ThemeContext';

interface Card {
  id: number;
  image: string;
  matched: boolean;
}

const Game = () => {
  const [cards, setCards] = useState<Card[]>([
    { id: 1, image: 'https://via.placeholder.com/200x300.png?text=Image+1', matched: false },
    { id: 2, image: 'https://via.placeholder.com/200x300.png?text=Image+1', matched: false },
    { id: 3, image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg', matched: false },
    { id: 4, image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg', matched: false },
  ]);
  const [firstCard, setFirstCard] = useState<Card | null>(null);
  const [secondCard, setSecondCard] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [matchedCards, setMatchedCards] = useState<number[]>([]); 
const {font} = useTheme()
  
  const handleCardClick = (card: Card) => {
    if (disabled || card.matched || card === firstCard) return;

    if (!firstCard) {
      setFirstCard(card);
    } else {
      setSecondCard(card);
      setDisabled(true);

      if (firstCard.image === card.image) {
        
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.image === card.image ? { ...c, matched: true } : c
          )
        );
        
        setMatchedCards([firstCard.id, card.id]);
        
        setTimeout(() => setMatchedCards([]), 500);
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
    <div className={`flex flex-col items-center min-h-screen font-${font} bg-background p-4`}>
      <h1 className="text-4xl font-bold text-background mb-6">Memory Game </h1>
      <div className="grid gap-4 grid-cols-2">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card)}
            className={`card w-32 h-20 cursor-pointer rounded-lg shadow-md transition-transform transform-style-preserve-3d ${
              card === firstCard || card === secondCard || card.matched ? 'flipped' : ''
            } ${matchedCards.includes(card.id) ? 'animate-pulse' : ''}`}
          >
            <div className="card-inner w-full h-full relative">
              <div className="card-front absolute w-full h-full bg-background border border-accent rounded-lg flex items-center justify-center backface-hidden">
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
    </div>
  );
};

export default Game;