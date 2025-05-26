import React from 'react';
import { Form, Button, ButtonGroup, Row, Col } from 'react-bootstrap';

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
