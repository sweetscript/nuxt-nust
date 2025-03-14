import 'reflect-metadata';
import {
  METADATA_CONTROLLER_WATERMARK,
  METADATA_PATH,
} from '../constants';

export function Controller(prefix?: string) {
  return (target: object) => {
    Reflect.defineMetadata(
      METADATA_CONTROLLER_WATERMARK,
      true,
      target,
    );
    Reflect.defineMetadata(METADATA_PATH, prefix, target);
  };
}
