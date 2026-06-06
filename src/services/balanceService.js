import httpClient from '../config/httpClient';

/**
 * @param {number} groupId
 * @return {Promise<BalanceResponse[]>}
 */
export async function getBalancesByGroup(groupId) {
    const response = await httpClient.get(`/groups/${groupId}/balances`)
    return response
}

/**
 * @param {number} groupId 
 * @param {number} integrantId
 * @return {Promise<BalanceResponse>}
 */
export async function getIntegrantBalance(groupId, integrantId) {
    const response = await httpClient.get(`/groups/${groupId}/balances/${integrantId}`)
    return response
}