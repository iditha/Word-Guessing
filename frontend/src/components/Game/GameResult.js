import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
