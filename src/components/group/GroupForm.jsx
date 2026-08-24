import { useState } from 'react'
import ErrorMessage from '../shared/ErrorMessage'
import SelectList from '../shared/SelectList'

function GroupForm({ isEditing = false, initialData = {}, onSubmit, onCancel, loading, error }) {
    const [name, setName] = useState(initialData.name || '')
    const [description, setDescription] = useState(initialData.description || '')
    const [startDate, setStartDate] = useState(initialData.startDate || '')
    const [currency, setCurrency] = useState(initialData.currency || '')

    function handleSubmit(e) {
        e.preventDefault()
        const isoDate = startDate ? startDate + 'T00:00:00' : ''
        onSubmit({ name, description, currency, startDate: isoDate })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b pb-3">
                {isEditing ? 'Editar grupo' : 'Agregar grupo'}
            </h2>

            <div>    
                <label className="block text-sm font-medium text-gray-700">Moneda</label>   
                <SelectList
                    options={['₡', '$', '€', '£', '¥', 'CHF ', 'R$', 'S/', '$U ', '₲', 'Bs.', 'RD$', 'Q ', 'L ', 'C$', 'B/.']}
                    getLabel={c => c}
                    getValue={c => c}
                    value={currency}
                    onChange={setCurrency}
                    placeholder="Seleccionar moneda"
                />
            </div> 

            <div>  
                <label clasName="block text-sm font medium text-gray-700">Nombre del Grupo</label>
                <input 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder='Ej: Viaje a la Playa' 
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none 
                                focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>  

            <div>
                <label clasName="block text-sm font medium text-gray-700"> 
                    Descripción
                    <span className="text-gray-400 font-normal ml-1">(optional)</span>
                </label>
                <textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    rows={2}
                    placeholder='Descripción del grupo' 
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none 
                                focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                /> 
            </div> 

            {!isEditing && (
                <div>
                    <label clasName="block text-sm font medium text-gray-700">Fecha de inicio</label>
                    <input 
                        type='date' 
                        value={startDate} 
                        onChange={e => setStartDate(e.target.value)} 
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none 
                                focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            )}          
        
            <div className="flex gap-2">
                <button 
                    type='submit' 
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors
                                font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Guardando...' : 'Guardar'}
                </button>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-none bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 text-sm font-medium"
                    >
                        Volver
                    </button>
                )}
            </div>

            <ErrorMessage error={error} />
        </form>
    )
}

export default GroupForm