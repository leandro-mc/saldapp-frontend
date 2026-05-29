/**
 * @typedef {Object} GroupResponse
 * @property {number} id 
 * @property {string} name 
 * @property {string} description
 * @property {string} startDate     // ISO 8601 format
 * @property {string | null} endDate       // ISO 8601 format or null if ongoing
 */

/**
 * @typedef {Object} CreateGroupRequest
 * @property {string} name
 * @property {string} description
 * @property {string} startDate     // ISO 8601 format
 */

/**
 * @typedef {Object} UpdateGroupRequest
 * @property {string} name
 * @property {string} description
 */
