import { useState, useEffect, useRef } from 'react';
import ThemeSelector from './ThemeSelector';
import { FontSelector } from './FontSelector';
import { useTheme } from '../Context/ThemeContext';
import { useGame } from '../Context/GameContext';
import { useImageCategory } from '../Context/ImageCategory';
import ImageCategorySelector from './CategorySelector';
import { formatTime } from '../utill/FormatTime';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  elapsedTime: number;
  isTimerRunning: boolean;
}

const Header: React.FC<HeaderProps> = ({ elapsedTime, isTimerRunning }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const { font } = useTheme();
  const { score, moves } = useGame();
  const { setImageCategory } = useImageCategory();
  const settingsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const toggleCategoryModal = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleCategorySelect = (category: string) => {
    setImageCategory(category);
    toggleCategoryModal();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={`flex flex-col md:flex-row justify-between items-center p-2 md:p-4 bg-background text-secondary font-${font} w-full md:w-4/5 mx-auto rounded-md shadow-sm sticky top-0 z-50`}>
      {/* Logo Section */}
      <div className="flex items-center space-x-2 md:space-x-3 cursor-pointer" onClick={handleLogoClick}>
        <span className="text-2xl md:text-3xl">🧠</span>
        <h1 className="text-xl md:text-2xl font-bold text-text">MindMatch</h1>
      </div>

      {/* Game Stats Section */}
      {location.pathname === '/game' && (
        <div className="flex items-center space-x-2 md:space-x-4 font-thin text-xs md:text-sm mt-2 md:mt-0">
          <div className="text-center">
            <p className="text-secondary">Score</p>
            <p className="text-text">{score}</p>
          </div>
          <div className="text-center">
            <p className="text-secondary">Moves</p>
            <p className="text-text">{moves}</p>
          </div>
          <div className="text-center">
            <p className="text-secondary">Time</p>
            <p className="text-text">{formatTime(elapsedTime)}</p>
          </div>
        </div>
      )}

      {/* Settings and Category Buttons */}
      <div className="flex items-center space-x-2 md:space-x-4 mt-2 md:mt-0">
        <button
          onClick={toggleCategoryModal}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary-light dark:bg-secondary-dark hover:bg-secondary-dark dark:hover:bg-secondary-light transition"
          aria-label="Category"
        >
          <span className="text-xl">🖼️</span>
        </button>

        <div className="relative" ref={settingsRef}>
          <button
            onClick={toggleSettings}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary-light dark:bg-secondary-dark hover:bg-secondary-dark dark:hover:bg-secondary-light transition"
            aria-label="Settings"
          >
            <span className="text-xl">⚙️</span>
          </button>

          {isSettingsOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-secondary text-background shadow-lg rounded-lg p-4 z-50">
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
            className={`bg-background text-text rounded-lg shadow-lg p-4 md:p-6 w-11/12 md:w-96 max-w-full font-${font}`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Select a Category</h2>
            <ImageCategorySelector onSelectCategory={handleCategorySelect} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;