import { useState } from 'react'
import { useIntegrant } from '../../hooks/useIntegrant' 
import IntegrantForm from '../integrant/IntegrantForm'
import IntegrantList from '../integrant/IntegrantList'
import LoadingState from '../shared/LoadingState'
import ErrorMessage from '../shared/ErrorMessage'

function IntegrantsSection({ groupId, isClosed, onMutation }) {
    const { integrants, loading, error, actionError, addIntegrant, updateIntegrant, removeIntegrant } = useIntegrant(groupId)
    const [editingIntegrant, setEditingIntegrant] = useState(null)

    if (loading) return <LoadingState />
    if (error) return <ErrorMessage error={error} />
    
    if (editingIntegrant) return (
        <IntegrantForm 
            key={editingIntegrant.id}
            initialData={editingIntegrant}
            loading={loading}
            error={actionError}
            onSubmit={async (data) => {
                const updated = await updateIntegrant(editingIntegrant.id, data)
                if (updated) setEditingIntegrant(null)
            }}
        />
    )

    return (
        <>
            {!isClosed &&
            <IntegrantForm
                loading={loading}
                error={actionError}
                onSubmit={async (data) => {
                    const added = await addIntegrant(data)
                    if (added) onMutation?.()                    
                }}
            />
            }
            <IntegrantList 
                integrants={integrants}
                onEdit={(integrant) => setEditingIntegrant(integrant)}
                onDelete={async (integrantId) => {
                    const check = await removeIntegrant(integrantId)
                    if (check) onMutation?.()
                }}
                disabled={isClosed}
            />
        </>
    )
}

export default IntegrantsSection