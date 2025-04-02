import type { NustGuard } from '#nust';
import type { H3Event } from 'h3';

export default class AuthGuard implements NustGuard {
  private roles: string[];

  constructor(...roles: string[]) {
    this.roles = roles;
  }

  authorize(_event: H3Event) {
    return (
      this.roles?.includes('guest') ||
      _event.headers.get('Authorization') === 'Bearer test'
    );
  }
  notAuthorizedException() {
    return {
      statusCode: 403,
      statusMessage: 'Oops!',
    };
  }
  openApiMeta() {
    return {
      components: {
        // securitySchemes: {
        //   bearerAuth: {
        //     type: 'http',
        //     scheme: 'bearer',
        //     bearerFormat: 'JWT',
        //   },
        // },
      },
      operation: {
        // security: [
        //   {
        //     bearerAuth: [],
        //   },
        // ],
        parameters: [
          {
            in: 'header',
            name: 'Authorization',
            required: true,
            schema: {
              type: 'string',
              default: 'Bearer {{access_token}}',
            },
          },
        ],
      },
      serverVariables: {
        access_token: {
          default: 'test',
          description: 'Bearer access token goes here',
        },
      },
    };
  }
}
