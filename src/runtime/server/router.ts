import 'reflect-metadata';
import { createRouter, defineEventHandler, useBase } from 'h3';
import type { NustHandler } from '../lib';
import { controllerToHandlers, resolveInjectedArgs } from '../lib';

// Controllers auto imported by module
// @ts-expect-error
const controllers = nust_controllers;
// @ts-expect-error
const config = useRuntimeConfig();

let handlers: NustHandler[] = [];
Object.entries(controllers).forEach(([key, value]) => {
  handlers = [...handlers, ...controllerToHandlers(key, value)];
});

const router = createRouter();

if (handlers) {
  for (const handler of handlers) {
    if (!handler.controllerKey) {
      continue;
    }

    router.add(
      handler.route,
      defineEventHandler(async (event) => {
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
    if (config.nust?.debug) {
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
