/**
 * @fileoverview Helper utility functions for common operations across the application
 * @module utils/helpers
 * @requires navigator.clipboard
 */

/**
 * Copies provided text to the system clipboard
 *
 * @async
 * @function copyToClipboard
 * @param {string} text - The text content to be copied to clipboard
 * @returns {Promise<void>} A promise that resolves when the text has been copied
 * @throws {Error} If clipboard access is denied or clipboard API is not available
 */
export async function copyToClipboard(text: string) {
  return navigator.clipboard.writeText(text);
}
