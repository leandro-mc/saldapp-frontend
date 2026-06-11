import { formatMoney } from "../../utils/moneyUtils"

function SettlementList({ settlements, groupCurrency }) {
    if (settlements.length === 0) return (
        <div className="py-8 text-center">
            <p className="text-sm font-medium text-green-600">No hay deudas pendientes</p>
            <p className="text-xs text-gray-400 mt-1">Todos los gastos están equilibrados.</p>
        </div>
    )

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600">
                    <tr>
                        <th className="py-3 px-4 font-medium border-b">Quién paga</th>
                        <th className="py-3 px-4 font-medium border-b"></th>
                        <th className="py-3 px-4 font-medium border-b">A quién</th>
                        <th className="py-3 px-4 font-medium border-b">Monto {groupCurrency}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {settlements.map((transaction, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4 font-medium text-red-800">{transaction.fromIntegrantName}</td>
                            <td className="py-3 px-4 text-gray-800">→</td>
                            <td className="py-3 px-4 font-medium text-green-800">{transaction.toIntegrantName}</td>
                            <td className="py-3 px-4 font-bold text-gray-800">{formatMoney(transaction.amount, groupCurrency)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SettlementList
