import 'reflect-metadata';
import {
  defineNuxtModule,
  createResolver,
  addServerHandler,
  addServerImports,
  addServerPlugin,
} from '@nuxt/kit';

declare module '@nuxt/schema' {
  interface RuntimeConfig {
    nust: {
      debug?: boolean;
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
    // addPlugin(resolve('./runtime/plugin'));
    // addServerPlugin(resolve('./runtime/server/plugin'));

    const controllersFile = _options.controllersFile.startsWith('~/')
      ? _options.controllersFile.substring(2)
      : _options.controllersFile;
    const controllersPath =
      _nuxt.options.rootDir + '/' + controllersFile;

    _nuxt.hook('nitro:build:before', (ctx) => {
      ctx.options.moduleSideEffects.push('reflect-metadata');
    });
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

    _nuxt.options.runtimeConfig.nust = {
      debug: _options.debug,
    };

    // const { default: controllers } = await import(
    //   _options.controllersFile
    // );
    // console.log('controllers', controllers);
    //
    // const type = Reflect.getMetadata(
    //   'design:type',
    //   controllers.cat.prototype,
    //   'findOne',
    // );
    // console.log('reflect', type);
    // console.log(Object.keys(type));

    addServerPlugin(resolve('./runtime/server/plugin'));

    addServerImports([
      {
        name: 'default',
        as: 'nust_controllers',
        from: resolve(controllersPath),
      },
    ]);

    addServerHandler({
      handler: resolve('./runtime/server/router'),
    });
  },
});
