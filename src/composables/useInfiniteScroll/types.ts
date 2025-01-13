/**
 * @fileoverview Type definitions for Infinite Scroll functionality
 * @module types/infiniteScroll
 * @version 1.0.0
 */

/**
 * Options for using infinite scroll.
 */
export interface UseInfiniteScrollOptions {
    /**
     * Function to be called when the scroll reaches the end.
     */
    onLoadMore: () => Promise<void>;

    /**
     * Distance in pixels from the end of the scroll at which loading begins.
     * @default 100
     */
    threshold?: number;

    /**
     * The element to observe (defaults to `window`).
     * @default null
     */
    target?: HTMLElement | null;

    /**
     * Signal to stop loading (e.g., when there is no more data).
     * @default false
     */
    disabled?: boolean;
}