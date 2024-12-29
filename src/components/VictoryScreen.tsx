import React from 'react';
import { useGame } from '../Context/GameContext';
import { useTheme } from '../Context/ThemeContext';
import { formatTime } from '../utill/FormatTime'; 

interface VictoryScreenProps {
  onRestart: () => void; 
}

export const VictoryScreen = ({ onRestart }: VictoryScreenProps) => {
  const { moves, score, elapsedTime } = useGame(); 
  const { font } = useTheme();

  return (
    <div className={`fixed inset-0 flex items-center font-${font} justify-center bg-background bg-opacity-50`}>
      <div className="bg-background p-8 rounded-lg shadow-lg text-center border-primary border-2 border-b-4">
        <h2 className="text-3xl font-bold text-text mb-4">Victory!</h2>
        <p className="text-lg text-text mb-6">
          Congratulations! You've matched all the cards.
        </p>
        <p className="text-sm text-text mb-6">
          Score: {score} | Moves: {moves} | Time: {formatTime(elapsedTime)} 
        </p>

        <button
          onClick={onRestart}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary hover:text-text  transition duration-200"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};