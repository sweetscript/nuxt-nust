import type {
  SchemaObject,
  ResponseObject,
} from 'openapi-typescript';
import {
  MD_OAPI_CLASS_SCHEMA,
  MD_OAPI_PROPERTIES,
  MD_OAPI_RESPONSES,
} from '../constants';

type ApiSchemaOptions = Pick<
  Partial<SchemaObject>,
  'title' | 'description' | 'required'
>;

interface ApiPropertyOptions
  extends Pick<
    Partial<SchemaObject>,
    | 'type'
    | 'description'
    | 'default'
    | 'allOf'
    | 'anyOf'
    | 'enum'
    | 'deprecated'
    | 'nullable'
    | 'format'
    | 'oneOf'
    | 'xml'
    | 'title'
    | 'discriminator'
  > {
  required?: boolean;
}

interface ApiResponseOptions
  extends Pick<Partial<ResponseObject>, 'description' | 'content'> {
  status: number;
  instance?: any;
}

export function ApiSchema(props: ApiSchemaOptions): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(MD_OAPI_CLASS_SCHEMA, props, target);
  };
}

export function ApiProperty(
  schema?: ApiPropertyOptions,
): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    const existingProperties =
      Reflect.getMetadata(MD_OAPI_PROPERTIES, target) || {};

    existingProperties[propertyKey] = {
      ...schema,
      type: schema?.type || 'string',
    };

    Reflect.defineMetadata(
      MD_OAPI_PROPERTIES,
      existingProperties,
      target,
    );
  };
}

export function ApiResponse(
  responseSchema: ApiResponseOptions,
): MethodDecorator {
  return (
    target: object,
    propertyKey: string | symbol,
    _descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const { status, instance, description, content } = responseSchema;

    const existing =
      Reflect.getMetadata(MD_OAPI_RESPONSES, target, propertyKey) ||
      {};

    existing[`${status}`] = {
      description: description,
      content: content,
      instance: instance,
      //§
    };

    Reflect.defineMetadata(
      MD_OAPI_RESPONSES,
      existing,
      target,
      propertyKey,
    );
  };
}

type SHOptions = Pick<
  ApiResponseOptions,
  'content' | 'instance' | 'description'
>;

// Success shorthand responses decorators
export const ApiOkResponse = (opts: SHOptions) =>
  ApiResponse({ status: 200, description: 'OK', ...opts });

export const ApiCreatedResponse = (opts: SHOptions) =>
  ApiResponse({ status: 201, description: 'Created', ...opts });

export const ApiAcceptedResponse = (opts: SHOptions) =>
  ApiResponse({ status: 202, description: 'Accepted', ...opts });

export const ApiNoContentResponse = (opts: SHOptions) =>
  ApiResponse({ status: 204, description: 'No content', ...opts });

// Redirect shorthand responses decorators
export const ApiMovedPermanentlyResponse = (opts: SHOptions) =>
  ApiResponse({
    status: 301,
    description: 'Moved permanently',
    ...opts,
  });

export const ApiFoundResponse = (opts: SHOptions) =>
  ApiResponse({
    status: 302,
    description: 'Found',
    ...opts,
  });

// Error responses shorthand decorator
export const ApiBadRequestResponse = (opts: SHOptions) =>
  ApiResponse({
    status: 400,
    description: 'Bad request',
    ...opts,
  });

export const ApiUnauthorizedResponse = (opts: SHOptions) =>
  ApiResponse({
    status: 401,
    description: 'Unauthorized',
    ...opts,
  });

export const ApiForbiddenResponse = (opts: SHOptions) =>
  ApiResponse({
    status: 403,
    description: 'Forbidden',
    ...opts,
  });

export const ApiNotFoundResponse = (opts: SHOptions) =>
  ApiResponse({
    status: 404,
    description: 'Not found',
    ...opts,
  });

export const ApiMethodNotAllowedResponse = (opts: SHOptions) =>
  ApiResponse({
    status: 405,
    description: 'Method not allowed',
    ...opts,
  });

export const ApiNotAcceptableResponse = (opts: SHOptions) =>
  ApiResponse({
    status: 406,
    description: 'Not acceptable',
    ...opts,
  });

export const ApiRequestTimeoutResponse = (opts: SHOptions) =>
  ApiResponse({
    status: 408,
    description: 'Request timeout',
    ...opts,
  });

export const ApiConflictResponse = (opts: SHOptions) =>
  ApiResponse({
    status: 409,
    description: 'Conflict',
    ...opts,
  });
