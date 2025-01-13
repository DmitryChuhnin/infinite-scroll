/**
 * ESLint Configuration for Vue 3 + TypeScript project
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    /**
     * Primary parser for Vue single-file components
     */
    parser: 'vue-eslint-parser',

    /**
     * Parser options configuration
     * @property {Object} parser - Language-specific parsers
     * @property {string} parser.ts - TypeScript parser
     * @property {string} parser.<template> - Template parser for Vue
     */
    parserOptions: {
        parser: {
            ts: '@typescript-eslint/parser',
            '<template>': 'espree'
        }
    },

    /**
     * Environment configuration
     * @property {boolean} jest - Enable Jest testing environment
     */
    env: {
        jest: true
    },

    /**
     * ESLint plugins
     * @property {string[]} plugins - List of plugins to use
     */
    plugins: ['@typescript-eslint'],

    /**
     * Extended configurations
     * Order matters: later configurations override earlier ones
     */
    extends: [
        'eslint:recommended',                           // Base ESLint rules
        'plugin:@typescript-eslint/eslint-recommended', // TypeScript specific recommended rules
        'plugin:@typescript-eslint/recommended',        // Additional TypeScript rules
        'plugin:vue/vue3-recommended',                  // Vue 3 recommended rules
        'prettier'                                      // Prettier compatibility
    ],

    /**
     * Custom rule configurations
     * Specific rules for Vue components and TypeScript
     */
    rules: {
        // Warning level rules
        'vue/no-unused-refs': 'warn',           // Warns about unused template refs
        'vue/no-mutating-props': 'warn',        // Warns about prop mutations

        // Error level rules
        "vue/no-unused-components": "error",    // Prevents unused components
        "vue/no-unused-vars": "error",          // Prevents unused variables
        "vue/no-async-in-computed-properties": "error", // Prevents async computed properties
        "vue/multi-word-component-names": "error",      // Enforces multi-word component names
        "vue/require-default-prop": "error",    // Requires default values for props
        "vue/require-explicit-emits": "error"   // Requires explicit emits declaration
    }
}