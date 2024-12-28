import React, { useState, useEffect } from 'react';
import { useTheme } from '../Context/ThemeContext';

const themes = [
  {
    name: 'theme1', // Iceberg Light
    primary: '#2D539E',
    secondary: '#262A3F',
    accent: '#ADB1C4',
    background: '#E8E9EC',
    text: '#33374C',
  },
  {
    name: 'theme2', // Graen
    primary: '#A59682',
    secondary: '#A59682',
    accent: '#181D1A',
    background: '#303C36',
    text: '#A59682',
  },
  {
    name: 'theme3', // Gruvbox Dark
    primary: '#689D6A',
    secondary: '#689D6A',
    accent: '#A89984',
    background: '#FBF1C7',
    text: '#3C3836',
  },
  {
    name: 'theme4', // Hedge
    primary: '#6A994E',
    secondary: '#F2EFBB',
    accent: '#EDE5B4',
    background: '#415E31',
    text: '#F7F1D6',
  },
  {
    name: 'theme5', // Honey
    primary: '#FFF546',
    secondary: '#795200',
    accent: '#A66B00',
    background: '#F2AA00',
    text: '#F3EECB',
  },
];

const ThemeSelector = () => {
  const { theme, setTheme, font } = useTheme();
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen((prev) => !prev);

  const handleThemeSelect = (selectedTheme: string) => {
    setTheme(selectedTheme);
    setModalOpen(false);
  };

  const currentTheme = themes.find((t) => t.name === theme) || themes[0];

  // Function to determine text color based on background brightness
  const getTextColor = (backgroundColor: string) => {
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF'; // Use black or white text based on brightness
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className={`relative theme-selector font-extralight text-xs font-${font}`}>
      {/* Theme Selector Button */}
      <button
        onClick={toggleModal}
        aria-expanded={isModalOpen}
        aria-controls="theme-modal"
        className={`flex items-center px-3 py-1 border text-background font-extrabold border-dashed rounded-xl shadow-md transition text-md font-${font}`}
        style={{
          backgroundColor: currentTheme.primary,
          borderColor: currentTheme.accent,
        }}
      >
        <span className="mr-2">Themes</span>
        <div
          className="w-6 h-6 rounded-full"
          style={{
            background: `linear-gradient(45deg, ${currentTheme.primary}, ${currentTheme.accent})`,
          }}
        />
      </button>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          {/* Modal Content */}
          <div
            id="theme-modal"
            className={`rounded-lg shadow-lg p-6 w-96 max-w-full font-${font}`}
            style={{ backgroundColor: currentTheme.background }}
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
          >
            <h2 className="text-xl font-bold mb-4" style={{ color: currentTheme.text }}>
              Select a Theme
            </h2>
            <div className="space-y-3">
              {themes.map((t) => {
                const textColor = getTextColor(currentTheme.background); // Dynamically determine text color
                return (
                  <button
                    key={t.name}
                    onClick={() => handleThemeSelect(t.name)}
                    className={`flex items-center w-full px-4 py-2 rounded-lg transition-all hover:scale-105`}
                    style={{
                      backgroundColor: currentTheme.background, // Same background for all buttons
                      color: textColor, // Use dynamically determined text color
                    }}
                  >
                    {/* Three rounded colors representing primary, secondary, and accent */}
                    <div className="flex space-x-2">
                      <div
                        className="w-6 h-6 rounded-full border-2 hover:border-primary"
                        style={{ backgroundColor: t.primary, borderColor: t.accent }}
                      />
                      <div
                        className="w-6 h-6 rounded-full border-2 hover:border-secondary"
                        style={{ backgroundColor: t.secondary, borderColor: t.accent }}
                      />
                      <div
                        className="w-6 h-6 rounded-full border-2 hover:border-accent"
                        style={{ backgroundColor: t.accent, borderColor: t.primary }}
                      />
                    </div>
                    <span className="ml-3 text-sm font-medium">{t.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;