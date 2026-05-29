export function formatDate(isoString) {
    if (!isoString) return null
    return new Date(isoString).toLocaleDateString('es-CR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
}

export function formatDateTime(isoString) {
    if (!isoString) return null
    return new Date(isoString).toLocaleString('es-CR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })
}

