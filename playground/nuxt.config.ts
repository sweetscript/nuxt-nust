export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: '2025-03-10',
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true,
          },
        },
      },
    },
    /*rollupConfig: {
      output: {
        banner: 'import "reflect-metadata";',
      },
    },*/
  },
  nust: {
    debug: true,
  },
});
