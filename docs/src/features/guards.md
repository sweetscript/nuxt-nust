# Guards


:::tip
This feature is inspired by [NestJS guards](https://docs.nestjs.com/guards)
:::

Guards can be used to determine whether a given request will be handled or not, This can be used for authorization or as a pre middleware. providing the ability to reuse and attach to routes with ease.

## Create a guard

To create a guard controller, you can create a class that implements `NustGaurd`, the following example is for creating an auth gaurd:

```typescript
//auth.guard.ts
import type { NustGuard } from '#nust';
import type { H3Event } from 'h3';

export default class AuthGuard implements NustGuard {
  private roles: string[];

  constructor(...roles: string[]) {
    this.roles = roles;
  }

  authorize(_event: H3Event) {
    // Logic to check if user is logged in here
    // Logic to check if user role is one of the ones passed to the AuthGuard constructor
    return true // boolean whether to go ahead or not
  }
  notAuthorizedException() {
    return {
      statusCode: 403,
      statusMessage: 'Oops!',
    };
  }
}
```

## Add the guard to route

Then you can utilise the method decorator [@UseGuards](/reference/guard-decorators#@UseGuards) 

```typescript
import { UseGuards, Get } from '#nust' 
import AuthGuard from '../guards/auth.guard.ts' 

@Get('protected')
@UseGuards(AuthGuard('admin', 'editor'))
getProtected() {
  return 'this action is protected';
}

@Get('guest')
@UseGuards(new AuthGuard('guest'))
getPublic() {
  return 'this action is for guests only';
}
```

## Add the guard to a controller

You can also add the guard to the @Controller decorator which will then implement the guard on all the controller routes

```typescript
import { Controller } from '#nust'
import AuthGuard from '../guards/auth.guard.ts'

@Controller('cat', {
  guards: [AuthGuard],
})
export default class CatController {
  // ...
}
```
