import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the context type
interface GameContextType {
  score: number;
  moves: number;
  elapsedTime: number; // Add elapsedTime
  isTimerRunning: boolean; // Add isTimerRunning
  setScore: (score: number) => void;
  setMoves: (moves: number) => void;
  incrementScore: () => void;
  incrementMoves: () => void;
  resetGame: () => void;
  startTimer: () => void; // Add startTimer
  stopTimer: () => void; // Add stopTimer
  resetTimer: () => void; // Add resetTimer
}

// Create the context with default values
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

// Create the provider component
export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0); // Timer state
  const [isTimerRunning, setIsTimerRunning] = useState(false); // Timer control

  // Increment the timer every second
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup interval on unmount
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
    resetTimer(); // Reset the timer when the game is reset
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

// Create a custom hook to consume the context
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export default GameContext;