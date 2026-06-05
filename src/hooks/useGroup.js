import { useEffect, useState } from 'react'
import { updateGroup, getGroup, closeGroup } from '../services/groupService'

export function useGroup(groupId){
    const [group, setGroup] = useState(null)
    const [loading, setLoading] = useState(false)               // para el fetch inicial
    const [actionLoading, setActionLoading] = useState(false)   // para update/close
    const [error, setError] = useState(null)
    const [actionError, setActionError] = useState(null)


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

    async function refresh() { 
        if (!groupId) return
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

    async function update(data) {
        setActionLoading(true)
        setActionError(null)
        try {
            const updated = await updateGroup(groupId, data)
            setGroup(updated)
            return updated
        } catch (err) {
            setActionError(err)
        } finally {
            setActionLoading(false)
        }
    }

    async function close() {
        setActionLoading(true)
        setActionError(null)
        try {
            const closed = await closeGroup(groupId)
            setGroup(closed)
        } catch (err) {
            setActionError(err)
        } finally {
            setActionLoading(false)
        }
    }

    return {group, loading, actionLoading, error, actionError, update, close, refresh }
}
