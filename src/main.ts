/**
 * Main application entry point
 * @module main
 * @description Initializes Vue application with Pinia store and Vue Router
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

/**
 * Create Pinia store instance
 * @constant {Pinia}
 */
const pinia = createPinia()

/**
 * Create and configure Vue application instance
 * @constant {App}
 * @description
 * 1. Creates Vue app from root component
 * 2. Installs Vue Router for navigation
 * 3. Installs Pinia for state management
 */
const app = createApp(App).use(router).use(pinia)

/**
 * Mount application to DOM
 * @description Mounts the Vue application to the #app element in index.html
 */
app.mount('#app')