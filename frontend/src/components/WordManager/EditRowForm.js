import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../../utils/api';

export default function EditRowForm({ wordInfo, onSaved, onCancel }) {
    const [form, setForm] = useState(wordInfo);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            id: wordInfo.id,
            word: form.word.trim(),
            category: form.category.trim(),
            hint: form.hint.trim(),
        };

        try {
            await api.put(`/words/${wordInfo.id}`, payload);
            onSaved();
        } catch (err) {
            console.warn('Update failed');
        }
    };

    return (
        <tr>
            <td>
                <Form.Control
                    type="text"
                    name="word"
                    value={form.word}
                    onChange={handleChange}
                    pattern="[a-z]+"
                    required
                />
            </td>
            <td>
                <Form.Control
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    pattern="[a-z]+"
                    required
                />
            </td>
            <td>
                <Form.Control
                    type="text"
                    name="hint"
                    value={form.hint}
                    onChange={handleChange}
                    required
                />
            </td>
            <td>
                <Button size="sm" variant="success" onClick={handleSubmit} className="me-2">
                    Save
                </Button>
                <Button size="sm" variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
            </td>
        </tr>
    );
}
