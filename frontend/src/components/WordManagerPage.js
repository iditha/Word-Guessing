import React, { useState } from 'react';
import { Container, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import WordTable from './WordManager/WordTable';

/**
 * Admin panel component for managing the list of words.
 * Fetches the list from the backend and allows adding, editing, and deleting words.
 *
 * @component
 *
 * @returns {JSX.Element} The Word Manager page, including a table of words and a button to add a new word.
 */
export default function WordManagerPage() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [editId, setEditId] = useState(null);

    const navigate = useNavigate();
    const handleRefresh = () => setRefreshTrigger(prev => prev + 1);

    const {
        data: words,
        isLoading,
        isError,
        errorMessage,
    } = useFetch('/words', true, [refreshTrigger]);

    return (
        <Container className="mt-5 mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>🛠️ Word Manager</h2>
                <Button onClick={() => navigate('/admin/add')} variant="primary">
                    ➕ Add Word
                </Button>
            </div>

            {isError && <Alert variant="danger">{errorMessage}</Alert>}
            {isLoading ? (
                <Spinner animation="border" />
            ) : (
                <WordTable
                    words={words}
                    editId={editId}
                    onEdit={(entry) => setEditId(entry.id)}
                    onCancelEdit={() => setEditId(null)}
                    onSaved={() => {
                        setEditId(null);
                        handleRefresh();
                    }}
                    onDelete={handleRefresh}
                />
            )}
        </Container>
    );
}
