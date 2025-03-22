import 'reflect-metadata';
import { defineNitroPlugin } from 'nitropack/runtime';
import type { NustHandler, RouteParamMetadata } from '../lib/types';
import { controllerToHandlers } from '../lib/utils';
import type {
  OperationObject,
  ParameterObject,
  SchemaObject,
  ComponentsObject,
  PathsObject,
  ResponsesObject,
} from 'openapi-typescript';
import {
  MD_OAPI_CLASS_SCHEMA,
  MD_OAPI_PROPERTIES,
  MD_OAPI_RESPONSES,
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
  components: ComponentsObject;
} => {
  const url = handler.route;
  const urlParts = url.split('/');
  const parameters: ParameterObject[] = [];
  const components: ComponentsObject = {
    schemas: {},
  };

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
  if (bodyClass && bodyClass.name) {
    const schema = convertToOpenApiSchema(bodyClass);
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
    if (components.schemas) {
      components.schemas[bodyClass.name] = schema;
    }
  }

  const openApiResponses = Reflect.getMetadata(
    MD_OAPI_RESPONSES,
    controller.prototype,
    handler.fn,
  );
  if (openApiResponses) {
    operation.responses = openApiResponses;
  }

  return {
    path: path,
    operation,
    components,
  };
};

/*function getOpenApiType(type: any) {
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
}*/

function convertToOpenApiSchema(classType: any): SchemaObject {
  const cls = new classType();
  const properties: any = {};

  const keys = Object.getOwnPropertyNames(cls);

  const openApiClsSchema: Record<string, any> =
    Reflect.getMetadata(MD_OAPI_CLASS_SCHEMA, classType) || {};
  const openApiClsProperties: Record<string, any> =
    Reflect.getMetadata(MD_OAPI_PROPERTIES, classType.prototype) ||
    {};

  const requiredProps: string[] = openApiClsSchema?.required || [];

  keys.forEach((key) => {
    const { required, ...openAPISchema } =
      openApiClsProperties[key] ?? {};
    properties[key] = openApiClsProperties[key]
      ? openAPISchema
      : {
          type: 'string',
        };
    if (required) {
      requiredProps.push(key);
    }
  });

  return {
    type: 'object',
    properties,
    required: requiredProps,
    title: openApiClsSchema?.title || undefined,
    description: openApiClsSchema?.description || undefined,
  };
}

let handlers: NustHandler[] = [];
Object.entries(controllers).forEach(([key, value]) => {
  handlers = [...handlers, ...controllerToHandlers(key, value)];
});

const nustPaths: PathsObject = {};
const nustComponents: ComponentsObject = {
  schemas: {},
};
for (const handler of handlers) {
  const method = handler.method.toLowerCase();

  const { path, operation, components } =
    convertHandlerToOpenAPIOperation(handler);
  if (!nustPaths[`/api${path}`]) {
    nustPaths[`/api${path}`] = {};
  }
  nustPaths[`/api${path}`][method as any] = operation;
  if (components.schemas) {
    nustComponents.schemas = {
      ...nustComponents.schemas,
      ...components.schemas,
    };
  }
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

    (response.body as any).components = {
      ...((response.body as any)?.components ?? {}),
      schemas: {
        ...((response.body as any)?.components?.schemas ?? {}),
        ...nustComponents.schemas,
      },
    };
  });
});
