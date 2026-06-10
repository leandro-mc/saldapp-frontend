import { useState } from "react"
import ConfirmDialog from "../shared/ConfirmDialog"

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

    if (integrantsBalances.length === 0) return <p>No hay integrantes en este grupo.</p>

    return (
        <>
            <h3>Integrantes</h3>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Total Gastado {groupCurrency}</th>
                        <th>Balance</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {integrantsBalances.map((balance, index) => {
                        return (
                            <tr key={balance.integrantId}>
                                <td>{
                                    index + 1                                    
                                }</td>
                                <td>{balance.integrantName}</td>
                                <td>{groupCurrency}{balance?.totalPaid ?? '-'}</td>
                                <td>{balance?.balance ?? '-'} ({groupCurrency})</td>
                                <td>
                                    <button onClick={() => onEdit(balance.integrantId)} disabled={disabled}>
                                        Editar
                                    </button>
                                    <button onClick={() => handleDeleteClick(balance.integrantId)} disabled={disabled}>
                                        Eliminar
                                    </button>
                                    <button onClick={() => onDetails(balance.integrantId)}>
                                        Detalles
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

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
