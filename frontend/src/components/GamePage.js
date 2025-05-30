import React, { useEffect, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Button, Spinner, Alert } from 'react-bootstrap';
import api from '../utils/api';
import { gameReducer, initialGameState } from '../hooks/gameReducer';
import { calculateScore } from '../utils/gameUtils';
import GameControls from './Game/GameControls';
import GameDisplay from './Game/GameDisplay';
import GameResult from './Game/GameResult';

/**
 * GamePage component serves as the main game interface for players.
 * It handles game logic, UI rendering, data fetching, and game state updates.
 *
 * @component
 * @returns {JSX.Element} Rendered component for the game interface.
 */
export default function GamePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { nickname, category } = location.state || {};

    const [state, dispatch] = useReducer(gameReducer, initialGameState);

    /**
     * Redirects user to home if essential game parameters are missing (e.g., nickname, category).
     */
    useEffect(() => {
        if (!nickname || !category) navigate('/');
    }, [nickname, category, navigate]);

    /**
     * Fetches a random word from the backend based on the selected category.
     * Handles and displays fetch errors with user-friendly messages.
     */
    useEffect(() => {
        const fetchWord = async () => {
            try {
                const res = await api.get(`/words/random?category=${category}`);
                dispatch({ type: 'SET_WORD', payload: res.data });
            } catch (err) {
                const status = err.response?.status;
                let message = 'Something went wrong. Please try again later.';

                if (status === 404) {
                    message = 'No word found in this category. Please try another one.';
                } else if (status === 500) {
                    message = 'Server error: could not load word data.';
                } else if (!err.response) {
                    message = 'Server unavailable. Please check your connection.';
                }

                dispatch({ type: 'SET_FETCH_ERROR', payload: message });

                // Redirect back after showing error
                setTimeout(() => {
                    navigate('/');
                }, 4000); // wait 4 seconds before redirect
            }
        };
        fetchWord();
    }, [category, navigate]);


    /**
     * Timer effect: increments the elapsed time each second unless the game is over.
     */
    useEffect(() => {
        if (state.gameOver) return;
        const interval = setInterval(() => {
            dispatch({ type: 'TICK' });
        }, 1000);
        return () => clearInterval(interval);
    }, [state.gameOver]);

    /**
     * When the game is over, calculates the final score and submits it to the server.
     * Handles failure in saving the score gracefully.
     */
    useEffect(() => {
        if (state.gameOver) {
            const score = calculateScore(state);
            api.post('/scores', { nickname, score }).catch(() => {
                dispatch({
                    type: 'SET_SCORE_SAVE_ERROR',
                    payload: 'Score could not be saved. Server may be unavailable.',
                });
            });
        }
    }, [state.gameOver, nickname]);

    /**
     * Handles the user's letter guess.
     *
     * @param {React.FormEvent} e - The form submission event.
     */
    const handleGuess = (e) => {
        e.preventDefault();
        const letter = state.input.trim().toLowerCase();
        if (/^[a-z]$/.test(letter)) {
            dispatch({ type: 'GUESS_LETTER', payload: letter });
        }
    };

    return (
        <Container className="mt-5 mb-5 text-center" style={{ maxWidth: '700px' }}>
            <h3 className="mb-4">Category: {category}</h3>

            {state.fetchError ? (
                <Alert variant="danger" className="mt-3">
                    {state.fetchError}
                </Alert>
            ) : state.word ? (
                <>
                    <GameDisplay
                        displayWord={state.displayWord}
                        guessedLetters={state.guessedLetters}
                        attemptsLeft={state.attemptsLeft}
                        timeElapsed={state.timeElapsed}
                        hint={state.hint}
                        hintUsed={state.hintUsed}
                    />

                    {!state.gameOver ? (
                        <>
                            <GameControls
                                input={state.input}
                                onInputChange={(value) =>
                                    dispatch({ type: 'SET_INPUT', payload: value })
                                }
                                onGuess={handleGuess}
                                onHint={() => dispatch({ type: 'USE_HINT' })}
                                hintUsed={state.hintUsed}
                            />
                            <Button
                                variant="secondary"
                                className="mt-4"
                                onClick={() => navigate('/')}
                            >
                                ← Back to Intro
                            </Button>
                        </>
                    ) : (
                        <>
                            <GameResult
                                gameWon={state.gameWon}
                                word={state.word}
                                score={calculateScore(state)}
                            />
                            {state.scoreSaveError && (
                                <Alert variant="warning" className="mt-3">
                                    {state.scoreSaveError}
                                </Alert>
                            )}
                        </>
                )}
                </>
            ) : (
                <Spinner animation="border" className="mt-4" />
            )}
        </Container>
    );
}
