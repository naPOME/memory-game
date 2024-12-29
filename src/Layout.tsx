import React from 'react';
import Header from './components/Header';
import { useGame } from './Context/GameContext';

const Layout = ({ children }) => {
  const { elapsedTime, isTimerRunning } = useGame(); // Access elapsedTime and isTimerRunning from GameContext

  return (
    <div>
      <Header elapsedTime={elapsedTime} isTimerRunning={isTimerRunning} />
      <main>{children}</main> {/* Render the page content */}
    </div>
  );
};

export default Layout;