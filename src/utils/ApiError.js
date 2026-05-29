export class ApiError extends Error {
    constructor(timestamp, status, error, message, path, errors = {}){
        super(message)
        this.name = 'ApiError'
        this.timestamp = timestamp
        this.status = status
        this.error = error
        this.path = path
        this.errors = errors
    }
}