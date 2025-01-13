# Infinite Scroll Composable

The `useInfiniteScroll` composable is a Vue hook designed to simplify the implementation of infinite scroll functionality. It uses the Intersection Observer API to detect when the user has scrolled near the end of a container and triggers a callback to load more data.

## Table of Contents

1. [Overview](#overview)
2. [Usage](#usage)
3. [Options](#options)
4. [Return Values](#return-values)
5. [Example](#example)

## Overview

The composable provides a simple way to implement infinite scroll by observing a target element and triggering a callback when the user scrolls near the end of the container. It is highly configurable and supports custom thresholds, target elements, and loading states.

## Usage

### Importing the Composable

```typescript
import { useInfiniteScroll } from './useInfiniteScroll';
```

### Basic Example

```vue
<template>
  <div>
    <div v-for="item in items" :key="item.id">{{ item.name }}</div>
    <div ref="observerTarget"></div>
    <div v-if="isLoading">Loading...</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useInfiniteScroll } from './useInfiniteScroll';

const items = ref([]);
const loadMore = async () => {
  // Fetch more data and append to `items`
};

const { isLoading, observerTarget } = useInfiniteScroll({
  onLoadMore: loadMore,
  threshold: 100,
});
</script>
```

## Options

The `useInfiniteScroll` function accepts the following options:

- **`onLoadMore`** (`() => Promise<void>`): A function that is called when the user scrolls near the end of the container. This function should handle loading more data.
- **`threshold`** (`number`, default: `100`): The distance in pixels from the end of the container at which the `onLoadMore` function is triggered.
- **`target`** (`HTMLElement | null`, default: `null`): The container element to observe. If `null`, the `window` is used.
- **`disabled`** (`boolean`, default: `false`): A flag to disable the infinite scroll behavior (e.g., when no more data is available).

## Return Values

The composable returns an object with the following properties:

- **`isLoading`** (`Ref<boolean>`): A reactive boolean indicating whether the `onLoadMore` function is currently executing.
- **`observerTarget`** (`Ref<HTMLDivElement | null>`): A reactive reference to the DOM element that triggers the infinite scroll. Place this element at the end of your list.

## Example

```typescript
const { isLoading, observerTarget } = useInfiniteScroll({
  onLoadMore: async () => {
    const newData = await fetchMoreData();
    items.value.push(...newData);
  },
  threshold: 200,
  disabled: items.value.length >= totalItems,
});
```

## Notes

- Ensure that the `observerTarget` element is placed correctly in your template to trigger the infinite scroll.
- The `onLoadMore` function should handle errors internally to avoid breaking the scroll behavior.
- Use the `disabled` option to stop loading when no more data is available.