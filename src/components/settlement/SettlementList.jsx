
function SettlementList({ settlements, groupCurrency }) {
    if (settlements.length === 0) return (
        <p>No hay deudas pendientes. Todo está saldado!!</p>
    )

    return (
        <table>
            <thead>
                <tr>
                    <th>Quién paga</th>
                    <th></th>
                    <th>A quién</th>
                    <th>Monto {groupCurrency}</th>
                </tr>
            </thead>
            <tbody>
                {settlements.map((transaction, index) => (
                    <tr key={index}>
                        <td>{transaction.fromIntegrantName}</td>
                        <td>→</td>
                        <td>{transaction.toIntegrantName}</td>
                        <td>{groupCurrency}{transaction.amount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default SettlementList
