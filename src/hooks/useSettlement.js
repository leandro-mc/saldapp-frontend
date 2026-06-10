import { useState } from "react";
import { getSettlementGroup } from "../services/settlementService";

export function useSettlement(groupId) {
    const [settlements, setSettlements] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function loadSettlement(){
        setLoading(true)
        setError(null)
        try {
            const foundSettlements = await getSettlementGroup(groupId)
            setSettlements(foundSettlements)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return {settlements, loading, error, loadSettlement}
    
}