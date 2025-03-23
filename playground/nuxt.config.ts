export default defineNuxtConfig({
  modules: ['nuxt-nust', '@scalar/nuxt'],
  devtools: { enabled: true },
  compatibilityDate: '2025-03-10',
  nust: {
    controllersFile: '~/server/nust/index.ts',
    debug: true,
  },

  nitro: {
    experimental: {
      openAPI: true,
    },
  },

  scalar: {
    darkMode: true,
    forceDarkModeState: 'dark',
  },
});
