import 'reflect-metadata';
import { defineNitroPlugin } from 'nitropack/runtime';
import type { NustHandler } from '../lib/types';
import { controllerToHandlers } from '../lib/utils';
import type {
  ParameterObject,
  PathsObject,
} from 'openapi-typescript';

const convertRouteToOpenAPI = (url: string) => {
  const urlParts = url.split('/');
  const parameters: ParameterObject[] = [];

  const path = urlParts
    .map((part) => {
      if (part.startsWith(':')) {
        const paramName = part.substring(1);
        parameters.push({
          name: paramName,
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        });
        return `{${paramName}}`;
      }
      return part;
    })
    .join('/');

  return {
    path: path,
    parameters,
  };
};

export default defineNitroPlugin((nitro) => {
  // @ts-expect-error
  const controllers = nust_controllers;

  // if(!controllers) return

  let handlers: NustHandler[] = [];
  Object.entries(controllers).forEach(([key, value]) => {
    handlers = [...handlers, ...controllerToHandlers(key, value)];
  });

  const nustPaths: PathsObject = {};
  for (const handler of handlers) {
    const { path, parameters } = convertRouteToOpenAPI(handler.route);
    const method = handler.method.toLowerCase();
    const controller = controllers[handler.controllerKey];

    if (path.startsWith('/post')) {
      const keys = Reflect.getMetadataKeys(
        controller.prototype,
        handler.fn,
      );
      const returnType = Reflect.getMetadata(
        'design:returntype',
        controller,
        handler.fn,
      );
      console.log('returnType', keys, returnType);
    }
    if (!nustPaths[`/api${path}`]) {
      nustPaths[`/api${path}`] = {};
    }
    nustPaths[`/api${path}`][method as any] = {
      tags: [handler.controllerKey],
      parameters: [...parameters],
      responses: {
        200: {
          description: 'OK',
        },
      },
    };
  }

  // Add nust routes to OpenAPI, to support scalar and swagger api docs
  nitro.hooks.hook('beforeResponse', (event, response) => {
    if (event.path !== '/_openapi.json') {
      return;
    }

    (response.body as any).paths = {
      ...((response.body as any)?.paths ?? {}),
      ...nustPaths,
    };
  });
});
