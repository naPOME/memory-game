import React from 'react';
import { useTheme } from '../Context/ThemeContext';

const imageCategories = [
  { name: 'Animals', icon: '🐾' },
  { name: 'Nature', icon: '🌿' },
  { name: 'People', icon: '👥' },
  { name: 'Cars', icon: '🚗' },
  { name: 'Other', icon: '✨' },
];

const ImageCategorySelector = ({ onSelectCategory }) => {
  const { theme } = useTheme();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {imageCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            className="flex flex-col items-center justify-center px-6 py-4 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: theme.primary,
              color: theme.text,
              border: `2px solid ${theme.accent}`,
              boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
            }}
          >
            <span className="text-4xl mb-2">{category.icon}</span>
            <span className="text-lg font-semibold">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageCategorySelector;