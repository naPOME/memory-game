import React from 'react';

interface Card {
  id: number;
  image: string;
  matched: boolean;
}

interface CardGridProps {
  cards: Card[];
  level: string;
  firstCard: Card | null;
  secondCard: Card | null;
  disabled: boolean;
  handleCardClick: (card: Card) => void;
}

const CardGrid = ({ cards, level, firstCard, secondCard, disabled, handleCardClick }: CardGridProps) => {
  return (
    <div
      className={`grid gap-4 ${
        level === 'easy' ? 'grid-cols-6' : level === 'medium' ? 'grid-cols-8' : 'grid-cols-12'
      }`}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          onClick={() => handleCardClick(card)}
          className={`card w-32 h-20 cursor-pointer rounded-lg bg-primary shadow-md transition-transform transform-style-preserve-3d ${
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
  );
};

export default CardGrid;