import { useEffect, useReducer } from 'react';
import api from '../utils/api';
import { dataFetchReducer, initialState } from './dataFetchReducer';

export function useFetch(endpoint, immediate = true) {
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
    }, [endpoint, immediate]);

    return state; // { isLoading, isError, data, errorMessage }
}
