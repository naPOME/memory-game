import React, { useState } from 'react';
import ThemeSelector from './ThemeSelector';
import { FontSelector } from './FontSelector';
import { useTheme } from '../Context/ThemeContext';
import { useGame } from '../Context/GameContext';
import { useImageCategory } from '../Context/ImageCategory'; // Import the ImageCategoryContext
import ImageCategorySelector from './CategorySelector';

const Header = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const { font } = useTheme();
  const { score, moves } = useGame();
  const { setImageCategory } = useImageCategory(); // Use the ImageCategoryContext

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const toggleCategoryModal = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  };

  const handleCategorySelect = (category: string) => {
    setImageCategory(category); // Update the category in the context
    toggleCategoryModal(); // Close the modal
  };

  return (
    <header
      className={`flex justify-between items-center p-4 bg-background text-secondary font-${font} w-4/5 m-auto border-b border-accent-100 rounded-3xl`}
    >
      <div className="flex items-center space-x-3">
        <span className="text-3xl">🧠</span>
        <h1 className="text-2xl font-bold text-primary">MindMatch</h1>
      </div>

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

      <div className="flex items-center space-x-4">
        {/* Category Icon */}
        <button
          onClick={toggleCategoryModal}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary-light dark:bg-secondary-dark hover:bg-secondary-dark dark:hover:bg-secondary-light transition"
          aria-label="Category"
        >
          <span className="text-xl">🖼️</span>
        </button>

        {/* Settings Icon */}
        <div className="relative">
          <button
            onClick={toggleSettings}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary-light dark:bg-secondary-dark hover:bg-secondary-dark dark:hover:bg-secondary-light transition"
            aria-label="Settings"
          >
            <span className="text-xl">⚙️</span>
          </button>

          {/* Settings Dropdown */}
          {isSettingsOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-secondary text-background shadow-lg rounded-lg p-4">
              <h3 className="font-bold mb-2">Settings</h3>
              <ThemeSelector />
              <FontSelector />
            </div>
          )}
        </div>
      </div>

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={toggleCategoryModal}
        >
          <div
            className={`bg-background text-text rounded-lg shadow-lg p-6 w-96 max-w-full font-${font}`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Select a Category</h2>
            <ImageCategorySelector onSelectCategory={handleCategorySelect} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;