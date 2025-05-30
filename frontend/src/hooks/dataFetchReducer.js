/**
 * Initial state for data fetching operations.
 *
 * @constant
 * @type {Object}
 * @property {boolean} isLoading - Whether the fetch operation is in progress.
 * @property {boolean} isError - Whether the fetch operation failed.
 * @property {Array|Object} data - The fetched data (default: empty array).
 * @property {string} errorMessage - Error message if the fetch fails.
 */
export const initialState = {
    isLoading: false,
    isError: false,
    data: [],
    errorMessage: '',
};

/**
 * Reducer to manage the state of a data fetch request.
 *
 * Handles loading, success, and failure states.
 *
 * @function
 * @param {Object} state - The current fetch state.
 * @param {Object} action - The action dispatched to modify state.
 * @param {string} action.type - The type of action (`FETCH_INIT`, `FETCH_SUCCESS`, `FETCH_FAILURE`).
 * @param {any} [action.payload] - Optional payload (data or error message).
 * @returns {Object} New fetch state.
 *
 * @throws {Error} If an unhandled action type is received.
 */
export function dataFetchReducer(state, action) {
    switch (action.type) {
        case 'FETCH_INIT':
            return { ...state, isLoading: true, isError: false, errorMessage: '' };
        case 'FETCH_SUCCESS':
            return { ...state, isLoading: false, data: action.payload };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload || 'Unexpected error',
            };
        default:
            throw new Error('Unhandled action type');
    }
}
