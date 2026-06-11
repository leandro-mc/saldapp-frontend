import { useState } from "react"
import ConfirmDialog from "../shared/ConfirmDialog"
import { formatMoney } from "../../utils/moneyUtils"
import { formatDate } from "../../utils/dateUtils"

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

    if (expenses.length === 0) return (
        <div className="py-6 text-center">
            <p className="text-sm text-gray-400">
                {integrant.name} no tiene gastos registrados.
            </p>
        </div>
    )

    const total = expenses.reduce((acc, e) => acc + e.amount, 0)

    return (
        <>
            <h3 className="text-base font-bold text-blue-700 mb-3 border-b pb-2">
                Gastos de {integrant.name}
            </h3>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="py-2 px-3 font-medium">#</th>
                            <th className="py-2 px-3 font-medium">Fecha</th>
                            <th className="py-2 px-3 font-medium">Descripcion</th>
                            <th className="py-2 px-3 font-medium">Monto {groupCurrency}</th>                       
                            <th className="py-2 px-3 font-medium text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {expenses.map((expense, index) => {
                            return (
                                <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-2 px-3 text-gray-500">{index + 1}</td>
                                    <td className="py-2 px-3 text-gray-700">{formatDate(expense.date)}</td>
                                    <td className="py-2 px-3 text-gray-700">{expense.description}</td>
                                    <td className="py-2 px-3 font-medium text-gray-800">{formatMoney(expense.amount, groupCurrency)}</td>
                                    
                                    <td className="py-2 px-3 text-center space-x-2">
                                        <button 
                                            onClick={() => onEdit(expense.id)} 
                                            disabled={disabled}
                                            className="text-blue-700 hover:text-blue-900 text-xs font-medium 
                                                        disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteClick(expense.id)}
                                            disabled={disabled}
                                            className="text-red-700 hover:text-red-900 text-xs font-medium 
                                                        disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            Eliminar
                                        </button>                                    
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    {/* table footer with the total */}
                    <tfoot className="border-t border-gray-200 bg-gray-50">
                        <tr>
                            <td className="py-2 px-3"></td>
                            <td className="py-2 px-3"></td>
                            <td className="py-2 px-3 font-semibold text-gray-700">Total</td>
                            <td className="py-2 px-3 font-bold text-blue-600">{formatMoney(total, groupCurrency)}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

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