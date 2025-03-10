import 'reflect-metadata'
import type { NustHandler } from './types'
import {
  getMethodMetadata,
  getPathMetadata,
} from './decorators'
import { METADATA_PATH } from './constants'

export function controllerToHandlers(key: string, Controller: any) {
  const handlers: NustHandler[] = []

  const controllerPrefix = Reflect.getMetadata(METADATA_PATH, Controller)
  const prefix
    = controllerPrefix && controllerPrefix !== ''
      ? controllerPrefix.startsWith('/')
        ? controllerPrefix
        : `/${controllerPrefix}`
      : ''
  Object.getOwnPropertyNames(Controller.prototype).forEach((fn) => {
    if (fn === 'constructor') {
      return
    }
    const route = getPathMetadata(Controller.prototype, fn)
    const method = getMethodMetadata(Controller.prototype, fn)
    if (method) {
      const pRoute
        = prefix
          + (route && route !== ''
            ? route.startsWith('/')
              ? route
              : `/${route}`
            : '')
      if (handlers.find(i => i.route === pRoute && i.method === method)) {
        return
      }
      handlers.push({
        route: pRoute,
        method,
        fn,
        controllerKey: key,
      })
    }
  })
  return handlers
}
