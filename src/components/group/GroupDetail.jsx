import { formatDate } from '../../utils/dateUtils'

function GroupDetail({ group, onEdit, onClose, isClosed }) {
    return (
        <div>
            <h2>{group.name}</h2>
            <p>{group.description}</p>
            <p>Inicio: {formatDate(group.startDate)}</p>
            <p>Estado: {isClosed ? 'Cerrado' : 'Abierto'}</p>
            <button onClick={onEdit} disabled={isClosed}>Editar</button>
            <button onClick={onClose} disabled={isClosed}>Cerrar Grupo</button>
        </div>
    )
}

export default GroupDetail