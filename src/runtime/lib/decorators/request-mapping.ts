import 'reflect-metadata';
import {
  METADATA_METHOD,
  METADATA_PATH,
  METADATA_ROUTE_ARGS,
  RequestMethod,
  RouteParamTypes,
} from '../constants';
import {
  createError,
  getQuery,
  getRouterParam,
  type H3Event,
  readBody,
} from 'h3';
import { cleanPlainObject } from '../utils';
import type { RouteParamMetadata } from '../types';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { NustGuard } from '../decorators/guard.decorator';

export function getPathMetadata(target: object, propertyKey: string) {
  return Reflect.getMetadata(METADATA_PATH, target, propertyKey);
}
export function getMethodMetadata(
  target: object,
  propertyKey: string,
) {
  return Reflect.getMetadata(METADATA_METHOD, target, propertyKey);
}

export const RequestMapping =
  (method: RequestMethod) =>
  (path?: string): MethodDecorator => {
    return (
      target: object,
      methodName: string | symbol,
      descriptor: TypedPropertyDescriptor<any>,
    ) => {
      Reflect.defineMetadata(
        METADATA_PATH,
        path ?? '',
        target,
        methodName,
      );
      Reflect.defineMetadata(
        METADATA_METHOD,
        method,
        target,
        methodName,
      );
      const originalMethod = descriptor.value;

      // Process Parameter Decorators
      descriptor.value = async function (...args: any[]) {
        const event: H3Event = args?.[0];
        if (!event) return originalMethod.apply(this, args);

        // Check guards
        const controllerGuards: (typeof NustGuard | NustGuard)[] = (
          target as any
        ).__guards;
        if (controllerGuards) {
          for (const guardCls of controllerGuards) {
            const guard =
              guardCls instanceof NustGuard
                ? guardCls
                : // @ts-expect-error
                  new guardCls();
            const authorized = await guard.authorize(args[0]);
            if (!authorized) {
              throw createError(
                guard.notAuthorizedException
                  ? guard.notAuthorizedException()
                  : {
                      statusCode: 403,
                      statusMessage: 'Forbidden',
                    },
              );
            }
          }
        }

        // Assign params
        const params: RouteParamMetadata[] =
          Reflect.getOwnMetadata(
            METADATA_ROUTE_ARGS,
            target,
            methodName,
          ) || [];

        for (const param of params) {
          const { index, type, data, meta } = param;

          if (type === RouteParamTypes.EVENT) {
            args[index] = event;
          } else if (type === RouteParamTypes.RAW_BODY) {
            args[index] = await readBody(event);
          } else if (type === RouteParamTypes.BODY) {
            const body = await readBody(event);
            const cls = data?.[0];
            const object = cls
              ? plainToInstance(
                  cls,
                  cleanPlainObject(body ?? {}, cls),
                )
              : body;
            const errors = object ? await validate(object) : [];

            if (errors.length) {
              throw createError({
                statusCode: 400,
                statusMessage: 'Invalid fields',
                data: errors,
              });
            }

            args[index] = object;
          } else if (type === RouteParamTypes.PARAM) {
            const pID = data?.[0];
            if (pID && typeof pID === 'string') {
              args[index] = getRouterParam(event, pID);
            }
          } else if (type === RouteParamTypes.QUERY) {
            const query = getQuery(event);
            const qID = data?.[0];
            if (qID && typeof qID === 'string') {
              args[index] = query[qID];
            } else {
              args[index] = query;
            }
          } else if (type === RouteParamTypes.IP) {
            const forwarded =
              event.node.req.headers['x-forwarded-for'];
            args[index] = forwarded
              ? typeof forwarded === 'string'
                ? forwarded.split(',')[0]
                : forwarded[0].split(',')[0]
              : event.node.req.socket.remoteAddress;
          } else if (type === RouteParamTypes.CUSTOM) {
            if (meta?.handler) {
              args[index] = await meta.handler(event);
            }
          }
        }
        return originalMethod.apply(this, args);
      };
      return descriptor;
    };
  };

/**
 * Route handler (method) Decorator. Routes HTTP Get requests to the specified path.
 */
export const Get = RequestMapping(RequestMethod.get);
/**
 * Route handler (method) Decorator. Routes HTTP Post requests to the specified path.
 */
export const Post = RequestMapping(RequestMethod.post);
/**
 * Route handler (method) Decorator. Routes HTTP Put requests to the specified path.
 */
export const Put = RequestMapping(RequestMethod.put);
/**
 * Route handler (method) Decorator. Routes HTTP Patch requests to the specified path.
 */
export const Patch = RequestMapping(RequestMethod.patch);
/**
 * Route handler (method) Decorator. Routes HTTP Delete requests to the specified path.
 */
export const Delete = RequestMapping(RequestMethod.delete);
/**
 * Route handler (method) Decorator. Routes HTTP Options requests to the specified path.
 */
export const Options = RequestMapping(RequestMethod.options);
/**
 * Route handler (method) Decorator. Routes HTTP Head requests to the specified path.
 */
export const Head = RequestMapping(RequestMethod.head);
/**
 * Route handler (method) Decorator. Routes HTTP All requests to the specified path.
 */
export const All = RequestMapping(RequestMethod.all);
