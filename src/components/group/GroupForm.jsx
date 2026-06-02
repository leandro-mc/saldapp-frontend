import { useState } from 'react'
import ErrorMessage from '../shared/ErrorMessage'

function GroupForm({ isEditing = false, initialData = {}, onSubmit, loading, error }) {
    const [name, setName] = useState(initialData.name || '')
    const [description, setDescription] = useState(initialData.description || '')
    const [startDate, setStartDate] = useState(initialData.startDate || '')

    function handleSubmit(e) {
        e.preventDefault()
        const isoDate = startDate ? startDate + 'T00:00:00' : ''
        onSubmit({ name, description, startDate: isoDate })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>{isEditing ? 'Editar grupo' : 'Agregar grupo'}</h3>
            <input value={name} onChange={e => setName(e.target.value)} placeholder='Nombre' />
            <input value={description} onChange={e => setDescription(e.target.value)} placeholder='Descripción' />            
            {!isEditing && (
                <input type='date' value={startDate} onChange={e => setStartDate(e.target.value)} />
            )}
        
            <button type='submit' disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar'}
            </button>
            <ErrorMessage error={error} />
        </form>
    )
}

export default GroupForm