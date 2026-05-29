import { ApiError } from './ApiError'

export function parseApiError(axiosError) {
    if (axiosError.response) {
        // The backend responded with error (4xx, 5xx)
        const { timestamp, status, error, message, path, errors } = axiosError.response
        return new ApiError(timestamp, status, error, message, path, errors)
    }
    if (axiosError.request) {
        // The request was sent, but no response was recived
        return new ApiError(
            new Date().toISOString(),
            0,
            'Network Error',
            'No response received from the server',
            null,
            {}            
        )
    }

    return new ApiError(
        new Date().toISOString(),
        0,
        'Client Error',
        'Unexpected error occurred while setting up the request',
        null,
        {}
    )
}