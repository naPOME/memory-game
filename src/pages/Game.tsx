import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import { VictoryScreen } from '../components/VictoryScreen';
import { useImageCategory } from '../Context/ImageCategory';
import { useGame } from '../Context/GameContext';
import { ConfirmationModal } from '../components/ConfirmationModal';
import CardGrid from '../components/CardGrid';
import useGameLogic from '../hooks/useGameLogic';
import getCardStyles from '../utill/getCardStyles';
const Game = () => {
  const location = useLocation();
  const selectedLevel = location.state?.level || 'easy';
  const { font } = useTheme();
  const { imageCategory, setImageCategory } = useImageCategory();
  const { stopTimer, resetGame, startTimer, isTimerRunning } = useGame();
  const [showVictoryScreen, setShowVictoryScreen] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { cards, firstCard, secondCard, disabled, handleCardClick, initializeGame } = useGameLogic(selectedLevel, imageCategory);
  const { width, alignment, gap } = getCardStyles(selectedLevel);

  const handleRestart = () => {
    initializeGame();
    resetGame();
  };

  const handleConfirmCategoryChange = () => {
    initializeGame();
    setShowConfirmationModal(false);
  };

  const handleCancelCategoryChange = () => {
    setShowConfirmationModal(false);
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setShowVictoryScreen(true);
      stopTimer();
    }
  }, [cards]);

  return (
    <div className={`flex flex-col items-center min-h-screen font-${font} bg-background p-4 z-10`}>
      <p className="text-lg text-text mb-4">Level: {selectedLevel}</p>
      <CardGrid
        cards={cards}
        firstCard={firstCard}
        secondCard={secondCard}
        disabled={disabled}
        handleCardClick={handleCardClick}
        width={width}
        alignment={alignment}
        gap={gap}
      />
      <button
        onClick={handleRestart}
        className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
      >
        Restart Game
      </button>
      {showVictoryScreen && <VictoryScreen onRestart={handleRestart} />}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onConfirm={handleConfirmCategoryChange}
        onCancel={handleCancelCategoryChange}
        message="Changing the image category will restart the game. Do you want to continue?"
      />
    </div>
  );
};

export default Game;