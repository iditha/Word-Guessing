import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';

function IntroPage() {
    const [nickname, setNickname] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [formError, setFormError] = useState('');
    const navigate = useNavigate();

    const {
        isLoading,
        isError,
        errorMessage,
        data: categories,
    } = useFetch('/words/categories');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nickname.trim() || !selectedCategory) {
            setFormError('Please enter a nickname and select a category.');
            return;
        }

        setFormError('');
        navigate('/game', {
            state: { nickname: nickname.trim(), category: selectedCategory },
        });
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '500px' }}>
            <h2 className="mb-4">Word Guess Game</h2>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        isInvalid={!!formError && !nickname.trim()}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    {isLoading ? (
                        <div>
                            <Spinner animation="border" size="sm" /> Loading...
                        </div>
                    ) : (
                        <Form.Select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            isInvalid={!!formError && !selectedCategory}
                        >
                            <option value="">-- Select a category --</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </Form.Select>
                    )}
                </Form.Group>

                {(formError || isError) && (
                    <div className="text-danger mb-3" style={{ fontSize: '0.9rem' }}>
                        {formError || errorMessage}
                    </div>
                )}

                <Button type="submit" variant="primary" disabled={isLoading}>
                    Start Game
                </Button>
            </Form>
        </Container>
    );
}

export default IntroPage;
