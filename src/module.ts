import {
  defineNuxtModule,
  createResolver,
  addServerHandler,
  addServerImports,
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
  controllersFile: string;
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
      _nuxt.options.rootDir + '/' + _options.controllersFile;

    _nuxt.hook('nitro:config', (config) => {
      config.esbuild = {
        ...config.esbuild,
        options: {
          ...config.esbuild?.options,
          tsconfigRaw: {
            ...((config.esbuild?.options?.tsconfigRaw ?? {}) as any),
            compilerOptions: {
              ...(((config.esbuild?.options?.tsconfigRaw as any)
                ?.compilerOptions as any) ?? {}),
              experimentalDecorators: true,
              emitDecoratorMetadata: true,
            },
          },
        },
      };

      config.moduleSideEffects = [
        ...(config.moduleSideEffects ?? []),
        'reflect-metadata',
      ];
    });

    if (!_options.controllersFile) {
      if (_options.debug) {
        throw new Error(
          'Nust Error: Please define `nust.controllersFile` property',
        );
      }
      return;
    }

    addServerImports([
      {
        name: 'default',
        as: 'nust_controllers',
        from: resolve(controllersPath),
      },
    ]);

    // try {
    const cls = await import(controllersPath);
    const controllers: NustControllers = cls.default;
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
