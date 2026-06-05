function IntegrantList({ integrants, onEdit, onDelete, disabled }){

    if (integrants.length === 0) return <p>No hay integrantes en este grupo.</p>

    return (
        <>
            <h3>Integrantes</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Total Gastado</th>
                        <th>Balance</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {integrants.map(integrant => {
                        // const balanceData = balance.find(b => b.integrantId === integrant.id)

                        return (
                            <tr key={integrant.id}>
                                <td>{integrant.name}</td>
                                <td>{null/*balanceData?.totalPaid ?? '-'*/}</td>
                                <td>{null/*balanceData?.balance ?? '-'*/}</td>
                                <td>
                                    <button onClick={() => onEdit(integrant)} disabled={disabled}>
                                        Editar
                                    </button>
                                    <button onClick={() => onDelete(integrant.id)} disabled={disabled}>
                                        Eliminar
                                    </button>
                                    <button onClick={null/*() => onDetails(integrant.id)*/}>
                                        Detalles
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default IntegrantList
