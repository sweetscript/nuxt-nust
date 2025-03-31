import { createCustomParamDecorator } from '#nust';

/**
 * Example of custom parameter decorator
 */
export default function Method() {
  return createCustomParamDecorator((event) => {
    return event.method;
  });
}
