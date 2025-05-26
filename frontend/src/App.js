import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import IntroPage from './components/IntroPage';
import Game from './components/Game/Game';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<IntroPage />} />
            <Route path="/game" element={<Game />} />
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </Router>
  );
}

export default App;
