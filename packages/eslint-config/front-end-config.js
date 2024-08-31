const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** This is a custom Eslint configuration for use with typescript packages */

module.exports = {
  extends: [
    'next/core-web-vitals',
    'turbo',
    'plugin:prettier/recommended',
    require.resolve('@vercel/style-guide/eslint/next'),
  ],
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    'import/resolver': { typescript: { project } },
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  overrides: [
    /** Overwrite configuration for typescript files */
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: [
        '@typescript-eslint',
        // 'unused-imports'
      ],
      extends: ['next/core-web-vitals'],
      parserOptions: {
        project,
      },
      rules: {
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
            tabWidth: 2,
            singleQuote: true,
            trailingComma: 'es5',
            semi: true,
            printWidth: 120,
          },
        ],
        'react/destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
        'jsx-a11y/anchor-is-valid': 'off', // Next.js use his own internal link system
        'react/require-default-props': 'off', // Allow non-defined react props as undefined
        'react/jsx-props-no-spreading': 'off', // _app.tsx uses spread operator and also, react-hook-form
        'react-hooks/exhaustive-deps': 'warn', // Incorrectly report needed dependency with Next.js router
        '@next/next/no-img-element': 'off', // We currently not using next/image because it isn't supported with SSG mode
        '@typescript-eslint/comma-dangle': 'off', // Avoid conflict rule between Eslint and Prettier
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
            disallowTypeAnnotations: true,
            fixStyle: 'inline-type-imports',
          },
        ], // Ensure `import type` is used when it's necessary

        'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
        '@typescript-eslint/no-unused-vars': 'off',
        'no-underscore-dangle': 'off',
        'no-console': 'off',
        'import/no-cycle': 'off',
        'no-restricted-exports': ['off', { restrictedNamedExports: ['default'] }],
        'new-cap': ['off', { newIsCap: true }],
        'no-plusplus': 'off',
        '@typescript-eslint/naming-convention': [
          'warn',
          {
            selector: 'variable',
            types: ['boolean'],
            format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
            leadingUnderscore: 'allowSingleOrDouble',
          },
        ],
        'no-return-assign': 'off',
        'react/display-name': 'off',
        'no-param-reassign': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@next/next/no-html-link-for-pages': 'off',
        'no-html-link-for-pages': 'off',
        indent: 'off',
        '@typescript-eslint/indent': 'off',
        'jsx-a11y/alt-text': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
