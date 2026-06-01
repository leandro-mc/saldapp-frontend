import { useEffect, useState } from 'react'
import { updateGroup, getGroup, closeGroup } from '../services/groupService'

export function useGroup(groupId){
    const [group, setGroup] = useState(null)
    const [loading, setLoading] = useState(false)               // para el fetch inicial
    const [actionLoading, setActionLoading] = useState(false)   // para update/close
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
        setActionLoading(true)
        setError(null)
        try {
            const updated = await updateGroup(groupId, data)
            setGroup(updated)
            return updated
        } catch (err) {
            setError(err)
        } finally {
            setActionLoading(false)
        }
    }

    async function close() {
        setActionLoading(true)
        setError(null)
        try {
            const closed = await closeGroup(groupId)
            setGroup(closed)
        } catch (err) {
            setError(err)
        } finally {
            setActionLoading(false)
        }
    }

    return {group, loading, actionLoading, error, update, close }
}
