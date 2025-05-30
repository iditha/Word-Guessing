import React from 'react';
import { Table, Button } from 'react-bootstrap';
import api from '../../utils/api';
import EditRowForm from './EditRowForm';

/**
 * Renders a table of words with support for inline editing and deletion.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.words - List of word objects to display.
 * @param {number|null} props.editId - The ID of the word currently being edited.
 * @param {Function} props.onEdit - Callback invoked with a word entry when the Edit button is clicked.
 * @param {Function} props.onCancelEdit - Callback invoked to cancel editing mode.
 * @param {Function} props.onSaved - Callback invoked when a word is successfully edited and saved.
 * @param {Function} props.onDelete - Callback invoked after a word is deleted, used to trigger refresh.
 *
 * @returns {JSX.Element} A table showing the list of words and action buttons.
 */
export default function WordTable({ words, editId, onEdit, onCancelEdit, onSaved, onDelete }) {

    /**
     * Sends a DELETE request to remove a word by ID.
     * On success, triggers `onDelete()` to refresh the list.
     * On failure, logs a warning to the console.
     *
     * @async
     * @function
     * @param {number} id - ID of the word to delete.
     */
    const handleDelete = async (id) => {
        try {
            await api.delete(`/words/${id}`);
            onDelete();
        } catch (err) {
            console.warn('Failed to delete word.');
        }
    };

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Word</th>
                <th>Category</th>
                <th>Hint</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {words.map((entry) =>
                editId === entry.id ? (
                    <EditRowForm
                        key={entry.id}
                        id={entry.id}
                        onCancel={onCancelEdit}
                        onSaved={onSaved}
                    />
                ) : (
                    <tr key={entry.id}>
                        <td>{entry.word}</td>
                        <td>{entry.category}</td>
                        <td>{entry.hint}</td>
                        <td>
                            <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => onEdit(entry)}
                            >
                                Edit
                            </Button>{' '}
                            <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => handleDelete(entry.id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                )
            )}
            </tbody>
        </Table>
    );
}
