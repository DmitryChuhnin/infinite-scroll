# Users API Documentation

## Overview

The Users API module provides functionality to fetch user data from the RandomUser.me API with advanced caching capabilities and error handling. This documentation covers the implementation details, usage guidelines, and architecture decisions.

## Table of Contents

1. [Architecture](#architecture)
2. [Features](#features)
3. [API Reference](#api-reference)
4. [Cache Implementation](#cache-implementation)
5. [Error Handling](#error-handling)
6. [Configuration](#configuration)
7. [Types](#types)

## Architecture

The API implementation follows these key architectural principles:

- **Immutability**: All data structures are readonly to prevent unintended mutations
- **Caching**: LRU (Least Recently Used) cache with persistence in sessionStorage
- **Request Deduplication**: Prevents duplicate in-flight requests
- **Type Safety**: Comprehensive TypeScript types with strict null checks
- **Error Boundaries**: Custom error types with detailed context

## Features

### Core Features

- Paginated user data fetching
- Configurable field selection
- Consistent random data via seed parameter
- Response caching with LRU eviction
- Request timeout handling
- Request deduplication
- Persistent cache in sessionStorage

### Cache Features

- Maximum size limit with LRU eviction
- Session persistence
- Cache key generation based on request parameters
- Cache invalidation API

### Error Handling Features

- Custom ApiError class with context
- Network timeout handling
- Response validation
- HTTP status handling
- Detailed error messages

## API Reference

### usersApi.fetchUsers

Fetches users from the API with caching and deduplication.

```typescript
async function fetchUsers(params: FetchUsersParams): Promise<ReadonlyArray<User>>
```

Parameters:
- `page`: Page number (1-based)
- `seed?`: Optional seed for consistent random results
- `results?`: Optional number of results per page
- `includeFields?`: Optional fields to include in response

Returns:
- Promise resolving to an array of User objects

Throws:
- `ApiError`: On network errors, invalid responses, or timeouts

### usersApi.clearCache

Clears the response cache and session storage.

```typescript
function clearCache(): void
```

## Cache Implementation

The cache implementation uses an LRU (Least Recently Used) strategy with these characteristics:

1. Size-based eviction
2. Access-based ordering
3. Session persistence
4. Atomic operations

Cache keys are generated using:
- Page number
- Results per page
- Seed value
- Included fields

## Error Handling

Errors are handled through the custom `ApiError` class which provides:

- HTTP status code
- Error message
- Endpoint URL (when available)
- Timestamp

Common error scenarios:
1. Network timeouts
2. Invalid API responses
3. HTTP error status codes
4. Invalid parameters

## Configuration

The API is configured through the `API_CONFIG` constant:

```typescript
const API_CONFIG = {
    BASE_URL: 'https://randomuser.me/api',
    USERS_PER_PAGE: 40,
    REQUEST_TIMEOUT: 5000,
    MAX_CACHE_SIZE: 50,
    DEFAULT_INCLUDE_FIELDS: ['name', 'email', 'picture', 'id']
} as const;
```

## Types

See the [Types Documentation](./types.md) for detailed type information.