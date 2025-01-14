/**
 * @fileoverview Vue composable for implementing infinite scroll functionality
 * @module composables/useInfiniteScroll
 * @version 1.0.0
 */

import { ref, onMounted, onUnmounted } from 'vue';
import { UseInfiniteScrollOptions } from './types';

/**
 * Hook for implementing infinite scroll.
 * @param {UseInfiniteScrollOptions} options - Options for configuring infinite scroll.
 * @returns {{ isLoading: import('vue').Ref<boolean>, observerTarget: import('vue').Ref<HTMLDivElement | null> }} - An object containing the loading state and the target element to observe.
 */
export function useInfiniteScroll({
  onLoadMore,
  threshold = 100,
  target = null,
  disabled = false,
}: UseInfiniteScrollOptions) {
  /** Reactive boolean indicating whether data is currently being loaded. */
  const isLoading = ref(false);

  /** IntersectionObserver instance for observing the target element. */
  let observer: IntersectionObserver | null = null;

  /** Reactive reference to the DOM element that triggers the infinite scroll. */
  const observerTarget = ref<HTMLDivElement | null>(null);

  /**
   * Intersection handler for IntersectionObserver.
   * @param {IntersectionObserverEntry[]} entries - Array of IntersectionObserver entries.
   */
  const handleIntersect: IntersectionObserverCallback = async (entries) => {
    const entry = entries[0];

    if (entry.isIntersecting && !isLoading.value && !disabled) {
      try {
        isLoading.value = true;
        await onLoadMore();
      } finally {
        isLoading.value = false;
      }
    }
  };

  onMounted(() => {
    // Create observer only if the DOM element exists
    if (observerTarget.value) {
      observer = new IntersectionObserver(handleIntersect, {
        root: target,
        rootMargin: `${threshold}px`,
        threshold: 0,
      });

      observer.observe(observerTarget.value);
    }
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  });

  return {
    isLoading,
    observerTarget,
  };
}
