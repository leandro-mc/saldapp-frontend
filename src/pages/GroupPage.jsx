import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useGroup } from '../hooks/useGroup'
import { useIntegrant } from '../hooks/useIntegrant'
import GroupDetail from '../components/group/GroupDetail'
import GroupForm from '../components/group/GroupForm'
import LoadingState from '../components/shared/LoadingState'
import ErrorMessage from '../components/shared/ErrorMessage'
import IntegrantsSection from '../components/integrant/IntegrantsSection'
import SettlementSection from '../components/settlement/SettlementSection'

function GroupPage() {
    const { id } = useParams()
    const { group, loading, actionLoading, error, actionError, update, close, refresh } = useGroup(id)
    const [isEditing, setIsEditing] = useState(false)

    const { integrants, addIntegrant, updateIntegrant, removeIntegrant,
            loading: integrantsLoading,
            actionError:integrantActionError 
        } = useIntegrant(id)    

    const [showSettlement, setShowSettlement] = useState(false)
    const [settlementTrigger, setSettlementTrigger] = useState(0)

    if (loading) return <LoadingState />
    if (error) return <ErrorMessage error={error} />
    if (!group) return null

    const isClosed = group?.endDate !== null && group?.endDate !== undefined
    const isSettlementVisible = isClosed || showSettlement

    async function handleMutation() {
        await refresh()
        if (showSettlement) setSettlementTrigger(prev => prev + 1)
    }

    if (isEditing) return (
        <div className="max-w-2xl mx-auto px-4 py-6 md:px-8 space-y-6">
            <GroupForm 
                isEditing={isEditing}
                initialData={group}
                loading={actionLoading}
                error={actionError}
                onSubmit={async (data) => {
                    const updated = await update(data)
                    if (updated) setIsEditing(false)
                }}
                onCancel={() => setIsEditing(false)}
            />
        </div>
    )

    return (    
        <div className="max-w-7xl mx-auto px-4 py-6 md:px-8 space-y-6">

            <GroupDetail
                group={group}
                isClosed={isClosed}
                onEdit={(() => setIsEditing(true))}
                onClose={close}
            /> 
            
            {/* Central panel: show only the integrantes table. Expenses and details open in modals. */}
            <div className="flex flex-col gap-6 items-start">
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
                    onMutation={handleMutation}
                />            
            </div>
            
            <SettlementSection 
                groupId={id}
                isClosed={isClosed}
                groupCurrency={group.currency}
                showSettlement={isSettlementVisible}
                onToggle={() => setShowSettlement(prev => !prev)}
                refreshTrigger={settlementTrigger}
            />
        </div>
    )
}

export default GroupPage
