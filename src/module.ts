import {
  defineNuxtModule,
  createResolver,
  addPlugin,
  addServerHandler,
} from '@nuxt/kit';
import {
  type NustHandler,
  controllerToHandlers,
  type NustControllers,
} from './lib';

declare module '@nuxt/schema' {
  interface RuntimeConfig {
    nust: {
      debug?: boolean;
      handlers?: NustHandler[];
    };
  }
}

// Module options TypeScript interface definition
export interface ModuleOptions {
  debug?: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nust-module',
    configKey: 'nust',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    debug: false,
  },
  async setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url);

    // // // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    // addPlugin(resolve('./runtime/plugin'))

    const controllersPath =
      _nuxt.options.rootDir + '/server/nust/index.ts';

    _nuxt.hook('nitro:config', (config) => {
      //TODO: add
      // esbuild: {
      //   options: {
      //     target: 'esnext'
      //   }
      // },
      config.moduleSideEffects = [
        ...(config.moduleSideEffects ?? []),
        'reflect-metadata',
      ];
    });

    let controllers: NustControllers;
    // try {
    const cls = await import(controllersPath);
    controllers = cls.default;
    // }
    // catch (err: any) {
    //   throw new Error('Failed to import Nust controllers. Please make sure you created the ./server/nust/index.ts file')
    // }

    if (controllers) {
      let handlers: NustHandler[] = [];
      Object.entries(controllers).forEach(([key, value]) => {
        handlers = [...handlers, ...controllerToHandlers(key, value)];
      });
      _nuxt.options.runtimeConfig.nust = {
        debug: _options.debug,
        handlers,
      };
    }

    addServerHandler({
      handler: resolve('./runtime/server/router'),
    });
  },
});
