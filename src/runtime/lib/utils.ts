import 'reflect-metadata';
import type { NustHandler } from './types';
import { getMethodMetadata, getPathMetadata } from './decorators';
import {
  MD_OAPI_CLASS_SCHEMA,
  MD_OAPI_PROPERTIES,
  METADATA_PATH,
} from './constants';
import type { SchemaObject } from 'openapi-typescript';

export function controllerToHandlers(key: string, Controller: any) {
  const handlers: NustHandler[] = [];

  const controllerPrefix = Reflect.getMetadata(
    METADATA_PATH,
    Controller,
  );
  const prefix =
    controllerPrefix && controllerPrefix !== ''
      ? controllerPrefix.startsWith('/')
        ? controllerPrefix
        : `/${controllerPrefix}`
      : '';
  Object.getOwnPropertyNames(Controller.prototype).forEach((fn) => {
    if (fn === 'constructor') {
      return;
    }
    const route = getPathMetadata(Controller.prototype, fn);
    const method = getMethodMetadata(Controller.prototype, fn);
    if (method) {
      const pRoute =
        prefix +
        (route && route !== ''
          ? route.startsWith('/')
            ? route
            : `/${route}`
          : '');
      if (
        handlers.find(
          (i) => i.route === pRoute && i.method === method,
        )
      ) {
        return;
      }
      handlers.push({
        route: pRoute,
        method,
        fn,
        controllerKey: key,
      });
    }
  });
  return handlers;
}

// Function to filter out properties not defined in the class
export function cleanPlainObject<T = any>(
  plainObj: Partial<T>,
  classRef: new () => T,
): Partial<T> {
  const instance = new classRef();
  // const keys = Object.getOwnPropertyNames(classRef.prototype)
  const keys = Object.keys(instance as never) as Array<keyof T>;
  return Object.keys(plainObj)
    .filter((key) => keys.includes(key as keyof T))
    .reduce((obj, key) => {
      // @ts-expect-error
      obj[key] = plainObj[key];
      return obj;
    }, {} as Partial<T>);
}

export function convertClassToOpenApiSchema(
  classType: any,
): SchemaObject {
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
