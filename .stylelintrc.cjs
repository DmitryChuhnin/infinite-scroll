/**
 * @typedef {Object} StylelintConfig
 * @property {string} customSyntax - Custom syntax parser for Stylelint
 * @property {string[]} extends - Base configurations to extend
 * @property {Object} rules - Custom rules configuration
 * @property {string[]} ignoreFiles - Glob patterns for files to ignore
 */

/**
 * Main Stylelint configuration
 * @type {StylelintConfig}
 * @description Configures Stylelint for Vue.js project with SCSS support
 */
module.exports = {
    customSyntax: 'postcss-html',
    extends: [
        'stylelint-config-standard-scss', // Base SCSS rules
        'stylelint-config-standard-vue',  // Vue support
    ],
    rules: {
        "at-rule-no-unknown": [true, {
            "ignoreAtRules": ["use"] // Allow @use directive
        }],
    },
    ignoreFiles: ['public/**/*.css', 'dist/**/*.css']
};
