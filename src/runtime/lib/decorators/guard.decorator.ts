import { createError, type H3Error, type H3Event } from 'h3';
import type { ServerObject } from 'openapi-typescript';
import { METADATA_ROUTE_GUARDS } from '../constants';

export abstract class NustGuard {
  abstract authorize: (event: H3Event) => boolean | Promise<boolean>;
  abstract notAuthorizedException?: () => Partial<H3Error>;
  abstract openApiMeta?: () => {
    operation?: any;
    components?: any;
    serverVariables?: ServerObject['variables'];
  };
}

export function UseGuards(
  ...guards: (typeof NustGuard | NustGuard)[]
): MethodDecorator {
  return (
    target,
    propertyKey,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const originalMethod = descriptor.value;

    Reflect.defineMetadata(
      METADATA_ROUTE_GUARDS,
      guards,
      target,
      propertyKey,
    );

    descriptor.value = async function (...args: any[]) {
      for (const guardCls of guards) {
        const guard =
          typeof guardCls === 'object'
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

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
