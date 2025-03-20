import 'reflect-metadata';
import { defineNitroPlugin } from 'nitropack/runtime';
import type { NustHandler, RouteParamMetadata } from '../lib/types';
import { controllerToHandlers } from '../lib/utils';
import type {
  OperationObject,
  ParameterObject,
  PathsObject,
} from 'openapi-typescript';
import {
  METADATA_ROUTE_ARGS,
  RouteParamTypes,
} from '../lib/constants';

// @ts-expect-error
const controllers = nust_controllers;

const convertHandlerToOpenAPIOperation = (
  handler: NustHandler,
): {
  path: string;
  operation: OperationObject;
} => {
  const url = handler.route;
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

  const operation = {
    tags: [handler.controllerKey],
    parameters: [...parameters],

    responses: {
      200: {
        description: 'OK',
      },
    },
  } as OperationObject;

  const controller = controllers[handler.controllerKey];
  const routeArgs: RouteParamMetadata[] | undefined =
    Reflect.getMetadata(
      METADATA_ROUTE_ARGS,
      controller.prototype,
      handler.fn,
    );

  const bodyArg = routeArgs?.find(
    (a) => a.type == RouteParamTypes.BODY,
  );

  const bodyClass = bodyArg?.data?.[0];
  if (bodyClass) {
    // const schema = convertToOpenApiSchema(bodyClass);
    // console.log('schema', schema);
    operation.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: `#/components/schemas/${bodyClass?.name}`,
          },
        },
      },
    };
  }

  return {
    path: path,
    operation,
  };
};

function getOpenApiType(type: any) {
  switch (type) {
    case String:
      return { type: 'string' };
    case Number:
      return { type: 'number' }; // use 'integer' if you specifically want integers
    case Boolean:
      return { type: 'boolean' };
    case Array:
      return { type: 'array' };
    default:
      return { $ref: `#/components/schemas/${type?.name}` }; // Handle custom types
  }
}
function convertToOpenApiSchema(classType: any) {
  const cls = new classType();
  const properties: any = {};
  // const keys = Object.getOwnPropertyNames(classType.prototype);
  const keys = Object.getOwnPropertyNames(cls);

  keys.forEach((key) => {
    const type = Reflect.getMetadata(
      'design:type',
      classType.prototype,
      key,
    );
    console.log(
      `Reflect.getMetadata ${key}`,
      Reflect.getMetadataKeys(classType, key),
    );
    if (type) {
      properties[key] = getOpenApiType(type);
    }
  });

  return {
    type: 'object',
    properties,
  };
}

// if(!controllers) return

let handlers: NustHandler[] = [];
Object.entries(controllers).forEach(([key, value]) => {
  handlers = [...handlers, ...controllerToHandlers(key, value)];
});

const nustPaths: PathsObject = {};
for (const handler of handlers) {
  const method = handler.method.toLowerCase();

  const { path, operation } =
    convertHandlerToOpenAPIOperation(handler);
  if (!nustPaths[`/api${path}`]) {
    nustPaths[`/api${path}`] = {};
  }
  nustPaths[`/api${path}`][method as any] = operation;
}

export default defineNitroPlugin((nitro) => {
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
