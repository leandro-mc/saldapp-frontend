import { useState } from 'react'
import ErrorMessage from '../shared/ErrorMessage'

function IntegrantForm({ initialData = {}, onSubmit, loading, error }) {
    const [name, setName] = useState(initialData.name || '')

    function handleSubmit(e){
        e.preventDefault()
        onSubmit({ name })
    }

    const isEditing = !!initialData.name

    return (
        <form onSubmit={handleSubmit}>
            <h3>{isEditing ? 'Editar integrante' : 'Agregar integrante'}</h3>
            <input value={name} onChange={e => setName(e.target.value)} placeholder='Nombre' />

            <button type='submit' disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar'}
            </button>
            <ErrorMessage error={error} />
        </form>
    )
}

export default IntegrantForm