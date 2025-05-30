import React, { useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

/**
 * Component for adding a new word to the game.
 *
 * Renders a form with validation to add a word, its category, and a hint.
 * On successful submission, the word is posted to the server and the user is redirected.
 *
 * @component
 * @returns {JSX.Element} The form UI for adding a word.
 *
 * State:
 * - `form`: Holds input values for word, category, and hint.
 * - `errors`: Tracks validation errors for fields.
 * - `serverError`: Holds server response error message if the request fails.
 * - `validated`: Indicates if the form has been submitted and validated.
 */
export default function AddWord() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ word: '', category: '', hint: '' });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(null);
    const [validated, setValidated] = useState(false);

    const fields = [
        { name: 'word', label: 'Word', pattern: /^[a-zA-Z]+$/, errorMsg: 'Word must contain only letters (A–Z or a–z).' },
        { name: 'category', label: 'Category', pattern: /^[a-zA-Z]+$/, errorMsg: 'Category must contain only letters (A–Z or a–z).' },
        { name: 'hint', label: 'Hint', required: true, errorMsg: 'Hint is required.' },
    ];

    /**
     * Updates form state as user types and clears field-specific and server errors.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: null }));
        setServerError(null);
    };

    /**
     * Validates form fields based on defined rules.
     * Ensures required fields are not empty and patterns match.
     *
     * @returns {Object} An object containing validation errors keyed by field name.
     */
    const validateFields = () => {
        const newErrors = {};
        for (const { name, pattern, required, errorMsg } of fields) {
            const value = form[name]?.trim();
            if ((required || pattern) && !value) {
                newErrors[name] = errorMsg;
            } else if (pattern && !pattern.test(value)) {
                newErrors[name] = errorMsg;
            }
        }
        return newErrors;
    };

    /**
     * Trims and normalizes user input before submitting to the server.
     * Converts `word` and `category` to lowercase.
     *
     * @param {Object} data - The form data object.
     * @param {string} data.word - The word to add.
     * @param {string} data.category - The category of the word.
     * @param {string} data.hint - A hint for the word.
     * @returns {Object} Sanitized version of the form data.
     */
    const sanitizeInput = (data) => ({
        word: data.word.trim().toLowerCase(),
        category: data.category.trim().toLowerCase(),
        hint: data.hint.trim(),
    });

    /**
     * Handles form submission.
     * - Prevents default browser behavior.
     * - Validates input fields.
     * - If valid, sends a POST request to add the word.
     * - Navigates to the admin page on success.
     * - Displays error message on failure.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidated(true);

        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await api.post('/words', sanitizeInput(form));
            navigate('/admin');
        } catch (err) {
            const msg = err.response?.data || 'Failed to add word.';
            setServerError(typeof msg === 'string' ? msg : msg.error || 'Server error.');
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '600px' }}>
            <Card>
                <Card.Body>
                    <Card.Title>Add New Word</Card.Title>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        {fields.map(({ name, label }) => (
                            <Form.Group key={name} className="mb-3">
                                <Form.Label>{label}</Form.Label>
                                <Form.Control
                                    name={name}
                                    value={form[name]}
                                    onChange={handleChange}
                                    isInvalid={!!errors[name]}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors[name]}
                                </Form.Control.Feedback>
                            </Form.Group>
                        ))}

                        {serverError && (
                            <Alert variant="danger" className="mt-3">
                                {serverError}
                            </Alert>
                        )}

                        <Button type="submit" variant="success" className="me-2">
                            Add Word
                        </Button>
                        <Button variant="secondary" onClick={() => navigate('/admin')}>
                            Cancel
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
