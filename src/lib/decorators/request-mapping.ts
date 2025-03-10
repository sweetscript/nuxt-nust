import 'reflect-metadata'
import { METADATA_METHOD, METADATA_PATH, RequestMethod } from '../constants'

export function getPathMetadata(target: object, propertyKey: string) {
  return Reflect.getMetadata(METADATA_PATH, target, propertyKey)
}
export function getMethodMetadata(target: object, propertyKey: string) {
  return Reflect.getMetadata(METADATA_METHOD, target, propertyKey)
}

export const RequestMapping
  = (method: RequestMethod) =>
    (path?: string): MethodDecorator => {
      return (
        target: object,
        propertyKey: string | symbol,
        descriptor:  TypedPropertyDescriptor<any>,
      ) => {
        Reflect.defineMetadata(METADATA_PATH, path ?? '', target, propertyKey)
        Reflect.defineMetadata(METADATA_METHOD, method, target, propertyKey)
        return descriptor
      }
    }

/**
 * Route handler (method) Decorator. Routes HTTP Get requests to the specified path.
 */
export const Get = RequestMapping(RequestMethod.get)
/**
 * Route handler (method) Decorator. Routes HTTP Post requests to the specified path.
 */
export const Post = RequestMapping(RequestMethod.post)
/**
 * Route handler (method) Decorator. Routes HTTP Put requests to the specified path.
 */
export const Put = RequestMapping(RequestMethod.put)
/**
 * Route handler (method) Decorator. Routes HTTP Patch requests to the specified path.
 */
export const Patch = RequestMapping(RequestMethod.patch)
/**
 * Route handler (method) Decorator. Routes HTTP Delete requests to the specified path.
 */
export const Delete = RequestMapping(RequestMethod.delete)
/**
 * Route handler (method) Decorator. Routes HTTP Options requests to the specified path.
 */
export const Options = RequestMapping(RequestMethod.options)
/**
 * Route handler (method) Decorator. Routes HTTP Head requests to the specified path.
 */
export const Head = RequestMapping(RequestMethod.head)
/**
 * Route handler (method) Decorator. Routes HTTP All requests to the specified path.
 */
export const All = RequestMapping(RequestMethod.all)
