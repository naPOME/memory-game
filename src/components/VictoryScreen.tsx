import React from 'react';
import { useGame } from '../Context/GameContext';
import { useTheme } from '../Context/ThemeContext';

interface VictoryScreenProps {
  onRestart: () => void; // Callback to restart the game
}

export const VictoryScreen = ({ onRestart }: VictoryScreenProps) => {
  const {moves,score} = useGame()
  const {font} = useTheme();
  return (
    <div className={`fixed inset-0 flex items-center font-${font} justify-center bg-background bg-opacity-50`}>
      <div className="bg-background p-8 rounded-lg shadow-lg text-center border-primary border-2 border-b-4">
        <h2 className="text-3xl font-bold text-text mb-4">Victory!</h2>
        <p className="text-lg text-text mb-6">
          Congratulations!  You've matched all the cards.
        </p>
        <p className='text-sm text-text mb-6'>Score: {score} Moves: {moves} </p>

        <button
          onClick={onRestart}
          className="px-6 py-2 bg-green-500 text-text rounded-lg hover:bg-green-600 transition duration-200"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};