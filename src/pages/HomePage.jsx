import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCreateGroup } from '../hooks/useCreateGroup'
import GroupForm from '../components/group/GroupForm'

function HomePage() {
    const navigate = useNavigate()
    const { create, loading, error } = useCreateGroup()
    const [groupId, setGroupId] = useState('')

    async function handleCreate(data) {
        const group = await create(data)
        if (group) navigate(`/groups/${group.id}`)        
    }

    function handleAccess(e) {
        e.preventDefault()
        if (groupId) navigate(`/groups/${groupId}`)
    }

    return (
        <div>
            <h1>SaldApp</h1>

            <GroupForm onSubmit={handleCreate} loading={loading} error={error} />

            <h3>Ingresar a grupo existente</h3>
            <form onSubmit={handleAccess}>
                <input value={groupId} onChange={e => setGroupId(e.target.value)} placeholder='Id del Grupo' />
                <button type='submit'>Ingresar</button>
            </form>
        </div>
    )
}

export default HomePage