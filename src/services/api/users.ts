/**
 * @fileoverview Users API implementation with caching and error handling
 * @module usersApi
 * @requires ./types
 * @version 1.0.0
 */

import type { User, UserApiResponse, ApiConfig, FetchUsersParams } from './types';
import { ApiError } from './types';

/**
 * API configuration constants
 * @constant {ApiConfig}
 */
const API_CONFIG: ApiConfig = {
  BASE_URL: 'https://randomuser.me/api',
  USERS_PER_PAGE: 40,
  REQUEST_TIMEOUT: 5000,
  MAX_CACHE_SIZE: 50,
  DEFAULT_INCLUDE_FIELDS: ['name', 'email', 'picture', 'id'],
} as const;

/**
 * Interface for cache operations
 * @interface ResponseCache
 * @property {function} get - Retrieves cached value by key
 * @property {function} set - Sets cache value with key
 * @property {function} has - Checks if key exists in cache
 * @property {function} clear - Clears all cached values
 */
type ResponseCache = {
  get: (key: string) => ReadonlyArray<User> | undefined;
  set: (key: string, value: ReadonlyArray<User>) => void;
  has: (key: string) => boolean;
  clear: () => void;
};

/**
 * Creates a new response cache with LRU eviction
 * @param {number} maxSize - Maximum number of entries in cache
 * @returns {ResponseCache} Cache interface implementation
 */
const createResponseCache = (maxSize: number = API_CONFIG.MAX_CACHE_SIZE): ResponseCache => {
  const cache = new Map<string, ReadonlyArray<User>>();
  const accessOrder: string[] = [];

  /**
   * Restores cache from sessionStorage on initialization
   * @private
   */
  const savedCache = sessionStorage.getItem('userCache');
  if (savedCache) {
    const parsedCache = JSON.parse(savedCache);
    parsedCache.forEach(([key, value]: [string, ReadonlyArray<User>]) => {
      cache.set(key, value);
      accessOrder.push(key);
    });
  }

  /**
   * Updates access order for LRU implementation
   * @param {string} key - Cache key to update
   * @private
   */
  const updateAccessOrder = (key: string): void => {
    const keyIndex = accessOrder.indexOf(key);
    if (keyIndex > -1) {
      accessOrder.splice(keyIndex, 1);
    }
    accessOrder.push(key);
  };

  /**
   * Maintains cache size by removing oldest entries
   * @private
   */
  const maintainSize = (): void => {
    while (cache.size > maxSize) {
      const oldestKey = accessOrder.shift();
      if (oldestKey) {
        cache.delete(oldestKey);
      }
    }
    sessionStorage.setItem('userCache', JSON.stringify([...cache]));
  };

  return {
    get: (key: string): ReadonlyArray<User> | undefined => {
      const value = cache.get(key);
      if (value) updateAccessOrder(key);
      return value;
    },
    set: (key: string, value: ReadonlyArray<User>): void => {
      cache.set(key, value);
      updateAccessOrder(key);
      maintainSize();
    },
    has: (key: string): boolean => cache.has(key),
    clear: (): void => {
      cache.clear();
      accessOrder.length = 0;
      sessionStorage.removeItem('userCache');
    },
  };
};

/**
 * Generates cache key from request parameters
 * @param {FetchUsersParams} params - Request parameters
 * @returns {string} Cache key
 * @private
 */
const generateCacheKey = ({
  page,
  seed,
  results,
  includeFields = API_CONFIG.DEFAULT_INCLUDE_FIELDS,
}: FetchUsersParams): string =>
  `${page}-${results ?? API_CONFIG.USERS_PER_PAGE}-${seed ?? 'noseed'}-${includeFields.join(',')}`;

/**
 * Builds request URL from parameters
 * @param {FetchUsersParams} params - Request parameters
 * @returns {URL} Configured URL instance
 * @private
 */
const buildRequestUrl = ({
  page,
  seed,
  results,
  includeFields = API_CONFIG.DEFAULT_INCLUDE_FIELDS,
}: FetchUsersParams): URL => {
  const url = new URL(API_CONFIG.BASE_URL);
  const params = new URLSearchParams({
    inc: includeFields.join(','),
    page: page.toString(),
    results: (results ?? API_CONFIG.USERS_PER_PAGE).toString(),
  });

  if (seed) {
    params.append('seed', seed);
  }

  url.search = params.toString();
  return url;
};

/**
 * Fetches with timeout capability
 * @param {URL} url - Request URL
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<Response>} Fetch response
 * @throws {ApiError} On timeout or network error
 * @private
 */
const fetchWithTimeout = async (
  url: URL,
  timeout: number = API_CONFIG.REQUEST_TIMEOUT,
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url.toString(), {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

/**
 * Validates API response structure
 * @param {unknown} data - Response data to validate
 * @returns {boolean} True if response is valid
 * @private
 */
const isValidResponse = (data: unknown): data is UserApiResponse => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'results' in data &&
    Array.isArray((data as UserApiResponse).results)
  );
};

// Initialize cache and pending requests tracking
const responseCache = createResponseCache();
const pendingRequests = new Map<string, Promise<ReadonlyArray<User>>>();

/**
 * Users API interface
 * @namespace
 */
export const usersApi = {
  /**
   * Fetches users from the API
   * @async
   * @param {FetchUsersParams} params - Request parameters
   * @returns {Promise<ReadonlyArray<User>>} Array of users
   * @throws {ApiError} On invalid parameters or API errors
   */
  async fetchUsers({
    page,
    seed,
    results = API_CONFIG.USERS_PER_PAGE,
    includeFields = API_CONFIG.DEFAULT_INCLUDE_FIELDS,
  }: FetchUsersParams): Promise<ReadonlyArray<User>> {
    if (page < 1) {
      throw new ApiError(400, 'Page must be greater than 0');
    }

    const cacheKey = generateCacheKey({ page, seed, results, includeFields });
    const cachedData = responseCache.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const pendingRequest = pendingRequests.get(cacheKey);
    if (pendingRequest) {
      return pendingRequest;
    }

    const request = (async () => {
      try {
        const url = buildRequestUrl({ page, seed, results, includeFields });
        const response = await fetchWithTimeout(url);

        if (!response.ok) {
          throw new ApiError(
            response.status,
            `Failed to fetch users: ${response.statusText}`,
            url.toString(),
          );
        }

        const data = await response.json();

        if (!isValidResponse(data)) {
          throw new ApiError(500, 'Invalid response format from API', url.toString());
        }

        responseCache.set(cacheKey, data.results);
        return data.results;
      } catch (error) {
        if (error instanceof ApiError) {
          throw error;
        }
        throw new ApiError(0, error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        pendingRequests.delete(cacheKey);
      }
    })();

    pendingRequests.set(cacheKey, request);
    return request;
  },

  /**
   * Clears the response cache
   */
  clearCache: () => responseCache.clear(),
} as const;
