// eslint.config.js
import globals from 'globals'
import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier/recommended'

export default [
    {
        ignores: [
            'dist/',
            'node_modules/',
            '.vite/', // Vite's cache directory
        ],
    },

    js.configs.recommended,

    prettierPlugin,

    prettierConfig,

    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },

        rules: {},
    },
]

// default
// import js from '@eslint/js'
// import globals from 'globals'
// import { defineConfig } from 'eslint/config'

// export default defineConfig([
//     {
//         files: ['**/*.{js,mjs,cjs}'],
//         plugins: { js },
//         extends: ['js/recommended'],
//     },
//     {
//         files: ['**/*.{js,mjs,cjs}'],
//         languageOptions: { globals: globals.browser },
//     },
// ])
