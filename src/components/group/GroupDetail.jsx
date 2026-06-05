import { useState } from 'react'
import { formatDate } from '../../utils/dateUtils'
import ConfirmDialog from '../shared/ConfirmDialog'

function GroupDetail({ group, onEdit, onClose, isClosed }) {

    const [dialog, setDialog] = useState({ isOpen: false })

    function handleCloseClick() {
        setDialog({ isOpen: true})
    }

    async function handleConfirm() {
        onClose()
        setDialog({ isOpen: false })
    }

    function handleCancel() {
        setDialog({ isOpen: false })
    }

    return (
        <div>
            <h3>{`ID del grupo: ${group.id}`}</h3>
            <h2>{group.name}</h2>
            <p>{group.description}</p>
            <p>Estado: {isClosed ? 'Cerrado' : 'Abierto'}</p>
            <p>Inicio: {formatDate(group.startDate)}</p>    
            <p>{`Total de gastos: ${group.currency}${group.totalExpenses}`}</p>     
            <p>{`Cantidad de Integrantes: ${group.integrantCount}`}</p> 
            <p>{`Correspondiente por Integrante: ${group.currency}${group.integrantCount > 0 ? (group.totalExpenses/group.integrantCount).toFixed(2) : 0}`}</p>    
            <button onClick={onEdit} disabled={isClosed}>Editar</button>
            <button onClick={handleCloseClick} disabled={isClosed}>Cerrar Grupo</button>

            <ConfirmDialog 
                isOpen={dialog.isOpen}
                message={"¿Estas seguro de que deseas eliminar al integrante?"}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />

        </div>
    )
}

export default GroupDetail