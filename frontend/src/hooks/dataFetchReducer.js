export const initialState = {
    isLoading: false,
    isError: false,
    data: [],
    errorMessage: '',
};

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
