# Setup

1. In your nuxt application, install the npm package:

```bash
npm i nuxt-nust
```

2. Add `nuxt-nust` to list of modules in your `nuxt.config.ts` file, along with the `nust` configurations:

```typescript{4,6,7,8,9}
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    'nuxt-nust'
  ],
  nust: {
    controllersFile: '~/server/nust/index.ts', // Path to controllers export file in your project relative to root folder
    debug: false, // Enable to show the routes added by your controllers in the logs
  }
})
```

3. Create a file in your project to export all controllers that sits under the path specified in the previous step, for example: `server/nust/index.ts`

```typescript
// server/nust/index.ts
import { type NustControllers } from '#nust'

export default {
  // Here you'll be adding your controller classes
  // Example:
  // post: PostController
} satisfies NustControllers
```

4. Update the `tsconfig.json` files by adding the following lines:  

```json{4,5,6}
{
  "extends": "../.nuxt/tsconfig.server.json",
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "strictPropertyInitialization": false
  }
}
```

5. That's it! You can now use the Nust Module in your Nuxt app ✨


