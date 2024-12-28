import React from 'react';

type CardProps = {
  id: number | string;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
  onFlip: (id: number | string) => void;
};

export const Card = ({ id, image, isFlipped, isMatched, onFlip }: CardProps) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onFlip(id);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (!isFlipped && !isMatched) {
        onFlip(id);
      }
    }
  };

  return (
    <div
      className={`card relative   w-24 h-32 sm:w-32 sm:h-40 md:w-40 md:h-48 cursor-pointer transition-transform duration-300 transform-style-preserve-3d ${
        isFlipped ? 'rotate-y-180' : ''
      } ${isMatched ? 'opacity-50 pointer-events-none' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-id={id}
      role="button"
      aria-label={isFlipped ? `Card with image ${image}` : 'Unflipped card'}
      tabIndex={0}
    >
      {/* Card Front (Image) */}
      <div className="card-face absolute w-full h-full bg-white rounded-lg shadow-md flex items-center justify-center backface-hidden transform rotate-y-180">
        <img
          src={image}
          alt="Card face"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Card Back (Default) */}
      <div className="card-back absolute w-full h-full border border-accent bg-background rounded-lg shadow-md flex items-center justify-center backface-hidden">
        <span className="text-xl font-bold text-text">?</span>
      </div>
    </div>
  );
};