import axios from 'axios';

/**
 * Preconfigured Axios instance for making API calls.
 * Sets the base URL to '/api' so requests like `api.get('/words')`
 * are sent to `/api/words`.
 *
 * @module api
 * @type {AxiosInstance}
 */
const api = axios.create({
    baseURL: '/api',
});

export default api;
