import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useGroup } from '../hooks/useGroup'
import { useIntegrant } from '../hooks/useIntegrant'
import GroupDetail from '../components/group/GroupDetail'
import GroupForm from '../components/group/GroupForm'
import LoadingState from '../components/shared/LoadingState'
import ErrorMessage from '../components/shared/ErrorMessage'
import IntegrantsSection from '../components/integrant/IntegrantsSection'
import ExpensesSection from '../components/expense/ExpensesSection'
import SettlementSection from '../components/settlement/SettlementSection'

function GroupPage() {
    const { id } = useParams()
    const { group, loading, actionLoading, error, actionError, update, close, refresh } = useGroup(id)
    const [isEditing, setIsEditing] = useState(false)

    const { integrants, addIntegrant, updateIntegrant, removeIntegrant,
            loading: integrantsLoading,
            actionError:integrantActionError 
        } = useIntegrant(id)    
    const [selectedIntegrant, setSelectedIntegrant] = useState(null)

    const isClosed = group?.endDate !== null && group?.endDate !== undefined

    const [showSettlement, setShowSettlement] = useState(false)
    const [settlementTrigger, setSettlementTrigger] = useState(0)

    const isSettlementVisible = isClosed || showSettlement

    async function handleMutation() {
        await refresh()
        if (showSettlement) setSettlementTrigger(prev => prev + 1)
    }

    if (loading) return <LoadingState />
    if (error) return <ErrorMessage error={error} />
    if (!group) return null

    if (isEditing) return (
        <GroupForm 
            isEditing={isEditing}
            initialData={group}
            loading={actionLoading}
            error={actionError}
            onSubmit={async (data) => {
                const updated = await update(data)
                if (updated) setIsEditing(false)
            }}
        />
    )

    return (    
        <>
            <GroupDetail
                group={group}
                isClosed={isClosed}
                onEdit={(() => setIsEditing(true))}
                onClose={close}
            /> 
            
            <IntegrantsSection 
                groupId={id} 
                groupCurrency={group.currency}
                isClosed={isClosed} 
                integrants={integrants}
                integrantLoading={integrantsLoading}
                integrantError={integrantActionError} 
                addIntegrant={addIntegrant}
                updateIntegrant={updateIntegrant}
                removeIntegrant={removeIntegrant}
                onDetails={(integrantId) => {
                    const integrant = integrants.find(i => i.id === integrantId)
                    setSelectedIntegrant(integrant)
                }}
                onMutation={handleMutation}
            />            
            
            <ExpensesSection 
                groupId={id}
                isClosed={isClosed}
                groupCurrency={group.currency}
                integrants={integrants}
                selectedIntegrant={selectedIntegrant}
                onMutation={handleMutation}
            />
            
            <SettlementSection 
                groupId={id}
                isClosed={isClosed}
                groupCurrency={group.currency}
                showSettlement={isSettlementVisible}
                onToggle={() => setShowSettlement(prev => !prev)}
                refreshTrigger={settlementTrigger}
            />
        </>
    )
}

export default GroupPage
