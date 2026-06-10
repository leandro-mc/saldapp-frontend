import { useState } from "react"
import ConfirmDialog from "../shared/ConfirmDialog"

function ExpenseList({ groupCurrency, expenses, integrant, onEdit, onDelete, disabled }){
    const [dialog, setDialog] = useState({ isOpen: false, expenseId: null })

    function handleDeleteClick(expenseId) {
        setDialog({ isOpen: true, expenseId: expenseId})
    }

    async function handleConfirm() {
        await onDelete(dialog.expenseId)
        setDialog({ isOpen: false, expenseId: null })
    }

    function handleCancel() {
        setDialog({ isOpen: false, integrantId: null })
    }

    if (expenses.length === 0) return <p>{integrant.name} no posee gastos a su nombre.</p>

    const total = expenses.reduce((acc, e) => acc + e.amount, 0)

    return (
        <>
            <h3>Gastos de {integrant.name}</h3>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Descripcion</th>
                        <th>Monto {groupCurrency}</th>                       
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => {
                        return (
                            <tr key={expense.id}>
                                <td>{
                                    index + 1                                    
                                }</td>
                                <td>{expense.description}</td>
                                <td>{groupCurrency}{expense.amount}</td>
                                <td>
                                    <button onClick={() => onEdit(expense.id)} disabled={disabled}>
                                        Editar
                                    </button>
                                    <button onClick={() => handleDeleteClick(expense.id)} disabled={disabled}>
                                        Eliminar
                                    </button>                                    
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td>Total</td>
                        <td>{groupCurrency}{total}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>

            <ConfirmDialog 
                isOpen={dialog.isOpen}
                message={"¿Estas seguro de que deseas eliminar el gasto?"}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </>
    )
}

export default ExpenseList