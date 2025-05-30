import React from 'react';
import { Card, Badge } from 'react-bootstrap';

/**
 * Displays the current state of the game including the partially guessed word,
 * remaining attempts, time elapsed, guessed letters, and the hint (if used).
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<string>} props.displayWord - Array representing the current state of the word.
 * @param {Array<string>} props.guessedLetters - Letters that have been guessed so far.
 * @param {number} props.attemptsLeft - Number of remaining incorrect guesses allowed.
 * @param {number} props.timeElapsed - Time passed since game start (in seconds).
 * @param {string} props.hint - Hint for the current word.
 * @param {boolean} props.hintUsed - Whether the hint has been revealed.
 *
 * @returns {JSX.Element} Card element showing game status and progress.
 */
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
