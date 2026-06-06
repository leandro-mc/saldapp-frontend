import httpClient from '../config/httpClient'

/**
 * @param {number} groupId
 * @param {CreateExpenseRequest} data
 * @return {Promise<ExpenseResponse>}
 */
export async function createExpense(groupId, data) {
    const response = await httpClient.post(`/groups/${groupId}/expenses`, data)
    return response
}

/**
 * @param {number} groupId 
 * @param {number} expenseId 
 * @param {UpdateExpenseRequest} data
 * @return {Promise<ExpenseResponse>} 
 */
export async function updateExpense(groupId, expenseId, data) {
    const response = await httpClient.patch(`/groups/${groupId}/expenses/${expenseId}`, data)
    return response
}

/**
 * @param {number} groupId 
 * @param {number} expenseId 
 */
export async function deleteExpense(groupId, expenseId) {
    await httpClient.delete(`/groups/${groupId}/expenses/${expenseId}`)
}

/**
 * @param {number} groupId 
 * @param {number} integranId 
 * @returns {Promise<ExpenseResponse[]>}
 */
export async function getExpensesByIntegrant(groupId, integranId) {
    const response = httpClient.get(`/groups/${groupId}/expenses/${integranId}`)
    return response
}