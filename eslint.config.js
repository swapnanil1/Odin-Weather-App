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
