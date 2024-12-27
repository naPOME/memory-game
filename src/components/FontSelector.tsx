import React, { useState } from 'react';
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

  const handleFontChange = (fontClassName: string) => {
    setFont(fontClassName);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center px-7 mt-2 text-left py-1 bg-primary text-xs rounded-xl border border-accent border-dashed shadow-md hover:bg-accent text-background transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-background"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
        Font
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul className="absolute mt-2 w-48 bg-background  border border-gray-300  shadow-lg rounded z-10">
          {fonts.map((f) => (
            <li key={f.className}>
              <button
                onClick={() => handleFontChange(f.className)}
                className={`w-full text-left px-4 py-2 hover:bg-secondary ${
                  font === f.className
                    ? 'bg-background text-text  '
                    : 'text-text '
                }`}
              >
                {f.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
