import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import { Button } from '../Button';

export const LevelSelector = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('easy');
  const navigate = useNavigate();
  const { font } = useTheme();

  const levels = ['easy', 'medium', 'hard'];

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
  };

  const handleStart = () => {
    navigate('/game', { state: { level: selectedLevel } });
  };

  return (
    <div className={`flex flex-col items-center mt-10 h-[90vh] bg-background font-${font} text-text`}>
      <h2 className="text-3xl font-bold mb-6 text-primary">
         Game Level
      </h2>

      <div className="flex flex-col items-center space-y-6">
        {levels.map((level) => (
          <Button
            key={level}
            label={level.charAt(0).toUpperCase() + level.slice(1)}
            onClick={() => handleLevelChange(level)}
            className={`btn px-6 py-3 rounded-full text-xl font-bold transition duration-300 
              ${selectedLevel === level 
                ? 'bg-primary text-background shadow-xl hover:bg-gray-500' 
                : 'bg-secondary text-background hover:bg-accent'
              }`}
          />
        ))}
      </div>

      <button
        onClick={handleStart}
        className="px-8 py-2 mt-16  text-text rounded-2xl font-bold text-xl border border-accent hover:bg-accent hover:text-primary transition duration-300 transform hover:scale-105"
      >
        START GAME
      </button>
    </div>
  );
};
