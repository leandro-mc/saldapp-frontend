import { useState } from 'react'
import IntegrantForm from '../integrant/IntegrantForm'
import IntegrantList from '../integrant/IntegrantList'
import LoadingState from '../shared/LoadingState'
import ErrorMessage from '../shared/ErrorMessage'
import Modal from '../shared/Modal'
import ExpenseForm from '../expense/ExpenseForm'
import ExpensesSection from '../expense/ExpensesSection'
import { useBalance } from '../../hooks/useBalance'
import { useExpense } from '../../hooks/useExpense'

function IntegrantsSection({ 
        groupId, groupCurrency, isClosed, integrants, integrantLoading, integrantError, 
        addIntegrant, updateIntegrant, removeIntegrant, onMutation 
}) {
    const { integrantsBalances, loading, error, refresh } = useBalance(groupId)
    const { addExpense } = useExpense(groupId)

    const [editingIntegrant, setEditingIntegrant] = useState(null)
    const [showAddIntegrant, setShowAddIntegrant] = useState(false)
    const [showAddExpense, setShowAddExpense] = useState(false)
    const [detailsIntegrant, setDetailsIntegrant] = useState(null)

    async function handleMutation() {
        await refresh()
        onMutation?.()
    }

    if (loading) return <LoadingState />
    if (error) return <ErrorMessage error={error} />
    
    return (
        <div className="flex-1 w-full bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            {/* Toolbar: only show simple controls, keep UI focused on the table */}
            {!isClosed && (
                <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-600">Administrar integrantes</div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowAddIntegrant(true)}
                            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm font-medium"
                        >
                            Agregar integrante
                        </button>
                        <button
                            onClick={() => setShowAddExpense(true)}
                            className="bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-900 text-sm font-medium"
                        >
                            Agregar gasto
                        </button>
                    </div>
                </div>
            )}

            <IntegrantList 
                groupCurrency={groupCurrency}
                integrantsBalances={integrantsBalances}
                onEdit={ (integrantId) => {
                    const integrant = integrants.find(i => i.id === integrantId)
                    setEditingIntegrant(integrant)
                }}
                onDelete={async (integrantId) => {
                    const check = await removeIntegrant(integrantId)
                    if (check) handleMutation()
                }}
                onDetails={(integrantId) => {
                    const integrant = integrants.find(i => i.id === integrantId)
                    setDetailsIntegrant(integrant)
                }}
                disabled={isClosed}
            />

            {/* Add Integrant Modal */}
            <Modal isOpen={showAddIntegrant || !!editingIntegrant} title={editingIntegrant ? 'Editar integrante' : 'Agregar integrante'} onClose={() => { setShowAddIntegrant(false); setEditingIntegrant(null) }}>
                <IntegrantForm
                    initialData={editingIntegrant || {}}
                    loading={integrantLoading}
                    error={integrantError}
                    onSubmit={async (data) => {
                        if (editingIntegrant) {
                            const updated = await updateIntegrant(editingIntegrant.id, data)
                            if (updated) {
                                setEditingIntegrant(null)
                                handleMutation()
                            }
                        } else {
                            const added = await addIntegrant(data)
                            if (added) {
                                setShowAddIntegrant(false)
                                handleMutation()
                            }
                        }
                    }}
                    onCancel={() => { setShowAddIntegrant(false); setEditingIntegrant(null) }}
                />
            </Modal>

            {/* Add Expense Modal */}
            <Modal isOpen={showAddExpense} title={'Agregar gasto'} onClose={() => setShowAddExpense(false)}>
                <ExpenseForm
                    integrants={integrants}
                    loading={false}
                    error={null}
                    onSubmit={async (data) => {
                        const created = await addExpense(data)
                        if (created) {
                            setShowAddExpense(false)
                            handleMutation()
                        }
                    }}
                    onCancel={() => setShowAddExpense(false)}
                />
            </Modal>

            {/* Details Modal: shows expenses for a specific integrant */}
            <Modal isOpen={!!detailsIntegrant} title={`Gastos de ${detailsIntegrant?.name || ''}`} onClose={() => setDetailsIntegrant(null)}>
                {detailsIntegrant && (
                    <ExpensesSection
                        groupId={groupId}
                        isClosed={isClosed}
                        groupCurrency={groupCurrency}
                        integrants={integrants}
                        selectedIntegrant={detailsIntegrant}
                        onMutation={() => handleMutation()}
                    />
                )}
            </Modal>
        </div>
    )
}

export default IntegrantsSection