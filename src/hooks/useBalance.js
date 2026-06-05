import { useState, useEffect } from 'react'
import { getBalancesByGroup, getIntegrantBalance } from '../services/balanceService'

export function useBalance(groupId) {
    const [integrantsBalances, setIntegrantsBalances] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchBalancesIntegrantsByGroup() {
            setLoading(true)
            setError(null)
            try{
                const foundBalancesIntegrants = await getBalancesByGroup(groupId)
                setIntegrantsBalances(foundBalancesIntegrants)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }                        
        }

        if (groupId) fetchBalancesIntegrantsByGroup()

    }, [groupId])

    async function refresh() {
        setLoading(true)
        setError(null)
        try{
            const foundBalancesIntegrants = await getBalancesByGroup(groupId)
            setIntegrantsBalances(foundBalancesIntegrants)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }                  
    }

    async function updateIntegrantBalance(integrantId) {
        setLoading(true)
        setError(null)
        try{
            const foundIntegrantBalance = await getIntegrantBalance(groupId, integrantId)
            setIntegrantsBalances(integrantsBalances => integrantsBalances.map(i => i.integrantId === integrantId ? foundIntegrantBalance : i))
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }            
    }

    return { integrantsBalances, loading, error, refresh, updateIntegrantBalance }

}

