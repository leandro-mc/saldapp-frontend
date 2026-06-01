function ErrorMessage({ error }){
    if(!error) return null

    return (
        <div>
            <p>{error.message}</p>
            {error.errors && Object.entries(error.errors).map(([field, msg]) => (
                <p key={field}><strong>{field}:</strong> {msg}</p>
            ))}
        </div>
    )
}

export default ErrorMessage