import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      // React Refresh (Vite HMR safety)
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // --- Popular and Useful Additions ---

      // Prevent unused imports and variables
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-unused-vars': 'off', // disable base rule in favor of TS version

      // Enforce consistent spacing and formatting
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'comma-dangle': ['error', 'only-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'arrow-parens': ['error', 'always'],

      // Consistent return types and explicitness
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Discourage default exports (promote named exports)
      'import/prefer-default-export': 'off',
      'import/no-default-export': 'error',

      // Prevent confusing behavior in equality
      'eqeqeq': ['error', 'always'],

      // Good practice in hooks
      'react-hooks/exhaustive-deps': 'warn',

      // Optional strictness
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  }
)
