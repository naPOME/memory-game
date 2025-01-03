import React, { createContext, useState, useContext, useEffect } from 'react';

interface GameContextType {
  score: number;
  moves: number;
  elapsedTime: number; 
  isTimerRunning: boolean; 
  setScore: (score: number) => void;
  setMoves: (moves: number) => void;
  incrementScore: () => void;
  incrementMoves: () => void;
  resetGame: () => void;
  startTimer: () => void; 
  stopTimer: () => void; 
  resetTimer: () => void; 
}

const GameContext = createContext<GameContextType>({
  score: 0,
  moves: 0,
  elapsedTime: 0,
  isTimerRunning: false,
  setScore: () => {},
  setMoves: () => {},
  incrementScore: () => {},
  incrementMoves: () => {},
  resetGame: () => {},
  startTimer: () => {},
  stopTimer: () => {},
  resetTimer: () => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0); 
  const [isTimerRunning, setIsTimerRunning] = useState(false); 

  
  useEffect(() => {
    let interval: number;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval); 
  }, [isTimerRunning]);

  const incrementScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

  const incrementMoves = () => {
    setMoves((prevMoves) => prevMoves + 1);
  };

  const resetGame = () => {
    setScore(0);
    setMoves(0);
    resetTimer(); 
  };

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setElapsedTime(0);
    setIsTimerRunning(false);
  };

  return (
    <GameContext.Provider
      value={{
        score,
        moves,
        elapsedTime,
        isTimerRunning,
        setScore,
        setMoves,
        incrementScore,
        incrementMoves,
        resetGame,
        startTimer,
        stopTimer,
        resetTimer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export default GameContext;