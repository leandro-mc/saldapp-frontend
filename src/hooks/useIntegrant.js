import { useState, useEffect } from 'react'
import { createIntegrant, updateIntegrant as updateIntegrantService, deleteIntegrant, getIntegrantsByGroup } from '../services/integrantService'

export function useIntegrant(groupId) {
    const [integrants, setIntegrants] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchIntegrantsByGroup() {
            setLoading(true)
            setError(null)
            try{
                const foundIntegrants = await getIntegrantsByGroup(groupId)
                setIntegrants(foundIntegrants)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }                        
        }

        if (groupId) fetchIntegrantsByGroup()

    }, [groupId])

    async function addIntegrant(data) {
        setLoading(true)
        setError(null)
        try {
            const created = await createIntegrant(groupId, data)
            setIntegrants(integrants => [...integrants, created])
        } catch (error){
            setError(error)
        } finally {
            setLoading(false)
        }        
    }

    async function updateIntegrant(integrantId, data) {
        setLoading(true)
        setError(null)
        try {
            const updated = await updateIntegrantService(groupId, integrantId, data)
            setIntegrants(integrants => integrants.map(i => i.id === integrantId ? updated : i))
        } catch (error){
            setError(error)
        } finally {
            setLoading(false)
        }     
    }

    async function removeIntegrant(integrantId) {
        setLoading(true)
        setError(null)
        try {
            await deleteIntegrant(groupId, integrantId)
            setIntegrants(integrants => integrants.filter(i => i.id !== integrantId))
        } catch (error){
            setError(error)
        } finally {
            setLoading(false)
        }     
    }


    return { integrants, loading, error, addIntegrant, updateIntegrant, removeIntegrant }
}
