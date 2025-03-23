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

    // _nuxt.options.build.transpile.push('nuxt-nuxt');

    const controllersFile = _options.controllersFile?.startsWith('~/')
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

    addServerPlugin(resolve('./runtime/server/plugin'));

    addServerImports([
      {
        name: 'default',
        as: 'nust_controllers',
        from: resolve(controllersPath),
      },
    ]);

    addServerHandler({
      meta: {
        openAPI: {
          summary: 'Nust router',
          description: 'Nust router',
        },
      },
      handler: resolve('./runtime/server/router'),
    });
  },
});
