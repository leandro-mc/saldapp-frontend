import { useState } from 'react'
import IntegrantForm from '../integrant/IntegrantForm'
import IntegrantList from '../integrant/IntegrantList'
import LoadingState from '../shared/LoadingState'
import ErrorMessage from '../shared/ErrorMessage'
import { useBalance } from '../../hooks/useBalance'

function IntegrantsSection({ 
        groupId, groupCurrency, isClosed, integrants, integrantLoading, integrantError, 
        addIntegrant, updateIntegrant, removeIntegrant, onDetails, onMutation 
}) {
    const { integrantsBalances, loading, error, refresh } = useBalance(groupId)

    const [editingIntegrant, setEditingIntegrant] = useState(null)

    async function handleMutation() {
        await refresh()
        onMutation?.()
    }

    if (loading) return <LoadingState />
    if (error) return <ErrorMessage error={error} />
    
    if (editingIntegrant) return (
        <div className="flex-1 w-full bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <IntegrantForm 
                key={editingIntegrant.id}
                initialData={editingIntegrant}
                loading={integrantLoading}
                error={integrantError}
                onSubmit={async (data) => {
                    const updated = await updateIntegrant(editingIntegrant.id, data)
                    if (updated) {
                        setEditingIntegrant(null)
                        handleMutation()
                    }
                }}
            />
        </div>
    )

    return (
        <div className="flex-1 w-full bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            {!isClosed &&(
                <div className="mb-6 pb-4 border-b border-gray-100">
                    <IntegrantForm
                        loading={integrantLoading}
                        error={integrantError}
                        onSubmit={async (data) => {
                            const added = await addIntegrant(data)
                            if (added) handleMutation()                    
                        }}
                    />
                </div>
            )}
            <IntegrantList 
                groupCurrency={groupCurrency}
                integrantsBalances={integrantsBalances}
                onEdit={ (integrantId) => {
                    const integrant = integrants.find(i => i.id === integrantId)
                    setEditingIntegrant(integrant)
                    }
                }
                onDelete={async (integrantId) => {
                    const check = await removeIntegrant(integrantId)
                    if (check) handleMutation()
                }}
                onDetails={onDetails}
                disabled={isClosed}
            />
        </div>
    )
}

export default IntegrantsSection