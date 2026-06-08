# Word Guessing Game

A full-stack **hangman-style word guessing game** built with Spring Boot and React. Players pick a category, guess letters to reveal a hidden word, and compete for the top spot on a live leaderboard.

---

## Tech Stack

**Backend**
- Java 24 + Spring Boot 3.5
- RESTful API (Spring Web)
- File-based persistence with thread-safe serialization

**Frontend**
- React 19 with React Router 7
- React Bootstrap for responsive UI
- Axios for API communication
- Custom `useReducer`-based state machine for game logic

---

## Features

- **Category-based gameplay** - words are organized by category; players choose one before each round
- **Live timer** - time elapsed affects your final score, rewarding speed
- **Hint system** - reveal the answer at a 10-point cost when stuck
- **Scoring algorithm** - score is calculated from base points, time penalty, hint usage, and remaining attempts
- **Leaderboard** - tracks each player's personal best; only improves on a better score
- **Admin word manager** - full CRUD panel to add, edit, and delete words with server-side validation
- **Input validation** - both client and server validate all data before processing

---

## Scoring System

| Factor | Effect |
|---|---|
| Base score | +100 points |
| Time elapsed | -1 point per 5 seconds |
| Hint used | -10 points |
| Remaining attempts | +5 points each |
| Minimum score | 0 (never negative) |

---

## Architecture

```
┌──────────────────────────────┐        ┌────────────────────────────────┐
│         React Frontend        │◄──────►│       Spring Boot Backend       │
│                               │  HTTP  │                                 │
│  ┌──────────┐  ┌──────────┐  │        │  ┌────────────┐  ┌──────────┐  │
│  │ GamePage │  │ Leaderbd │  │        │  │WordContrlr │  │ScoreCntlr│  │
│  └──────────┘  └──────────┘  │        │  └────────────┘  └──────────┘  │
│  ┌──────────┐  ┌──────────┐  │        │  ┌────────────┐  ┌──────────┐  │
│  │WordMgr   │  │ Intro    │  │        │  │ WordService│  │ScoreServc│  │
│  └──────────┘  └──────────┘  │        │  └────────────┘  └──────────┘  │
│                               │        │        ↓ Synchronized I/O ↓     │
│  State: useReducer + hooks    │        │  words.ser       scores.ser      │
└──────────────────────────────┘        └────────────────────────────────┘
```

The backend uses **synchronized file I/O** to handle concurrent requests safely without a database. The frontend manages game state with a custom `useReducer`-based state machine, keeping game logic cleanly separated from UI components.

---

## Project Structure

```
Word-Guessing/
├── src/main/java/main/ex3/
│   ├── controller/          # REST controllers (Words, Scores)
│   ├── service/             # Business logic with thread-safe persistence
│   ├── model/               # WordEntry, ScoreEntry data models
│   └── initializer/         # Seed utility for initial word data
├── src/test/                # Spring context tests
├── frontend/
│   ├── src/
│   │   ├── components/      # Page and UI components
│   │   │   ├── Game/        # GameDisplay, GameControls, GameResult
│   │   │   └── WordManager/ # WordTable, EditRowForm (inline edit)
│   │   ├── hooks/           # gameReducer, useFetch, dataFetchReducer
│   │   └── utils/           # Axios instance, score calculation
│   └── package.json
└── pom.xml
```

---

## API Reference

### Words

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/words` | Get all words |
| `GET` | `/api/words/{id}` | Get word by ID |
| `GET` | `/api/words/categories` | List all categories |
| `GET` | `/api/words/random?category=X` | Get a random word from a category |
| `POST` | `/api/words` | Add a new word |
| `PUT` | `/api/words/{id}` | Update a word |
| `DELETE` | `/api/words/{id}` | Delete a word |

### Scores

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/scores` | Get all scores (sorted descending) |
| `POST` | `/api/scores` | Submit a score |

---

## Getting Started

### Prerequisites
- Java 24+
- Node.js 18+

### Run the backend
```bash
./mvnw spring-boot:run
```
The server starts on `http://localhost:8080`.

### Run the frontend
```bash
cd frontend
npm install
npm start
```
The React app starts on `http://localhost:3000` and proxies API calls to the backend.

---

## Author

**Idit Halevi**
