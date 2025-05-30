import React from 'react';
import { Table, Button } from 'react-bootstrap';
import api from '../../utils/api';
import EditRowForm from './EditRowForm';

export default function WordTable({ words, editId, onEdit, onCancelEdit, onSaved, onDelete }) {
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
