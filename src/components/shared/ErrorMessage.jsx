function ErrorMessage({ error }){
    if(!error) return null

    return (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm font-medium text-red-700">{error.message}</p>
            {error.errors && Object.entries(error.errors).map(([field, msg]) => (
                <p key={field} className="text-xs text-red-600 mt-1">
                    <strong className="capitalize">{field}:</strong> {msg}</p>
            ))}
        </div>
    )
}

export default ErrorMessage