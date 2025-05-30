import { useEffect, useReducer } from 'react';
import api from '../utils/api';
import { dataFetchReducer, initialState } from './dataFetchReducer';

/**
 * Custom hook to fetch data from a given API endpoint using axios.
 * Manages loading, success, and error states through a reducer.
 *
 * @function
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {boolean} [immediate=true] - Whether to initiate the fetch immediately on mount.
 * @param {Array<any>} [deps=[]] - Additional dependencies that trigger refetching.
 *
 * @returns {Object} An object representing fetch state:
 *  - `data`: The response data.
 *  - `isLoading`: Boolean indicating if the fetch is in progress.
 *  - `isError`: Boolean indicating if there was an error.
 *  - `errorMessage`: Error message if the fetch failed.
 */
export function useFetch(endpoint, immediate = true, deps = []) {
    const [state, dispatch] = useReducer(dataFetchReducer, initialState);

    useEffect(() => {
        if (!immediate || !endpoint) return;

        let isMounted = true;

        const fetchData = async () => {
            dispatch({ type: 'FETCH_INIT' });
            try {
                const response = await api.get(endpoint);
                if (isMounted) {
                    dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
                }
            } catch (error) {
                dispatch({
                    type: 'FETCH_FAILURE',
                    payload: error.response?.data?.message || 'Request failed',
                });
            }
        };

        fetchData();
        return () => {
            isMounted = false;
        };
    }, [endpoint, immediate, ...deps]);

    return state;
}
