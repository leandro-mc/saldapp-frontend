import { useEffect, useState } from "react"
import { useExpense } from "../../hooks/useExpense"
import LoadingState from "../shared/LoadingState"
import ExpenseForm from "./ExpenseForm"
import ExpenseList from "./ExpenseList"

function ExpensesSection({groupId, isClosed, groupCurrency, integrants, selectedIntegrant, onMutation}){
    const { integrantExpenses, loading, error, loadByIntegrant, addExpense, updateExpense, removeExpense } = useExpense(groupId)
    const [ editingExpense, setEditingExpense ] = useState(null)

    useEffect(() => {
        if (selectedIntegrant) loadByIntegrant(selectedIntegrant.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedIntegrant])   

    async function handleMutation() {
        onMutation?.()
    } 

    if (loading) return <LoadingState />

    if (editingExpense && !isClosed) return (
        <ExpenseForm 
            key={editingExpense.id}
            initialData={editingExpense}
            integrants={integrants}
            loading={loading}
            error={error}
            onSubmit={async (data) => {
                const updated = await updateExpense(editingExpense.id, data)
                if (updated) {
                    setEditingExpense(null)
                    handleMutation()
                }
            }}
        />
    )

    return (
        <>
        {selectedIntegrant &&
            <ExpenseList 
                disabled={isClosed}
                groupCurrency={groupCurrency}
                expenses={integrantExpenses}
                integrant={selectedIntegrant}
                onEdit={(expenseId) => {
                    const expense = integrantExpenses.find(e => e.id === expenseId)
                    setEditingExpense(expense)
                }}
                onDelete={async (expenseId) => {
                    await removeExpense(expenseId)
                    handleMutation()
                }}
            />
        }

        {!isClosed && 
            <ExpenseForm 
                integrants={integrants}
                loading={loading}
                error={error}
                onSubmit={async (data) => {
                    const created = await addExpense(data)
                    if (created) handleMutation()                
                }}
            />
        }
        
        </>
    )
}

export default ExpensesSection