import type { SchemaObject } from 'openapi-typescript';
import {
  MD_OAPI_CLASS_SCHEMA,
  MD_OAPI_PROPERTIES,
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
