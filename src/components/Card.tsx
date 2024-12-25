import React from 'react';

type CardProps = {
  id: number | string;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
  onFlip: (id: number | string) => void;
};

export const Card = ({ id, image, isFlipped, isMatched, onFlip }: CardProps) => {
  return (
    <div
      className={`card bg-base-100 w-96 shadow-xl transition-transform duration-300 
        ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched opacity-50' : ''}`}
      onClick={() => {
        if (!isFlipped && !isMatched) {
          onFlip(id);
        }
      }}
      data-id={id} 
    >
      {isFlipped ? (
        <img src={image} alt="Card face" className="card-face w-full h-full object-cover" />
      ) : (
        <div className="card-back bg-gray-300 flex items-center justify-center">
          Card Back
        </div>
      )}
    </div>
  );
};
