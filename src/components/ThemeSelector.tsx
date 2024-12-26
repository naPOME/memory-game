import React, { useState, useEffect } from 'react';
import { useTheme } from '../Context/ThemeContext';
import { PaintBrushIcon } from '@heroicons/react/16/solid';

const themes = [
  { 
    name: 'theme1', 
    primary: '#4CAF50', 
    secondary: '#8BC34A', 
    accent: '#FFC107', 
    text: '#1B5E20' // A darker shade of the primary color for better contrast
  },
        { 
          name: 'theme2', 
          primary: '#3F51B5', 
          secondary: '#03A9F4', 
          accent: '#E91E63', 
          text: '#1A237E' // A darker shade of the primary color for better contrast
        },
  { 
    name: 'theme3', 
    primary: '#FF5722', 
    secondary: '#FFC107', 
    accent: '#4CAF50', 
    text: '#D32F2F' // A darker shade of the primary color for better contrast
  },
  { 
    name: 'theme4', 
    primary: '#9C27B0', 
    secondary: '#673AB7', 
    accent: '#03A9F4', 
    text: '#6A1B9A' // A darker shade of the primary color for better contrast
  },{ name: 'theme5', primary: '#F44336', secondary: '#E91E63', accent: '#9C27B0', 
text: '#B71C1C' // A darker shade of the primary color for better contrast
  },
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
        className="flex items-center px-3 py-1 border text-gray-100 font-extrabold border-dashed  rounded-xl shadow-md transition text-md"
        style={{
          backgroundColor: currentTheme.primary,
          // color: currentTheme.text,
          borderColor: currentTheme.accent,
        }}
      >
        <span className="mr-2">
  
      themes


</span>

        <div
          className="w-6 h-6 rounded-full"
          style={{
            background: `linear-gradient(45deg, ${currentTheme.primary}, ${currentTheme.accent})`,
          }}
        />
      </button>

      {/* Dropdown Options */}
      {isDropdownOpen && (
        <div
          id="theme-dropdown"
          className="absolute mt-2 w-36  rounded-md shadow-lg border z-10 opacity-80"
          style={{
            background: `linear-gradient(45deg, ${currentTheme.primary}, ${currentTheme.primary})`,
          }}
        >
          {themes.map((t) => (
            <button
              key={t.name}
              onClick={() => handleThemeSelect(t.name)}
              className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-200 ${
                theme === t.name ? 'font-normal text-gray-100 hover:text-gray-900' : ''
              }`}
        
            >
              <div
                className="w-6 h-6 mr-2 rounded-full"
                style={{
                  background: `linear-gradient(45deg, ${t.primary}, ${t.secondary})`,
                  border: `2px solid ${t.accent}`,
                }}
              />
              {t.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
