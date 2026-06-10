import httpClient from "../config/httpClient"

/**
 * @param {number} groupId
 * @return {Promise<SettlementResponse[]>}
 */
export async function getSettlementGroup(groupId) {
    const response = await httpClient.get(`/groups/${groupId}/settlements`)
    return response
}