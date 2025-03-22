import type {
  SchemaObject,
  ResponseObject,
  ResponsesObject,
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
  extends Pick<ResponseObject, 'description' | 'content'> {
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
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const { status, instance, description, content } = responseSchema;

    /*const existing: Record<string, ResponsesObject> =
      Reflect.getMetadata(MD_OAPI_RESPONSES, target) || {};

    existing[propertyKey.toString()] =
      existing[propertyKey.toString()] || {};
    existing[propertyKey.toString()][`${status}`] = {
      description: description,
      content: content,
      //
    };

    Reflect.defineMetadata(MD_OAPI_RESPONSES, existing, target);*/
    const existing: ResponsesObject =
      Reflect.getMetadata(MD_OAPI_RESPONSES, target, propertyKey) ||
      {};

    existing[`${status}`] = {
      description: description,
      content: content,
      //
    };

    Reflect.defineMetadata(
      MD_OAPI_RESPONSES,
      existing,
      target,
      propertyKey,
    );
  };
}
