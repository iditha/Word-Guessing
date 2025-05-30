import React from 'react';
import { Table, Container, Spinner, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

/**
 * Displays the leaderboard with nicknames and scores fetched from the server.
 *
 * Fetches data using the `useFetch('/scores')` hook and displays it in a Bootstrap table.
 * Shows loading and error states as appropriate. Includes a button to return to the home page.
 *
 * @component
 * @returns {JSX.Element} Leaderboard UI.
 */
export default function LeaderboardPage() {
    const { isLoading, isError, errorMessage, data: scores } = useFetch('/scores');
    const navigate = useNavigate();

    return (
        <Container className="mt-5 text-center" style={{ maxWidth: '600px' }}>
            <h2 className="mb-4">🏆 Leaderboard</h2>

            {isLoading && <Spinner animation="border" />}
            {isError && <p className="text-danger">{errorMessage}</p>}

            {!isLoading && !isError && (
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nickname</th>
                        <th>Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    {scores.map((entry, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{entry.nickname}</td>
                            <td>{entry.score}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}

            <Button variant="secondary" className="mt-4 mb-5" onClick={() => navigate('/')}>
                ← Back to Home
            </Button>
        </Container>
    );
}
