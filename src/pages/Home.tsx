import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/game');
  };

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center text-white">

      <div className="absolute inset-0 bg-stars bg-cover bg-center opacity-20 "></div>


      <h1 className="text-6xl font-extrabold mb-4 text-cyan-400 retro-font">
        MEMORY GAME
      </h1>

 
      <p className="text-lg text-pink-400 mb-8 retro-font ">
        Can you match all the pairs? Let’s test your memory!
      </p>

      <button
        onClick={handleStart}
        className="px-10 py-3 bg-pink-500 text-black font-bold text-lg retro-font border-2 border-cyan-400 hover:bg-cyan-400 hover:text-black transition duration-300"
      >
        START GAME
      </button>
    </div>
  );
};

export default Home;
