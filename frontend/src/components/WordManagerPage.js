import React, { useState } from 'react';
import { Container, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import WordTable from './WordManager/WordTable';

export default function WordManagerPage() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [editTarget, setEditTarget] = useState(null); // { id, word, category }

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
                    editTarget={editTarget}
                    onEdit={setEditTarget}
                    onCancelEdit={() => setEditTarget(null)}
                    onSaved={() => {
                        setEditTarget(null);
                        handleRefresh();
                    }}
                    onDelete={handleRefresh}
                />
            )}
        </Container>
    );
}
