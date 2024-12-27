import React, { useState } from 'react';
import ThemeSelector from './ThemeSelector';
import { FontSelector } from './FontSelector';
import { useTheme } from '../Context/ThemeContext';

const Header = ({ score, moves }: { score: number; moves: number }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { font } = useTheme(); // Access the font from the theme context

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <header
      className={`flex justify-between items-center p-4 bg-background text-secondary font-${font} w-4/5 m-auto border-2 border-accent-100 rounded-3xl`}
    >
      <h1 className="text-xl ">Memory Game</h1>

      <div className="flex items-center space-x-4 font-thin text-xs">
        <div className="text-center">
          <p className="">Score</p>
          <p className="text-text">{score}</p>
        </div>
        <div className="text-center">
          <p className="text-secondary">Moves</p>
          <p className="text-text">{moves}</p>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={toggleSettings}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary-light dark:bg-secondary-dark hover:bg-secondary-dark dark:hover:bg-secondary-light transition"
          aria-label="Settings"
        >
          <span className="">@</span>
        </button>

        {isSettingsOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-secondary text-background shadow-lg rounded-lg p-4">
            <h3 className="font-bold mb-2">Settings</h3>
            <ThemeSelector />
            <FontSelector />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
