import { useState } from "react"
import { createGroup } from "../services/groupService"

export function useCreateGroup() {
    const [createdGroup, setCreatedGroup] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function create(data) { 
        setLoading(true)
        setError(null)
        try {
            const group = await createGroup(data)
            setCreatedGroup(group)
            return group
        } catch(err) {
            setError(err)
        } finally {
            setLoading(true)
        }
    }

    return { createdGroup, loading, error, create }
}
