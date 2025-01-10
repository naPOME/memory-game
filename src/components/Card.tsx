import React from 'react';

interface CardProps {
  card: {
    id: number;
    image: string;
    matched: boolean;
  };
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  className: string;
}

const Card: React.FC<CardProps> = ({ card, isFlipped, isMatched, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={`card ${className} cursor-pointer rounded-lg shadow-md transition-transform transform-style-preserve-3d  ${
        isFlipped || isMatched ? 'flipped' : ''
      } ${isMatched ? 'animate-pulse' : ''}`}
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
  );
};

export default Card;