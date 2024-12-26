import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Context/ThemeContext';
import Home from './pages/Home';
import ThemeSelector from './components/ThemeSelector';

function App() {
  return (
    <ThemeProvider>
        {/* <ThemeSelector/> */}
      <Router>
        <Routes>
        
          <Route path="/" element={<Home />} />
        
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
