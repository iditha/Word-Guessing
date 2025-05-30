/**
 * The initial state for the hangman-style word guessing game.
 *
 * @constant
 * @type {Object}
 * @property {string} word - The actual word to guess.
 * @property {string} hint - A hint for the word.
 * @property {string[]} displayWord - The current visible state of the word (e.g., ['_', '_', 'e']).
 * @property {string[]} guessedLetters - List of letters the user has already guessed.
 * @property {number} attemptsLeft - Number of remaining incorrect guesses allowed.
 * @property {boolean} hintUsed - Whether the hint has been used.
 * @property {string} input - Current input value for letter guess.
 * @property {boolean} gameOver - Whether the game has ended.
 * @property {boolean} gameWon - Whether the user has successfully guessed the word.
 * @property {number} timeElapsed - Seconds since game start.
 * @property {string} fetchError - Error message for fetch failures.
 * @property {string|null} scoreSaveError - Error message when saving score fails.
 */
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

/**
 * Reducer function to manage the state transitions of the game.
 * Supports actions like setting the word, ticking the timer, guessing letters, using hints, etc.
 *
 * @function
 * @param {Object} state - Current state of the game.
 * @param {Object} action - Action to perform on the state.
 * @param {string} action.type - Type of the action.
 * @param {any} [action.payload] - Optional data for the action.
 * @returns {Object} New state based on the action.
 *
 * @throws {Error} If an unhandled action type is provided.
 */
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
