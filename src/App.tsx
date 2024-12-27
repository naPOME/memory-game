import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

import Header from './components/Header';
import Game from './pages/Game';
import { LevelSelector } from './components/GameComponent/Level-Selection';
import { GameProvider } from './Context/GameContext';

function App() {
  return (
  <GameProvider>
<div className='bg-background'>
        {/* <ThemeSelector/> */}
        <Header score={1} moves={2}/>

      <Router>
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/level" element={<LevelSelector/>}/>
        <Route path='/game' element={<Game/>}/>
        </Routes>
      </Router>
      </div>
      </GameProvider>
  );
}

export default App;
