/**
 * @typedef {Object} ExpenseResponse
 * @property {number} id 
 * @property {number} groupId
 * @property {number} payedBy 
 * @property {string} description
 * @property {number} amount
 * @property {string} date     // ISO 8601 format
 */

/**
 * @typedef {Object} CreateExpenseRequest
 * @property {number} payedBy 
 * @property {string} description
 * @property {number} amount
 * @property {string} date     // ISO 8601 format
 */

/**
 * @typedef {Object} UpdateExpenseRequest
 * @property {number} payedBy 
 * @property {string} description
 * @property {number} amount
 */
