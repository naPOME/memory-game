import React from 'react';

interface VictoryScreenProps {
  onRestart: () => void; // Callback to restart the game
}

export const VictoryScreen = ({ onRestart }: VictoryScreenProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Victory!</h2>
        <p className="text-lg text-gray-700 mb-6">
          Congratulations! You've matched all the cards.
        </p>
        <button
          onClick={onRestart}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};