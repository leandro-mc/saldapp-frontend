import { useState } from "react";
import { createExpense, updateExpense as updateExpenseService, getExpensesByIntegrant, deleteExpense } from "../services/expenseService";

export function useExpense(groupId) {
    const [integrantExpenses, setIntegrantExpenses] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [currentIntegrantId, setCurrentIntegrantId] = useState(null)

    async function loadByIntegrant(integranId) {
        setLoading(true)
        setError(null)
        try {
            const foundExpenses = await getExpensesByIntegrant(groupId, integranId)
            setIntegrantExpenses(foundExpenses)
            setCurrentIntegrantId(integranId)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    async function addExpense(data) {
        setLoading(true)
        setError(null)
        try {
            const created = await createExpense(groupId, data)
            if (created.payedBy === currentIntegrantId){
                setIntegrantExpenses([...integrantExpenses, created])
            }
            return created
        } catch(error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    async function updateExpense(expenseId, data) {
        setLoading(true)
        setError(null)
        try {
            const updated = await updateExpenseService(groupId, expenseId, data)

            const exists = integrantExpenses.some(e => e.id === expenseId)            
            if (exists && updated.payedBy === currentIntegrantId){
                setIntegrantExpenses(integrantExpenses => integrantExpenses.map(e => e.id === updated.id ? updated : e))
            } 
            else if (exists && updated.payedBy !== currentIntegrantId){
                setIntegrantExpenses(integrantExpenses => integrantExpenses.filter(e => e.id !== expenseId))
            } 
            else if (!exists && updated.payedBy === currentIntegrantId){
                setIntegrantExpenses([...integrantExpenses, updated])
            }
            return updated
        } catch(error){
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    async function removeExpense(expenseId) {
        setLoading(true)
        setError(null)
        try {
            await deleteExpense(groupId, expenseId)
            setIntegrantExpenses(integrantExpenses => integrantExpenses.filter(e => e.id !== expenseId))
            return true
        } catch(error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return {integrantExpenses, loading, error, loadByIntegrant, addExpense, updateExpense, removeExpense }
}


