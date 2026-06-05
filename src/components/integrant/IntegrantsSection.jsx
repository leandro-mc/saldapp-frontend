import { useState } from 'react'
import IntegrantForm from '../integrant/IntegrantForm'
import IntegrantList from '../integrant/IntegrantList'
import LoadingState from '../shared/LoadingState'
import ErrorMessage from '../shared/ErrorMessage'
import { useBalance } from '../../hooks/useBalance'

function IntegrantsSection({ 
        groupId, isClosed, integrants, integrantLoading, integrantError, 
        addIntegrant, updateIntegrant, removeIntegrant, onMutation 
}) {
    const { integrantsBalances, loading, error, refresh, updateIntegrantBalance } = useBalance(groupId)

    const [editingIntegrant, setEditingIntegrant] = useState(null)

    async function handleMutation() {
        await refresh()
        onMutation?.()
    }

    if (loading) return <LoadingState />
    if (error) return <ErrorMessage error={error} />
    
    if (editingIntegrant) return (
        <IntegrantForm 
            key={editingIntegrant.id}
            initialData={editingIntegrant}
            loading={integrantLoading}
            error={integrantError}
            onSubmit={async (data) => {
                const updated = await updateIntegrant(editingIntegrant.id, data)
                if (updated) {
                    setEditingIntegrant(null)
                    await updateIntegrantBalance(updated.id)
                }
            }}
        />
    )

    return (
        <>
            {!isClosed &&
            <IntegrantForm
                loading={integrantLoading}
                error={integrantError}
                onSubmit={async (data) => {
                    const added = await addIntegrant(data)
                    if (added) handleMutation()                    
                }}
            />
            }
            <IntegrantList 
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
                disabled={isClosed}
            />
        </>
    )
}

export default IntegrantsSection