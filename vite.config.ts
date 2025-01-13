/**
 * @fileoverview Vite configuration file
 * @requires vite
 * @requires @vitejs/plugin-vue
 * @requires path
 */

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

/**
 * Vite configuration object
 * @type {import('vite').UserConfig}
 * @property {import('vite').Plugin[]} plugins - Array of Vite plugins
 * @property {import('vite').ServerOptions} server - Development server configuration
 * @property {import('vite').ResolveOptions} resolve - Module resolution options
 * @property {import('vite').CSSOptions} css - CSS processing options
 */
export default defineConfig({
    plugins: [vue()],
    server: {
        /**
         * Server configuration options
         * @type {import('vite').ServerOptions}
         * @property {number} port - Port to run the development server on
         * @property {boolean} host - Whether to listen on all addresses
         */
        port: 4040,
        host: true
    },
    resolve: {
        /**
         * Module resolution options
         * @type {import('vite').ResolveOptions}
         * @property {Record<string, string>} alias - Map of import aliases
         */
        alias: {
            '@': resolve(__dirname, './src')
        }
    },
    css: {
        /**
         * CSS preprocessing configuration
         * @type {import('vite').CSSOptions}
         * @property {Object} preprocessorOptions - Options for CSS preprocessors
         * @property {Object} preprocessorOptions.scss - SCSS specific options
         * @property {string} preprocessorOptions.scss.additionalData - Global SCSS imports
         */
        preprocessorOptions: {
            scss: {
                additionalData: ['@use "@/assets/styles/variables.scss" as *;'].join(
                    '\n'
                )
            }
        }
    },
})