import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

/**
 * ESLint configuration for Vue 3 + TypeScript project
 * @type {import('eslint').Linter.Config[]}
 * @description Configures linting rules for JavaScript, TypeScript, and Vue files
 */
export default [
    /** Target all JS, TS, and Vue files */
    {files: ["**/*.{js,mjs,cjs,ts,vue}"]},

    /** Include browser globals */
    {languageOptions: {globals: globals.browser}},

    /** Standard JavaScript configurations */
    pluginJs.configs.recommended,

    /** TypeScript configurations */
    ...tseslint.configs.recommended,

    /** Vue essential rules */
    ...pluginVue.configs["flat/essential"],

    /** Configure Vue files to use TypeScript parser */
    {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},

    /**
     * Custom rule configurations
     * @description Specific rules for Vue components and TypeScript
     */
    {
        rules: {
            // Vue component rules
            'vue/no-unused-refs': 'warn',           // Warn about unused refs
            'vue/no-mutating-props': 'warn',        // Warn about prop mutations
            "vue/no-unused-components": "error",    // Error on unused components
            "vue/no-unused-vars": "error",          // Error on unused variables
            "vue/no-async-in-computed-properties": "error", // No async in computed
            "vue/multi-word-component-names": "error", // Require multi-word component names
            "vue/require-default-prop": "error",    // Require default values for props
            "vue/require-explicit-emits": "error"   // Require explicit emits declaration
        }
    },
    {
        ignores: [
            ".*",
            ".config/*",
            "node_modules/*",
            "dist/*",
        ]
    },
];