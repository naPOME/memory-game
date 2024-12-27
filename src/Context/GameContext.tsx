import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GameContextType {
  level: string;
  moves: number;
  score: number;
  setLevel: (level: string) => void;
  incrementMoves: () => void;
  updateScore: (points: number) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [level, setLevel] = useState<string>('easy');
  const [moves, setMoves] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const incrementMoves = () => setMoves((prevMoves) => prevMoves + 1);
  const updateScore = (points: number) => setScore((prevScore) => prevScore + points);
  const resetGame = () => {
    setMoves(0);
    setScore(0);
  };

  return (
    <GameContext.Provider
      value={{ level, moves, score, setLevel, incrementMoves, updateScore, resetGame }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
