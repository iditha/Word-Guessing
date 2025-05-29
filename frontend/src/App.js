import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu'; // layout with nav bar
import IntroPage from './components/IntroPage';
import GamePage from './components/GamePage';
import Leaderboard from './components/LeaderboardPage';
import WordManager from './components/WordManagerPage';
import AddWord from './components/AddWord';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Menu />}>
                    <Route index element={<IntroPage />} />
                    <Route path="game" element={<GamePage />} />
                    <Route path="leaderboard" element={<Leaderboard />} />
                    <Route path="admin" element={<WordManager />} />
                    <Route path="/admin/add" element={<AddWord />} />
                    <Route path="*" element={<h2>404 - Page Not Found</h2>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
