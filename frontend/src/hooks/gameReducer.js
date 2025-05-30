export const initialGameState = {
    word: '',
    hint: '',
    displayWord: [],
    guessedLetters: [],
    attemptsLeft: 6,
    hintUsed: false,
    input: '',
    gameOver: false,
    gameWon: false,
    timeElapsed: 0,
    fetchError: '',
    scoreSaveError: null,
};

export function gameReducer(state, action) {
    switch (action.type) {
        case 'SET_WORD':
            return {
                ...state,
                word: action.payload.word.toLowerCase(),
                hint: action.payload.hint,
                displayWord: Array(action.payload.word.length).fill('_'),
            };
        case 'TICK':
            return { ...state, timeElapsed: state.timeElapsed + 1 };
        case 'GUESS_LETTER': {
            const letter = action.payload.toLowerCase();
            if (state.guessedLetters.includes(letter)) return state;

            const guessedLetters = [...state.guessedLetters, letter];
            const correct = state.word.includes(letter);

            const updatedDisplay = state.word.split('').map((char, i) =>
                guessedLetters.includes(char) ? char : state.displayWord[i]
            );

            const isWin = updatedDisplay.join('') === state.word;
            const attempts = correct ? state.attemptsLeft : state.attemptsLeft - 1;
            const isGameOver = isWin || attempts <= 0;

            return {
                ...state,
                guessedLetters,
                displayWord: updatedDisplay,
                attemptsLeft: attempts,
                gameOver: isGameOver,
                gameWon: isWin,
                input: '',
            };
        }
        case 'USE_HINT':
            return { ...state, hintUsed: true };
        case 'SET_INPUT':
            return { ...state, input: action.payload };
        case 'SET_FETCH_ERROR':
            return { ...state, fetchError: action.payload };
        case 'SET_SCORE_SAVE_ERROR':
            return { ...state, scoreSaveError: action.payload };
        default:
            throw new Error('Unhandled action type');
    }
}
