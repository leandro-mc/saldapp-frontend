function IntegrantList({ integrants, onEdit, onDelete, disabled }){

    if (integrants.length === 0) return <p>No hay integrantes en este grupo.</p>

    return (
        <>
            <h3>Integrantes</h3>
            <ul>
                {integrants.map(integrant => (
                    <li key={integrant.id}>
                        <span>{integrant.name}</span>
                        <button 
                            onClick={() => onEdit(integrant)}
                            disabled={disabled}
                        >
                            Editar
                        </button>
                        <button 
                            onClick={() => onDelete(integrant.id)}
                            disabled={disabled}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default IntegrantList
