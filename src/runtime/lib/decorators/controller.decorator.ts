import 'reflect-metadata';
import {
  METADATA_CONTROLLER_WATERMARK,
  METADATA_PATH,
} from '../constants';
import type { NustGuard } from '../decorators/guard.decorator';

export function Controller(
  prefix?: string,
  options?: { guards?: (typeof NustGuard | NustGuard)[] },
) {
  return (target: object) => {
    Reflect.defineMetadata(
      METADATA_CONTROLLER_WATERMARK,
      true,
      target,
    );
    Reflect.defineMetadata(METADATA_PATH, prefix, target);

    if (options?.guards) {
      Object.defineProperty((target as any).prototype, '__guards', {
        value: options.guards,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
  };
}
