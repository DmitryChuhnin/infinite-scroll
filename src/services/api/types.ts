/**
 * @fileoverview Type definitions for Users API
 * @module types
 * @version 1.0.0
 */

/**
 * Available fields that can be requested from the API
 * @typedef {('name'|'email'|'picture'|'id')} IncludeFields
 */
export type IncludeFields = 'name' | 'email' | 'picture' | 'id';

/**
 * User name information
 * @typedef {Object} UserName
 * @property {string} first - User's first name
 * @property {string} last - User's last name
 * @readonly
 */
type UserName = {
    readonly first: string;
    readonly last: string;
};

/**
 * User picture URLs in different sizes
 * @typedef {Object} UserPicture
 * @property {string} large - Large size picture URL
 * @property {string} medium - Medium size picture URL
 * @property {string} thumbnail - Thumbnail size picture URL
 * @readonly
 */
type UserPicture = {
    readonly large: string;
    readonly medium: string;
    readonly thumbnail: string;
};

/**
 * User identifier information
 * @typedef {Object} UserId
 * @property {string|null} name - ID type name (e.g., "SSN")
 * @property {string|null} value - ID value
 * @readonly
 */
type UserId = {
    readonly name: string | null;
    readonly value: string | null;
};

/**
 * Complete user entity from the API
 * @interface User
 * @property {string} email - User's email address
 * @property {UserName} name - User's name information
 * @property {UserPicture} picture - User's picture URLs
 * @property {UserId} id - User's identifier information
 * @readonly
 */
export interface User {
    readonly email: string;
    readonly name: UserName;
    readonly picture: UserPicture;
    readonly id: UserId;
}

/**
 * API response metadata
 * @typedef {Object} ApiResponseInfo
 * @property {string} seed - Random seed used for data generation
 * @property {number} results - Number of results in the response
 * @property {number} page - Current page number
 * @property {string} [version] - Optional API version information
 * @readonly
 */
type ApiResponseInfo = {
    readonly seed: string;
    readonly results: number;
    readonly page: number;
    readonly version?: string;
};

/**
 * Complete API response structure
 * @interface UserApiResponse
 * @property {readonly User[]} results - Array of user objects
 * @property {ApiResponseInfo} info - Response metadata
 * @readonly
 */
export interface UserApiResponse {
    readonly results: readonly User[];
    readonly info: ApiResponseInfo;
}

/**
 * Parameters for fetching users
 * @interface FetchUsersParams
 * @property {number} page - Current page number (1-based)
 * @property {string} [seed] - Optional seed for consistent random results
 * @property {number} [results] - Optional number of users per page
 * @property {readonly IncludeFields[]} [includeFields] - Optional fields to include in response
 * @readonly
 */
export interface FetchUsersParams {
    /** Current page number (1-based) */
    readonly page: number;
    /** Seed for consistent random results */
    readonly seed?: string;
    /** Number of users per page */
    readonly results?: number;
    /** Fields to include in the response */
    readonly includeFields?: readonly IncludeFields[];
}

/**
 * API configuration
 * @typedef {Object} ApiConfig
 * @property {string} BASE_URL - Base URL for the API
 * @property {number} USERS_PER_PAGE - Default number of users per page
 * @property {number} MAX_CACHE_SIZE - Maximum number of cached responses
 * @property {number} REQUEST_TIMEOUT - Request timeout in milliseconds
 * @property {readonly IncludeFields[]} DEFAULT_INCLUDE_FIELDS - Default fields to include
 * @readonly
 */
export type ApiConfig = {
    readonly BASE_URL: string;
    readonly USERS_PER_PAGE: number;
    readonly MAX_CACHE_SIZE: number;
    readonly REQUEST_TIMEOUT: number;
    readonly DEFAULT_INCLUDE_FIELDS: readonly IncludeFields[];
};

/**
 * Custom error class for API-related errors
 * @class ApiError
 * @extends Error
 * @property {number} status - HTTP status code or 0 for network errors
 * @property {string} message - Error message
 * @property {string} [endpoint] - Optional API endpoint where error occurred
 * @property {number} timestamp - Unix timestamp of when error occurred
 */
export class ApiError extends Error {
    constructor(
        public readonly status: number,
        message: string,
        public readonly endpoint?: string,
        public readonly timestamp: number = Date.now()
    ) {
        super(message);
        this.name = 'ApiError';
    }
}