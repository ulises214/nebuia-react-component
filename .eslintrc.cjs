module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:jsx-a11y/recommended',
    'eslint-config-codely/typescript',
  ],
  plugins: ['react', 'react-hooks', 'tailwindcss', 'react-refresh'],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'postcss.config.cjs',
    'tailwind.config.js',
    'rollup.config.js',
    'face-basic.js',
    'face-simd.js',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-non-null-assertion': 'error',
    'tailwindcss/classnames-order': 'off',
    'tailwindcss/no-custom-classname': 'error',
    'tailwindcss/no-contradicting-classname': 'error',
    'import/no-unresolved': 'error',
    'prettier/prettier': [
      'error',
      {
        usePrettierrc: 'true',
      },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // ext library & side effect imports
          ['^@?\\w', '^\\u0000'],
          // {s}css files
          ['^.+\\.s?css$'],
          ['^@/types'],
          // other that didnt fit in
          ['^'],
        ],
      },
    ],
  },
};
