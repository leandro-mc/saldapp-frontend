import axios from 'axios'
import { parseApiError } from '../utils/errorParser'

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Add a response interceptor to handle errors globally
httpClient.interceptors.response.use(
    response => response.data,                      // successful response, return the data directly
    error => Promise.reject(parseApiError(error))   // parse the error and reject with a standardized ApiError instance
)

export default httpClient