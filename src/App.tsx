import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Context/ThemeContext';
import Home from './pages/Home';

import Header from './components/Header';

function App() {
  return (
<div className='bg-background'>
        {/* <ThemeSelector/> */}
        <Header score={1} moves={2}/>
      <Router>
        <Routes>
        
          <Route path="/" element={<Home />} />
        
        </Routes>
      </Router>
      </div>
  );
}

export default App;
