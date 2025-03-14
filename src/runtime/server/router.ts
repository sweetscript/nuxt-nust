import 'reflect-metadata';
import { createRouter, defineEventHandler, useBase } from 'h3';
import type { NustHandler } from '../../lib';
import { resolveInjectedArgs } from '../../lib';

// @ts-expect-error
const config = useRuntimeConfig();

const handlers: NustHandler[] | undefined = config.nust?.handlers;

const router = createRouter();

if (handlers) {
  for (const handler of handlers) {
    if (!handler.controllerKey) {
      continue;
    }

    router.add(
      handler.route,
      defineEventHandler(async (event) => {
        const { default: controllers } = await import(
          // @ts-expect-error any
          '~/server/nust/index'
        );

        const Controller = (controllers as any)[
          handler.controllerKey as any
        ];

        if (Controller) {
          return new Controller(...resolveInjectedArgs(Controller))[
            handler.fn
          ](event);
        }
      }),
      handler.method === 'all' ? undefined : (handler.method as any),
    );
    if (config.nust.debug) {
      console.log(
        'Nust route added: ',
        handler.method.toUpperCase(),
        handler.route,
        '->',
        handler.fn,
      );
    }
  }
}

export default useBase('/api', router.handler);
