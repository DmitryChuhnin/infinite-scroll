/**
* Root application component
* @file App.vue
* @description Core layout component that serves as the application shell
*/

<template>
  <!--
    Main router view component
    Renders the component that matches the current route
    Acts as a dynamic container for route-based content
  -->
  <router-view/>
</template>

<script setup lang="ts">
/**
 * App component setup
 * Using Vue 3 script setup syntax with TypeScript
 * Currently empty as this component only serves as a wrapper
 */
</script>

<style lang="scss">
/**
 * Global application styles
 * Imports main stylesheet from assets
 * @see {@link assets/styles/main.scss}
 */
@use '@/assets/styles/main';
</style>