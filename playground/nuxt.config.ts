export default defineNuxtConfig({
  modules: ['../src/module'],
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
});
