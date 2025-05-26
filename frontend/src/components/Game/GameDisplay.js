import React from 'react';
import { Card, Badge } from 'react-bootstrap';

export default function GameDisplay({ displayWord, guessedLetters, attemptsLeft, timeElapsed, hint, hintUsed }) {
    return (
        <Card className="my-4 p-3 shadow-sm">
            <Card.Body>
                <Card.Title className="mb-3">
                    <h2 className="letter-spacing">{displayWord.join(' ')}</h2>
                </Card.Title>
                <p><strong>Attempts Left:</strong> <span className="text-danger">{attemptsLeft}</span></p>
                <p><strong>Time:</strong> {timeElapsed} sec</p>

                <p>
                    <strong>Guessed Letters:</strong>{' '}
                    {guessedLetters.length === 0 ? (
                        <span className="text-muted">None yet</span>
                    ) : (
                        guessedLetters.map((letter, idx) => (
                            <Badge key={idx} bg="secondary" className="me-1">{letter.toUpperCase()}</Badge>
                        ))
                    )}
                </p>

                {hintUsed && (
                    <p className="mt-3"><strong>Hint:</strong> <em>{hint}</em></p>
                )}
            </Card.Body>
        </Card>
    );
}
