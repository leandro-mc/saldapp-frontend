import { useState } from 'react'
import SelectList from '../shared/SelectList'
import ErrorMessage from '../shared/ErrorMessage'


function ExpenseForm({ initialData = {}, integrants, onSubmit, loading, error }){
    const [payedBy, setPayedBy] = useState(initialData.payedBy || '')
    const [description, setDescription] = useState(initialData.description || '')
    const [amount, setAmount] = useState(initialData.amount || '')
    const [date, setDate] = useState(initialData.date || '')

    function handleSubmit(e) {
        e.preventDefault()
        const isoDate = date ? date + 'T00:00:00' : ''
        onSubmit({ payedBy, description, amount, date: isoDate })
    }

    const isEditing = !!initialData.payedBy

    return (
        <form onSubmit={handleSubmit} className='space-y-3'>
            <h3 className="text-base font-bold text-blue-700 mb-3 border-b pb-2">
                {isEditing ? 'Editar Gasto' : 'Agregar Gasto'}
            </h3>

            <div>
                <label className="block text-xs font-medium text-gray-700">Pagado por</label>
                <SelectList 
                    options={integrants}
                    getLabel={integrant => integrant.name}
                    getValue={integrant => integrant.id}
                    value={payedBy}
                    onChange={setPayedBy}
                    placeholder="Seleccionar integrante"
                />
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-700">Descripción</label>
                <input 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    placeholder="Ej: Peajes de ida" 
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none 
                                focus:border-blue-500 focus-ring-1 focus-ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700">Monto</label>
                <input 
                    type="number" 
                    value={amount} 
                    onChange={e => setAmount(e.target.value)} 
                    placeholder="0.00" 
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none 
                                focus:border-blue-500 focus-ring-1 focus-ring-blue-500"
                />
            </div>

            {!isEditing && (
                <div>
                    <label className="block text-xs font-medium text-gray-700">Fecha del gasto</label>
                    <input 
                        type="date" 
                        value={date} 
                        onChange={e => setDate(e.target.value)} 
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none 
                                focus:border-blue-500 focus-ring-1 focus-ring-blue-500"
                    />
                </div>
            )}

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition-colors
                            text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed mt-1"
            >
                {loading ? 'Guardando...' : 'Guardar'}
            </button>

            <ErrorMessage error={error} />
        </form>
    )
}

export default ExpenseForm
