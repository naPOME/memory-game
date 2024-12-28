// ImageCategoryContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface ImageCategoryContextType {
  imageCategory: string;
  setImageCategory: (category: string) => void;
  resetGame: (newCategory: string) => void;
}

const ImageCategoryContext = createContext<ImageCategoryContextType>({
  imageCategory: 'Nature', // Default category
  setImageCategory: () => {}, // Placeholder function
  resetGame: () => {}, // Placeholder function
});

export const ImageCategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [imageCategory, setImageCategory] = useState('Nature');

  const resetGame = (newCategory: string) => {
    if (window.confirm('Changing the category will reset the current game. Do you want to continue?')) {
      setImageCategory(newCategory);
    }
  };

  return (
    <ImageCategoryContext.Provider value={{ imageCategory, setImageCategory, resetGame }}>
      {children}
    </ImageCategoryContext.Provider>
  );
};

export const useImageCategory = () => {
  const context = useContext(ImageCategoryContext);
  if (!context) {
    throw new Error('useImageCategory must be used within an ImageCategoryProvider');
  }
  return context;
};

export default ImageCategoryContext;