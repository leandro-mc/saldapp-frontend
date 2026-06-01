import httpClient from '../config/httpClient'

/**
 * @param {number} groupId  
 * @param {IntegrantRequest} data
 * @return {Promise<IntegrantResponse>}
 */
export async function createIntegrant(groupId, data) {
    const response = await httpClient.post(`/groups/${groupId}/integrants`, data)
    return response
}

/**
 * @param {number} groupId 
 * @param {number} integrantId
 * @param {IntegrantRequest} data 
 * @return {Promise<IntegrantResponse>}
 */
export async function updateIntegrant(groupId, integrantId, data) {
    const response = await httpClient.patch(`/groups/${groupId}/integrants/${integrantId}`, data)
    return response
}

/**
 * @param {number} groupId 
 * @returns {Promise<IntegrantResponse>}
 */
export async function getIntegrantsByGroup(groupId) {
    const response = await httpClient.get(`/groups/${groupId}/integrants`)    
    return response
}

/**
 * @param {number} groupId 
 * @param {number} integrantId 
 */
export async function deleteIntegrant(groupId, integrantId) {
    await httpClient.delete(`/groups/${groupId}/integrants/${integrantId}`)
}
