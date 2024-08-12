module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:jsx-a11y/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
        'eslint-config-prettier',
        'prettier',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'react', 'import', 'prettier'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'import/extensions': 'off',
        'import/no-cycle': 'off',
        'no-underscore-dangle': 'off',
        'no-console': 'off',
        'global-require': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'import/order': 'off',
        'no-unneeded-ternary': 'off',
        'no-restricted-exports': 'off',
        'import/prefer-default-export': 'off',
        'no-param-reassign': 'off',
        'react/jsx-sort-props': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'sort-imports': 'off',
        'no-useless-computed-key': 'off',
        'react/prop-types': 'off',
        'no-underscore-dangle': 'off',
        'no-unsafe-optional-chaining': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'spaced-comment': ['warn', 'always', { markers: ['/'] }],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'prefer-destructuring': [
            'warn',
            {
                array: false,
                object: true,
            },
        ],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': 'off',
        'prettier/prettier': [
            'warn',
            {
                arrowParens: 'always',
                semi: true,
                trailingComma: 'es5',
                tabWidth: 4,
                endOfLine: 'auto',
                useTabs: false,
                singleQuote: true,
                printWidth: 120,
                jsxSingleQuote: true,
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': { typescript: {} },
    },
};
