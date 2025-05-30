import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Form, Button, Spinner, Alert} from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';

/**
 * Component that renders the game’s intro screen where users:
 * - Enter a nickname.
 * - Select a word category fetched from the server.
 *
 * Validates form input and navigates to the game screen with the selected data.
 *
 * @component
 * @returns {JSX.Element} The intro page with nickname and category selection.
 *
 * State:
 * - `nickname`: User-entered nickname.
 * - `selectedCategory`: Chosen category from fetched list.
 * - `formError`: Tracks form-level validation errors.
 *
 * Hooks:
 * - `useFetch('/words/categories')`: Fetches available categories from server.
 */
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

    /**
     * Handles form submission.
     * - Prevents default page reload.
     * - Validates that nickname and category are filled.
     * - Navigates to `/game` with the nickname and selected category in state.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
     */
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
                            disabled={isError}
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

                {formError && (
                    <Alert variant="danger" className="mb-3">
                        {formError}
                    </Alert>
                )}
                {!isLoading && isError && (
                    <Alert variant="danger" className="mb-3">
                        Could not load categories (server unavailable). Please try again later.
                    </Alert>
                )}
                {!isLoading && !isError && categories.length === 0 && (
                    <Alert variant="warning" className="mb-3">
                        No categories available. Please add some words on the server first.
                    </Alert>
                )}

                <Button
                    type="submit"
                    variant="primary"
                    disabled={
                    isLoading
                    || isError
                    || !nickname.trim()
                    || !selectedCategory}>
                    Start Game
                </Button>
            </Form>
        </Container>
    );
}

export default IntroPage;
