
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import { LevelSelector } from './components/GameComponent/Level-Selection';
import { GameProvider } from './Context/GameContext';
import { ImageCategoryProvider } from './Context/ImageCategory';
import Layout from './Layout';

function App() {
  return (
    <GameProvider>
      <ImageCategoryProvider>
        <div className='bg-background'>
          <Router>
            <Routes>
              {/* Wrap each route with the Layout component */}
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/level" element={<Layout><LevelSelector /></Layout>} />
              <Route path="/game" element={<Layout><Game /></Layout>} />
            </Routes>
          </Router>
        </div>
      </ImageCategoryProvider>
    </GameProvider>
  );
}

export default App;