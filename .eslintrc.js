module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // Add your custom rules here
  rules: {
    'vue/no-v-html': 'off',
    'vue/script-setup-uses-vars': 'off',
    'no-console': 'off',
    'vue/no-v-for-template-key-on-child': 'off',
  },
}
