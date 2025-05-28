import React, { useEffect, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Button, Spinner } from 'react-bootstrap';
import api from '../../utils/api';
import { gameReducer, initialGameState } from '../../hooks/gameReducer';
import { calculateScore } from '../../utils/gameUtils';
import GameControls from './GameControls';
import GameDisplay from './GameDisplay';
import GameResult from './GameResult';


export default function GamePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { nickname, category } = location.state || {};

    const [state, dispatch] = useReducer(gameReducer, initialGameState);

    // Redirect if missing info
    useEffect(() => {
        if (!nickname || !category) navigate('/');
    }, [nickname, category, navigate]);

    // Fetch word
    useEffect(() => {
        const fetchWord = async () => {
            try {
                const res = await api.get(`/words/random?category=${category}`);
                dispatch({ type: 'SET_WORD', payload: res.data });
            } catch (err) {
                dispatch({ type: 'SET_FETCH_ERROR', payload: 'Failed to load word. Please try again later.' });
            }
        };
        fetchWord();
    }, [category]);

    // Timer
    useEffect(() => {
        if (state.gameOver) return;
        const interval = setInterval(() => {
            dispatch({ type: 'TICK' });
        }, 1000);
        return () => clearInterval(interval);
    }, [state.gameOver]);

    // Submit score
    useEffect(() => {
        if (state.gameOver) {
            const score = calculateScore(state);
            api.post('/scores', { nickname, score }).catch(() => {
                // handle silently or add inline error if desired
            });
        }
    }, [state.gameOver, nickname]);

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
                <div className="text-danger mt-3">{state.fetchError}</div>
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
                        <GameResult
                            gameWon={state.gameWon}
                            word={state.word}
                            score={calculateScore(state)}
                        />
                    )}
                </>
            ) : (
                <Spinner animation="border" className="mt-4" />
            )}
        </Container>
    );
}
