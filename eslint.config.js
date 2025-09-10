import antfu from '@antfu/eslint-config'

const ignores = [
  '.nuxt',
  '**/.nuxt/**',
  '.output',
  '**/.output/**',
  'node_modules',
  '**/node_modules/**',
  'public',
  '**/public/**',
]

export default antfu({
  ignores,
  vue: true,
  jsonc: false,
  yaml: false,
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  rules: {
    'no-console': ['error', {
      allow: ['info', 'warn', 'trace', 'error', 'group', 'groupEnd'],
    }],
    'curly': ['error', 'all'],
    'node/prefer-global/process': 'off',
  },
})
