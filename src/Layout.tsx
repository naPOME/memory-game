import React, { ReactNode } from 'react';
import Header from './components/Header';
import { useGame } from './Context/GameContext';

interface LayoutProps {
  children: ReactNode; 
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { elapsedTime, isTimerRunning } = useGame(); 

  return (
    <div>
      <Header elapsedTime={elapsedTime} isTimerRunning={isTimerRunning} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
