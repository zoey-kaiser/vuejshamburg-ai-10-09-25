// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],
  runtimeConfig: {
    openaiApiKey: '',
  }
})