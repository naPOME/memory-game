import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../Context/ThemeContext';

const fonts = [
  { name: 'Retro', className: 'retro' },
  { name: 'Roboto', className: 'sans' },
  { name: 'Merriweather', className: 'serif' },
  { name: 'Courier New', className: 'mono' },
  { name: 'Pacifico', className: 'cursive' },
];

export const FontSelector = () => {
  const { font, setFont } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleFontChange = (fontClassName) => {
    setFont(fontClassName);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center px-2 mt-2 py-1 bg-primary text-xs rounded-xl border border-accent border-dashed shadow-md hover:bg-accent text-background transition"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-background mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
        Font
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul
          className="absolute mt-2 w-48 bg-background border border-gray-300 shadow-lg rounded z-10 transition-opacity duration-200 ease-in-out"
          role="menu"
        >
          {fonts.map((f) => (
            <li key={f.className} role="menuitem">
              <button
                onClick={() => handleFontChange(f.className)}
                className={`w-full text-left px-4 py-2 hover:bg-secondary transition-colors duration-200 ${
                  font === f.className
                    ? 'bg-background text-text font-semibold'
                    : 'text-text'
                }`}
              >
                {f.name}
                {font === f.className && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 inline-block ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};