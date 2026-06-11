import { useState } from "react"
import ConfirmDialog from "../shared/ConfirmDialog"
import { formatMoney } from "../../utils/moneyUtils"

function IntegrantList({ groupCurrency, integrantsBalances, onEdit, onDelete, onDetails, disabled }){

    const [dialog, setDialog] = useState({ isOpen: false, integrantId: null })

    function handleDeleteClick(integrantId) {
        setDialog({ isOpen: true, integrantId})
    }

    async function handleConfirm() {
        await onDelete(dialog.integrantId)
        setDialog({ isOpen: false, integrantId: null })
    }

    function handleCancel() {
        setDialog({ isOpen: false, integrantId: null })
    }

    if (integrantsBalances.length === 0) return (
    <div className="py-8 text-center">
        <p className="text-sm text-gray-400">No hay integrantes en este grupo.</p>
        <p className="text-xs text-gray-400 mt-1">Agregá el primero usando el formulario.</p>
    </div>    
    )

    const balance = integrantsBalances.reduce((acc, b) => acc + b.balance, 0)
    const total = integrantsBalances.reduce((acc, b) => acc + b.totalPaid, 0)


    return (
        <>
            <h3 className="text-base font-bold text-gray-800 mb-3">Integrantes</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="py-2 px-3 font-medium">#</th>
                            <th className="py-2 px-3 font-medium">Nombre</th>
                            <th className="py-2 px-3 font-medium">Gastado</th>
                            <th className="py-2 px-3 font-medium">Balance({groupCurrency})</th>
                            <th className="py-2 px-3 font-medium text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {integrantsBalances.map((balance, index) => {
                            return (
                                <tr 
                                    key={balance.integrantId}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-2 px-3 text-gray-500">{index + 1}</td>
                                    <td className="py-2 px-3 font-medium text-gray-800">{balance.integrantName}</td>
                                    <td className="py-2 px-3 text-gray-700">{formatMoney(balance.totalPaid, groupCurrency)}</td>
                                    
                                    <td className={`py-2 px-3 font-medium ${
                                        balance.balance > 0
                                        ? 'text-green-700'
                                        : balance.balance < 0
                                        ? 'text-red-700'
                                        : 'text-gray-600'
                                    }`}>
                                        {balance.balance > 0 ? '+' : ''}{formatMoney(balance.balance)}
                                    </td>
                                    
                                    <td className="py-2 px-3 text-center space-x-2">
                                        <button 
                                            onClick={() => onEdit(balance.integrantId)} 
                                            disabled={disabled}
                                            className="text-blue-600 hover:text-blue-800 text-xs font-medium disabled:opacity-40
                                                        disabled:cursor-not-allowed"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteClick(balance.integrantId)} 
                                            disabled={disabled}
                                            className="text-red-700 hover:text-red-900 text-xs font-medium disabled:opacity-40
                                                        disabled:cursor-not-allowed"
                                        >
                                            Eliminar
                                        </button>
                                        <button 
                                            onClick={() => onDetails(balance.integrantId)}
                                            className="text-gray-500 hover:text-gray-700 text-xs font-medium"
                                        >
                                            Detalles
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
                            <td className="py-2 px-3 font-semibold text-gray-700">Total</td>
                            <td className="py-2 px-3 font-bold text-blue-600">{formatMoney(total, groupCurrency)}</td>                            
                            <td className="py-2 px-3 font-bold text-blue-600">{formatMoney(balance, groupCurrency)}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <ConfirmDialog 
                isOpen={dialog.isOpen}
                message={"¿Estas seguro de que deseas eliminar al integrante?"}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </>
    )
}

export default IntegrantList
