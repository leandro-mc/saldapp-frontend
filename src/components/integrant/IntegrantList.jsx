function IntegrantList({ integrantsBalances, onEdit, onDelete, disabled }){

    if (integrantsBalances.length === 0) return <p>No hay integrantes en este grupo.</p>

    return (
        <>
            <h3>Integrantes</h3>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Total Gastado</th>
                        <th>Balance</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {integrantsBalances.map((balance, index) => {
                        // const balanceData = balance.find(b => b.integrantId === integrant.id)
                        return (
                            <tr key={balance.integrantId}>
                                <td>{
                                    index + 1                                    
                                }</td>
                                <td>{balance.integrantName}</td>
                                <td>{balance?.totalPaid ?? '-'}</td>
                                <td>{balance?.balance ?? '-'}</td>
                                <td>
                                    <button onClick={() => onEdit(balance.integrantId)} disabled={disabled}>
                                        Editar
                                    </button>
                                    <button onClick={() => onDelete(balance.integrantId)} disabled={disabled}>
                                        Eliminar
                                    </button>
                                    <button onClick={null/*() => onDetails(balance.integrantId)*/}>
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
