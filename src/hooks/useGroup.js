import { useEffect, useState } from 'react'
import { updateGroup, getGroup, closeGroup } from '../services/groupService'

export function useGroup(groupId){
    const [group, setGroup] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchGroup() { 
            setLoading(true)
            setError(null)
            try {
                const data = await getGroup(groupId)
                setGroup(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        if (groupId) fetchGroup()
    }, [groupId])

    async function update(data) {
        setLoading(true)
        setError(null)
        try {
            const updated = await updateGroup(groupId, data)
            setGroup(updated)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    async function close() {
        setLoading(true)
        setError(null)
        try {
            const closed = await closeGroup(groupId)
            setGroup(closed)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return {group, loading, error, update, close }
}
