import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';

const Home = () => {
  const navigate = useNavigate();
  const {  font } = useTheme();

  // useEffect(() => {
  //   console.log(`Current theme: ${theme}`);
  //   console.log(`Current font: ${font}`);
  // }, [theme, font]);

  const handleStart = () => {
    navigate('/level');
  };

  return (
    <div className={`h-screen flex flex-col items-center justify-center bg-background font-${font}`}>
      <h1 className="text-5xl font-bold mb-4 text-primary text-center">
        MEMORY GAME
      </h1>
      <p className="text-sm text-accent mb-8 text-center">
        Can you match all the pairs? Let’s test your memory!
      </p>
      <button
        onClick={handleStart}
        className="px-8 py-2 bg-background  text-text rounded-xl font-bold text-xl border border-accent border-b-4 hover:bg-accent hover:text-primary-700 transition duration-300 transform hover:scale-105"
      >
        START GAME
      </button>
    </div>
  );
};

export default Home;
