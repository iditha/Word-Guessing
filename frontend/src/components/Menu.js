import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Menu() {
    const location = useLocation();

    return (
        <>
            <Navbar bg="light" variant="light" expand="lg" className="shadow-sm mb-4">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="fw-bold">
                        🎮 Word Game
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link
                                as={Link}
                                to="/leaderboard"
                                active={location.pathname === '/leaderboard'}
                            >
                                🏆 Leaderboard
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/admin"
                                active={location.pathname === '/admin'}
                            >
                                🛠️ Word Manager
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/about"
                                active={location.pathname === '/about'}
                            >
                                ℹ️ About
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <Outlet />
            </Container>
        </>
    );
}
