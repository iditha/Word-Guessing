import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function AddWord() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ word: '', category: '', hint: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            word: form.word.trim().toLowerCase(),
            category: form.category.trim().toLowerCase(),
            hint: form.hint.trim(),
        };

        try {
            await api.post('/words', payload);
            navigate('/admin');
        } catch (err) {
            console.warn('Add failed');
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '600px' }}>
            <Card>
                <Card.Body>
                    <Card.Title>Add New Word</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Word</Form.Label>
                            <Form.Control
                                name="word"
                                value={form.word}
                                onChange={handleChange}
                                required
                                pattern="[a-z]+"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                required
                                pattern="[a-z]+"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Hint</Form.Label>
                            <Form.Control
                                name="hint"
                                value={form.hint}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

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
