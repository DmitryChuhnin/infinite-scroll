<template>
  <div class="user-feed">
    <div v-if="isLoading && !users.length" class="user-feed__loading">
      Loading initial users...
    </div>

    <div class="user-feed__list">
      <UserCard
          v-for="(user, index) in users"
          :key="`${user.id.value}-${user.email}-${user.name.first}-${user.name.last}`"
          :user="user"
          :style="{
            transform: isEvenColumn(index) ? 'translateY(3rem)' : 'none'
          }"
          class="user-feed__item"
      />

      <!-- Элемент-триггер для IntersectionObserver -->
      <div
          ref="observerTarget"
          class="user-feed__observer"
      >
        <p v-if="isLoading" class="user-feed__loading-more">
          {{ loadingText }}
        </p>
      </div>
    </div>

    <div v-if="error" class="user-feed__error">
      {{ error }}
    </div>
  </div>
</template>
<script setup lang="ts">
/**
 * @fileoverview UserFeed component with infinite scroll and masonry-like layout
 * @component UserFeed
 */

import { ref, computed, onUnmounted, onMounted } from 'vue';
import type { User } from '@/services/api/types';
import { usersApi } from '@/services/api/users';
import { useInfiniteScroll } from '@/composables/useInfiniteScroll';
import UserCard from '../UserCard/UserCard.vue';

/**
 * @typedef {Object} ComponentRefs
 * @property {HTMLElement} userFeedList - Reference to the feed container
 * @property {HTMLElement} observerTarget - Reference to the infinite scroll trigger element
 */

/**
 * @typedef {Object} UserFeedState
 * @property {User[]} users - Array of loaded user objects
 * @property {string|null} error - Error message if loading fails
 * @property {number} currentPage - Current page number for pagination
 * @property {boolean} hasMoreUsers - Flag indicating if more users can be loaded
 * @property {number} columnsCount - Number of columns in the grid layout
 */

// Component state variables
/** @type {import('vue').Ref<User[]>} */
const users = ref<User[]>([]);
/** @type {import('vue').Ref<string|null>} */
const error = ref<string | null>(null);
/** @type {import('vue').Ref<number>} */
const currentPage = ref(1);
/** @type {import('vue').Ref<boolean>} */
const hasMoreUsers = ref(true);
/** @type {import('vue').Ref<number>} */
const columnsCount = ref(1);

/**
 * Determines if item should be elevated in masonry layout
 * @param {number} index - Item index in the grid
 * @returns {boolean} True if column is even
 */
const isEvenColumn = (index: number): boolean => {
  const columnPosition = (index % columnsCount.value) + 1;
  return columnPosition % 2 === 0;
};

/**
 * Calculates number of columns based on container width
 * Uses ResizeObserver for reliable width measurements
 */
const calculateColumns = (): void => {
  const container = document.querySelector('.user-feed__list');
  if (!container) return;

  // Use ResizeObserver for accurate width measurements
  const resizeObserver = new ResizeObserver(entries => {
    const containerWidth = entries[0].contentRect.width;
    const cardWidth = 260; // Card width in pixels
    const gap = 16; // Grid gap in pixels
    columnsCount.value = Math.floor((containerWidth + gap) / (cardWidth + gap));
  });

  resizeObserver.observe(container);
};

/**
 * Loads next page of users
 * @async
 * @throws {Error} When API request fails
 */
const loadMoreUsers = async (): Promise<void> => {
  try {
    error.value = null;
    const newUsers = await usersApi.fetchUsers({
      page: currentPage.value,
      seed: 'abc'
    });

    if (newUsers.length === 0) {
      hasMoreUsers.value = false;
      return;
    }

    users.value = [...users.value, ...newUsers];
    currentPage.value++;
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load users';
  }
};

/**
 * Infinite scroll implementation
 * @type {import('@/composables/useInfiniteScroll').UseInfiniteScrollReturn}
 */
const { isLoading, observerTarget } = useInfiniteScroll({
  onLoadMore: loadMoreUsers,
  disabled: !hasMoreUsers.value || !!error.value,
  threshold: 250,
});

/**
 * Computed loading status text
 * @type {import('vue').ComputedRef<string>}
 */
const loadingText = computed((): string => {
  return hasMoreUsers.value ? 'Loading more users...' : 'No more users to load';
});

// Lifecycle hooks
onMounted(() => {
  calculateColumns();
});

onUnmounted(() => {
  users.value = [];
  error.value = null;
  currentPage.value = 1;
  hasMoreUsers.value = true;
  usersApi.clearCache();
});
</script>
<style scoped lang="scss">
.user-feed {
  margin: 0 auto;
  padding: 1rem;

  &__error {
    color: #dc3545;
    text-align: center;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  &__loading {
    text-align: center;
    padding: 1rem;
  }

  &__list {
    width: 100%;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, 260px);
    justify-content: center;
  }

  &__item {
    transition: transform 0.3s ease; // Добавим плавность при изменении
  }

  &__observer {
    min-height: 60px;
    grid-column: 1 / -1;
  }
}
</style>