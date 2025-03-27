import type { NustGuard } from '#nust';
import type { H3Event } from 'h3';

export default class AuthGuard implements NustGuard {
  private roles: string[];

  constructor(...roles: string[]) {
    this.roles = roles;
  }

  authorize(_event: H3Event) {
    return this.roles?.includes('guest');
  }
  notAuthorizedException() {
    return {
      statusCode: 403,
      statusMessage: 'Oops!',
    };
  }
}

/*

export const AuthGuard = createGuard({
  authorize: (event) => {
    return false;
  },
  notAuthorizedException() {
    return {
      statusCode: 403,
      statusMessage: 'Oops!',
    };
  },
});
*/
