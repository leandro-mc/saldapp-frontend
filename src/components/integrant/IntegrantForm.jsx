import { useState } from 'react'
import ErrorMessage from '../shared/ErrorMessage'

function IntegrantForm({ initialData = {}, onSubmit, onCancel, loading, error }) {
    const [name, setName] = useState(initialData.name || '')

    function handleSubmit(e){
        e.preventDefault()
        onSubmit({ name })
    }

    const isEditing = !!initialData.name

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="text-base font-bold text-blue-700 mb-3 border-b pb-2">
                {isEditing ? 'Editar integrante' : 'Agregar integrante'}
            </h3>
            <div className="flex gap-2">
                <input 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder='Nombre' 
                    className="flex-1 rounded-md border border-gray-300 p-2 text-sm focus:outline-none 
                                focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

                <button 
                    type='submit' 
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium
                                transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Guardando...' : 'Guardar'}
                </button>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 text-sm font-medium"
                    >
                        Cancelar
                    </button>
                )}
            </div>            

            
            <ErrorMessage error={error} />
        </form>
    )
}

export default IntegrantForm