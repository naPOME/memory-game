import React, { useState, useEffect } from 'react';
import { useTheme } from '../Context/ThemeContext';

const themes = [
  { name: 'Default', primary: '#4CAF50', secondary: '#8BC34A', accent: '#FFC107' },
  { name: 'theme2', primary: '#3F51B5', secondary: '#03A9F4', accent: '#E91E63' },
  { name: 'theme3', primary: '#FF5722', secondary: '#FFC107', accent: '#4CAF50' },
  { name: 'theme4', primary: '#9C27B0', secondary: '#673AB7', accent: '#03A9F4' },
  { name: 'theme5', primary: '#F44336', secondary: '#E91E63', accent: '#9C27B0' },
];

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleThemeSelect = (selectedTheme: string) => {
    setTheme(selectedTheme);
    setDropdownOpen(false); // Close dropdown after selection
  };

  const currentTheme = themes.find((t) => t.name === theme) || themes[0]; // Fallback to first theme

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.theme-selector')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative theme-selector">
      {/* Current Theme Button */}
      <button
        onClick={toggleDropdown}
        aria-expanded={isDropdownOpen}
        aria-controls="theme-dropdown"
        className="flex items-center px-4 py-2 border-2 rounded-md shadow-md transition"
        style={{
          backgroundColor: currentTheme.secondary,
          color: currentTheme.primary,
          borderColor: currentTheme.accent,
        }}
      >
        <span className="mr-2">Theme:</span>
        <div
          className="w-6 h-6 rounded-full"
          style={{
            background: `linear-gradient(45deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
          }}
        />
      </button>

      {/* Dropdown Options */}
      {isDropdownOpen && (
        <div
          id="theme-dropdown"
          className="absolute mt-2 w-48 bg-white rounded-md shadow-lg border z-10"
        >
          {themes.map((t) => (
            <button
              key={t.name}
              onClick={() => handleThemeSelect(t.name)}
              className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 ${
                theme === t.name ? 'font-bold' : ''
              }`}
            >
              <div
                className="w-6 h-6 mr-2 rounded-full"
                style={{
                  background: `linear-gradient(45deg, ${t.primary}, ${t.secondary})`,
                  border: `2px solid ${t.accent}`,
                }}
              />
              {/* {t.name.toUpperCase()} */}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
