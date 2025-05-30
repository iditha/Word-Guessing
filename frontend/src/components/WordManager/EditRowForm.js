import React, { useState, useEffect } from 'react';
import { Button, Form, Spinner, Alert } from 'react-bootstrap';
import api from '../../utils/api';
import { useFetch } from '../../hooks/useFetch';

const ERROR_MESSAGES = {
    requiredWord: 'Word is required.',
    invalidWord: 'Word must contain only letters (A–Z or a–z).',
    requiredCategory: 'Category is required.',
    invalidCategory: 'Category must contain only letters (A–Z or a–z).',
    requiredHint: 'Hint is required.',
};

/**
 * Inline editable form used for updating an existing word within a table row.
 * Performs client-side validation and submits the update to the server.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {number} props.id - ID of the word to edit.
 * @param {Function} props.onSaved - Callback when the word is successfully updated.
 * @param {Function} props.onCancel - Callback to cancel editing mode.
 *
 * @returns {JSX.Element} A table row containing form fields and save/cancel buttons.
 */
export default function EditRowForm({ id, onSaved, onCancel }) {
    const { data: wordData, isLoading, isError, errorMessage } = useFetch(`/words/${id}`, true, [id]);
    const [serverError, setServerError] = useState(null);
    const [form, setForm] = useState({ word: '', category: '', hint: '', id: null });
    const [fieldErrors, setFieldErrors] = useState({});

    /**
     * Initializes form state with word data from API.
     * Runs when `wordData` changes (i.e., data has finished loading).
     *
     * @function
     * @effect
     */
    useEffect(() => {
        if (wordData) {
            setForm({
                id: wordData.id,
                word: wordData.word || '',
                category: wordData.category || '',
                hint: wordData.hint || '',
            });
        }
    }, [wordData]);

    /**
     * Updates form state as the user types into input fields.
     * Clears individual field error and server error messages.
     *
     * @function
     * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setFieldErrors(prev => ({ ...prev, [name]: null }));
        setServerError(null);
    };

    /**
     * Validates form fields for required values and correct formats.
     *
     * @function
     * @returns {Object} An object containing validation error messages keyed by field name.
     */
    const validateFields = () => {
        const errors = {};

        if (!form.word.trim()) {
            errors.word = ERROR_MESSAGES.requiredWord;
        } else if (!/^[a-zA-Z]+$/.test(form.word.trim())) {
            errors.word = ERROR_MESSAGES.invalidWord;
        }

        if (!form.category.trim()) {
            errors.category = ERROR_MESSAGES.requiredCategory;
        } else if (!/^[a-zA-Z]+$/.test(form.category.trim())) {
            errors.category = ERROR_MESSAGES.invalidCategory;
        }

        if (!form.hint.trim()) {
            errors.hint = ERROR_MESSAGES.requiredHint;
        }

        return errors;
    };

    /**
     * Handles form submission for updating a word.
     * Performs client-side validation and sends a PUT request to the backend API.
     * Displays error messages if validation or request fails.
     *
     * @async
     * @function
     * @param {React.FormEvent<HTMLFormElement> | React.MouseEvent} e - The form submit event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateFields();

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        const payload = {
            id: form.id,
            word: form.word.trim(),
            category: form.category.trim(),
            hint: form.hint.trim(),
        };

        try {
            await api.put(`/words/${form.id}`, payload);
            onSaved();
        } catch (err) {
            const data = err.response?.data;
            const msg = typeof data === 'string'
                ? data
                : (data?.error || 'Update failed.');
            setServerError(msg);
        }
    };

    if (isLoading || !form) {
        return (
            <tr>
                <td colSpan="4">
                    <Spinner animation="border" size="sm" /> Loading...
                </td>
            </tr>
        );
    }

    if (isError) {
        return (
            <tr>
                <td colSpan="4">
                    <Alert variant="danger">Failed to load word: {errorMessage}</Alert>
                    <Button size="sm" onClick={onCancel}>Back</Button>
                </td>
            </tr>
        );
    }

    return (
        <tr>
            <td>
                <Form.Control
                    type="text"
                    name="word"
                    value={form.word}
                    onChange={handleChange}
                    isInvalid={!!fieldErrors.word}
                />
                <Form.Control.Feedback type="invalid">
                    {fieldErrors.word}
                </Form.Control.Feedback>
            </td>
            <td>
                <Form.Control
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    isInvalid={!!fieldErrors.category}
                />
                <Form.Control.Feedback type="invalid">
                    {fieldErrors.category}
                </Form.Control.Feedback>
            </td>
            <td>
                <Form.Control
                    type="text"
                    name="hint"
                    value={form.hint}
                    onChange={handleChange}
                    isInvalid={!!fieldErrors.hint}
                />
                <Form.Control.Feedback type="invalid">
                    {fieldErrors.hint}
                </Form.Control.Feedback>
            </td>
            <td>
                <div className="d-flex flex-column">
                    <div className="mb-2">
                        <Button size="sm" variant="success" onClick={handleSubmit} className="me-2">
                            Save
                        </Button>
                        <Button size="sm" variant="secondary" onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                    {serverError && (
                        <Alert variant="danger" className="mt-1 mb-0 py-1">
                            {serverError}
                        </Alert>
                    )}
                </div>
            </td>
        </tr>
    );
}
