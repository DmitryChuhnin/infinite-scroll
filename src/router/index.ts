/**
 * @fileoverview Router configuration for the Vue application
 * @module router/index
 * @requires vue-router
 */

import { createRouter, createWebHistory, RouteRecordRaw, Router } from 'vue-router';

/**
 * Application routes configuration
 * @type {RouteRecordRaw[]}
 * @const
 * @property {string} path - Route path
 * @property {Function} component - Lazy-loaded component for the route
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue'),
  },
];

/**
 * Vue Router instance configuration
 * @type {Router}
 * @const
 * @property {History} history - HTML5 History API instance
 * @property {RouteRecordRaw[]} routes - Array of route definitions
 */
const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
