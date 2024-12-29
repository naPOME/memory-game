// src/components/Game/Game.tsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import  VictoryScreen  from '../components/VictoryScreen';
import useGameLogic from '../hooks/useGameLogic';
import Card from '../components/Card';
import CategoryModal from '../components/CategoryModel.tsx/CategoryModel';

const Game = () => {
  const location = useLocation();
  const selectedLevel = location.state?.level || 'easy';
  const { font } = useTheme();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const {
    cards,
    firstCard,
    secondCard,
    disabled,
    matchedCards,
    generateCards,
    setFirstCard,
    setSecondCard,
    setDisabled,
    setMatchedCards,
  } = useGameLogic(selectedLevel);

  const handleCardClick = (card: Card) => {
    if (disabled || card.matched || card === firstCard) return;

    if (!firstCard) {
      setFirstCard(card);
    } else {
      setSecondCard(card);
      setDisabled(true);

      if (firstCard.image === card.image) {
        setCards((prevCards) =>
          prevCards.map((c) => (c.image === card.image ? { ...c, matched: true } : c))
        );
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

  const handleCategoryChange = (confirmed: boolean) => {
    if (confirmed) {
      generateCards();
    }
    setShowCategoryModal(false);
  };

  return (
    <div className={`flex flex-col items-center min-h-screen font-${font} bg-background p-4`}>
      <h1 className="text-4xl font-bold text-primary mb-6">Memory Game</h1>
      <p className="text-lg text-text mb-4">Level: {selectedLevel}</p>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isFlipped={card === firstCard || card === secondCard || card.matched}
            isPulsing={matchedCards.includes(card.id)}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>

      <CategoryModal
        isOpen={showCategoryModal}
        onConfirm={() => handleCategoryChange(true)}
        onCancel={() => handleCategoryChange(false)}
      />
    </div>
  );
};

export default Game;