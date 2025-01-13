/**
* Home page view component
* @file HomeView.vue
* @description Main landing page with header and user feed
*/

<template>
  <!-- Main container with dark background -->
  <div class="main-wrapper">
    <!-- Site header component -->
    <TheHeader />
    <!-- Infinite scroll user feed -->
    <UserFeed />
  </div>
</template>

<script setup lang="ts">
/**
 * Import main UI components
 * @component TheHeader - Global header component
 * @component UserFeed - Main content component with infinite scroll
 */
import TheHeader from "@/componens/TheHeader.vue";
import UserFeed from "@/componens/UserFeed/UserFeed.vue";
</script>

<style lang="scss" scoped>
/**
* Uses global background color from variables
* Scoped to avoid style leakage
*/
.main-wrapper {
  background: $bg-main;
}
</style>