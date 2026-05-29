import httpClient from '../config/httpClient';

/**
 * @param {CreateGroupRequest} createGroupRequest
 * @return {Promise<GroupResponse>}
 */
export async function createGroup(createGroupRequest) {
    const response = await httpClient.post('/groups', createGroupRequest)
    return response
}

/**
 * @param {number} id
 * @return {Promise<GroupResponse>}
 */
export async function getGroup(id) {
    const response = await httpClient.get(`/groups/${id}`)
    return response
}

/**
 * @param {number} id
 * @param {UpdateGroupRequest} updateGroupRequest
 * @return {Promise<GroupResponse>}
 */
export async function updateGroup(id, updateGroupRequest){
    const response = await httpClient.patch(`/groups/${id}`, updateGroupRequest)
    return response
}

/**
 * @param {number} id
 * @returns {Promise<GroupResponse>}
 */
export async function closeGroup(id){
    const response = await httpClient.post(`/groups/${id}/close`)
    return response
}
