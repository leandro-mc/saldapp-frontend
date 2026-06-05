import { formatDate } from '../../utils/dateUtils'

function GroupDetail({ group, onEdit, onClose, isClosed }) {
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
            <button onClick={onClose} disabled={isClosed}>Cerrar Grupo</button>
        </div>
    )
}

export default GroupDetail