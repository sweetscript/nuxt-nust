import 'reflect-metadata';
import { METADATA_ROUTE_ARGS, RouteParamTypes } from '../constants';
import type { RouteParamMetadata } from '../types';
import type { H3Event } from 'h3';

type PipeType = any;

const createRouteParamDecorator =
  (paramType: RouteParamTypes) =>
  (...data: any[]): ParameterDecorator =>
  (target, methodName, index) => {
    const existingArgs: RouteParamMetadata[] =
      Reflect.getMetadata(METADATA_ROUTE_ARGS, target, methodName!) ||
      [];
    existingArgs.push({
      index: index,
      type: paramType,
      data: data,
    });

    Reflect.defineMetadata(
      METADATA_ROUTE_ARGS,
      existingArgs,
      target,
      methodName!,
    );
  };

export function Body(
  dtoClass?: object,
  ...pipes: PipeType[]
): ParameterDecorator {
  return createRouteParamDecorator(RouteParamTypes.BODY)(
    dtoClass,
    ...pipes,
  );
}

export function RawBody(
  property?: string,
  ...pipes: PipeType[]
): ParameterDecorator {
  return createRouteParamDecorator(RouteParamTypes.RAW_BODY)(
    property,
    ...pipes,
  );
}

export function Param(
  property?: string,
  ...pipes: PipeType[]
): ParameterDecorator {
  return createRouteParamDecorator(RouteParamTypes.PARAM)(
    property,
    ...pipes,
  );
}

export function Query(
  property?: string,
  ...pipes: PipeType[]
): ParameterDecorator {
  return createRouteParamDecorator(RouteParamTypes.QUERY)(
    property,
    ...pipes,
  );
}

export function Ip(
  property?: string,
  ...pipes: PipeType[]
): ParameterDecorator {
  return createRouteParamDecorator(RouteParamTypes.IP)(
    property,
    ...pipes,
  );
}

export const createCustomParamDecorator =
  (handler: (event: H3Event) => any): ParameterDecorator =>
  (target, methodName, index) => {
    const existingArgs: RouteParamMetadata[] =
      Reflect.getMetadata(METADATA_ROUTE_ARGS, target, methodName!) ||
      [];
    existingArgs.push({
      index: index,
      type: RouteParamTypes.CUSTOM,
      meta: {
        handler,
      },
    });

    Reflect.defineMetadata(
      METADATA_ROUTE_ARGS,
      existingArgs,
      target,
      methodName!,
    );
  };
