// GameContext.tsx
import React, { createContext, useState, useContext } from 'react';

// Define the context type
interface GameContextType {
  score: number;
  moves: number;
  setScore: (score: number) => void;
  setMoves: (moves: number) => void;
  incrementScore: () => void;
  incrementMoves: () => void;
  resetGame: () => void;
}

// Create the context with default values
const GameContext = createContext<GameContextType>({
  score: 0,
  moves: 0,
  setScore: () => {},
  setMoves: () => {},
  incrementScore: () => {},
  incrementMoves: () => {},
  resetGame: () => {},
});

// Create the provider component
export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);

  const incrementScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

  const incrementMoves = () => {
    setMoves((prevMoves) => prevMoves + 1);
  };

  const resetGame = () => {
    setScore(0);
    setMoves(0);
  };

  return (
    <GameContext.Provider
      value={{ score, moves, setScore, setMoves, incrementScore, incrementMoves, resetGame }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Create a custom hook to consume the context
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export default GameContext;