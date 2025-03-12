import 'reflect-metadata';
import {
  METADATA_ROUTE_ARGS,
  RouteParamTypes,
} from '../constants';
import type { RouteParamMetadata, Type } from '../types';

type PipeType = any; //Type<PipeTransform> | PipeTransform)

const createRouteParamDecorator =
  (paramType: RouteParamTypes) =>
  (...data: any[]): ParameterDecorator =>
  (target, methodName, index) => {
    const existingArgs: RouteParamMetadata[] =
      Reflect.getMetadata(
        METADATA_ROUTE_ARGS,
        target,
        methodName!,
      ) || [];
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
  return createRouteParamDecorator(
    RouteParamTypes.RAW_BODY,
  )(property, ...pipes);
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
