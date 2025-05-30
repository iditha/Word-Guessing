import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/**
 * Displays the final result of the game, showing whether the player won or lost,
 * the correct word, and the final score. Provides a button to view the leaderboard.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.gameWon - Whether the player won the game.
 * @param {string} props.word - The correct word that was to be guessed.
 * @param {number} props.score - The final score of the player.
 *
 * @returns {JSX.Element} Card showing game result and a navigation button.
 */
export default function GameResult({ gameWon, word, score }) {
    const navigate = useNavigate();

    return (
        <Card className="mt-4 p-4 shadow-sm text-center">
            <Card.Body>
                <h4 className={`mb-3 ${gameWon ? 'text-success' : 'text-danger'}`}>
                    {gameWon ? '🎉 You Won!' : '💀 You Lost'}
                </h4>
                <p>The word was: <strong>{word}</strong></p>
                <p>Your score: <strong>{score}</strong></p>
                <Button className="mt-3" onClick={() => navigate('/leaderboard')}>
                    View Leaderboard
                </Button>
            </Card.Body>
        </Card>
    );
}
