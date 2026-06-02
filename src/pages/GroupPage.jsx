import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useGroup } from '../hooks/useGroup'
import GroupDetail from '../components/group/GroupDetail'
import GroupForm from '../components/group/GroupForm'
import LoadingState from '../components/shared/LoadingState'
import ErrorMessage from '../components/shared/ErrorMessage'
import IntegrantsSection from '../components/integrant/IntegrantsSection'

function GroupPage() {
    const { id } = useParams()
    const { group, loading, actionLoading, error, actionError, update, close } = useGroup(id)
    const [isEditing, setIsEditing] = useState(false)

    const isClosed = group?.endDate !== null && group?.endDate !== undefined

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
            {!isClosed && <IntegrantsSection groupId={id} isClosed={isClosed} />}
        </>
    )
}

export default GroupPage
