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
        <form onSubmit={handleSubmit}>
            <h3>{isEditing ? 'Editar Gasto' : 'Agregar Gasto'}</h3>
            <SelectList 
                options={integrants}
                getLabel={integrant => integrant.name}
                getValue={integrant => integrant.id}
                value={payedBy}
                onChange={setPayedBy}
                placeholder="Seleccionar integrante"
            />
            <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Descripción" />
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Monto" />
            {!isEditing && (
                <input type="date" value={date} onChange={e => setDate(e.target.value)} placeholder="Fecha" />
            )}

            <button type="submit" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar'}
            </button>
            <ErrorMessage error={error} />
        </form>
    )
}

export default ExpenseForm
