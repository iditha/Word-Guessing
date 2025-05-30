import React, { useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: null }));
        setServerError(null);
    };

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

    const sanitizeInput = (data) => ({
        word: data.word.trim().toLowerCase(),
        category: data.category.trim().toLowerCase(),
        hint: data.hint.trim(),
    });

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
