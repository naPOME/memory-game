import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    console.log(`Current theme: ${theme}`);
  }, [theme]);

  const handleStart = () => {
    navigate('/game');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-background">
      <h1 className="text-5xl font-bold mb-4 text-primary font-retro text-center">
        MEMORY GAME
      </h1>
      <p className="text-sm text-accent mb-8 text-center font-retro">
        Can you match all the pairs? Let’s test your memory!
      </p>
      <button
        onClick={handleStart}
        className="px-8 py-2 bg-primary text-text rounded-xl font-bold text-xl font-retro border-4 border-accent hover:bg-accent hover:text-black transition duration-300 transform hover:scale-105"
      >
        START GAME
      </button>
    </div>
  );
};

export default Home;
