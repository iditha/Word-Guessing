import React from 'react';
import { Form, Button, ButtonGroup, Row, Col } from 'react-bootstrap';

/**
 * Renders input controls for the game, allowing the user to guess a letter
 * and optionally use a hint. Disables hint usage after it's been used once.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.input - Current input letter.
 * @param {Function} props.onInputChange - Handler for input changes.
 * @param {Function} props.onGuess - Handler for submitting a guess.
 * @param {Function} props.onHint - Handler for using a hint.
 * @param {boolean} props.hintUsed - Indicates if the hint has already been used.
 *
 * @returns {JSX.Element} Game control form with input and action buttons.
 */
export default function GameControls({ input, onInputChange, onGuess, onHint, hintUsed }) {
    return (
        <Form onSubmit={onGuess} className="mt-4">
            <Row className="justify-content-center mb-3">
                <Col xs="auto">
                    <Form.Group>
                        <Form.Control
                            type="text"
                            maxLength="1"
                            value={input}
                            onChange={(e) => onInputChange(e.target.value)}
                            placeholder="Guess a letter"
                            style={{ textTransform: 'uppercase', textAlign: 'center', width: '160px' }}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <ButtonGroup>
                <Button type="submit" variant="primary">
                    Guess
                </Button>
                <Button variant="warning" onClick={onHint} disabled={hintUsed}>
                    {hintUsed ? 'Hint Used' : 'Use Hint'}
                </Button>
            </ButtonGroup>
        </Form>
    );
}
