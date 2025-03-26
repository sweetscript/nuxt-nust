import 'reflect-metadata';
import { defineNitroPlugin } from 'nitropack/runtime';
import type { NustHandler, RouteParamMetadata } from '../lib/types';
import {
  controllerToHandlers,
  convertClassToOpenApiSchema,
} from '../lib/utils';
import type {
  OperationObject,
  ParameterObject,
  ComponentsObject,
  PathsObject,
} from 'openapi-typescript';
import {
  MD_OAPI_RESPONSES,
  METADATA_ROUTE_ARGS,
  RouteParamTypes,
} from '../lib/constants';
// @ts-expect-error
import { nust_controllers } from '#imports';

if (!nust_controllers) {
  console.log('NUST plugin Error: controllers failed to be imported');
}

const controllers = nust_controllers || {};

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
    const schema = convertClassToOpenApiSchema(bodyClass);
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

  const openApiResponses: Record<string, any> = Reflect.getMetadata(
    MD_OAPI_RESPONSES,
    controller.prototype,
    handler.fn,
  );

  if (openApiResponses) {
    Object.entries(openApiResponses).forEach(([key, value]) => {
      const { instance, content, description, ...rest } = value;
      if (!operation.responses) {
        operation.responses = {};
      }

      const instanceSchema = instance
        ? convertClassToOpenApiSchema(instance)
        : undefined;
      operation.responses[key] = {
        description: description ?? instance?.name,
        content: instanceSchema
          ? {
              'application/json': {
                schema: instanceSchema,
              },
            }
          : content,
        ...rest,
      };
    });
  }

  return {
    path: path,
    operation,
    components,
  };
};

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

    const _existingPaths: any = (response.body as any)?.paths ?? {};
    // Remove empty path caused by the custom nust router
    if (_existingPaths['']) {
      delete _existingPaths[''];
    }

    (response.body as any).paths = {
      ..._existingPaths,
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
