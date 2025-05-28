import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu'; // layout with nav bar
import IntroPage from './components/IntroPage';
import GamePage from './components/Game/GamePage';
import Leaderboard from './components/LeaderboardPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Menu />}>
                    <Route index element={<IntroPage />} />
                    <Route path="game" element={<GamePage />} />
                    <Route path="leaderboard" element={<Leaderboard />} />
                    <Route path="*" element={<h2>404 - Page Not Found</h2>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
