import React from 'react';
import Card from '../components/Card';

interface CardType {
  id: number;
  image: string;
  matched: boolean;
}

interface CardGridProps {
  cards: CardType[];
  firstCard: CardType | null;
  secondCard: CardType | null;
  disabled: boolean;
  handleCardClick: (card: CardType) => void;
  width: string;
  alignment: string;
  gap: string;
}

const CardGrid: React.FC<CardGridProps> = ({
  cards,
  firstCard,
  secondCard,
  disabled,
  handleCardClick,
  width,
  alignment,
  gap,
}) => {
  return (
    <div className={`grid ${gap} sm:grid-cols-3 md:grid-cols-4 ${alignment}`}>
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
  );
};

export default CardGrid;