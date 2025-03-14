# Nust Module for Nuxt

> 🚧 Development in progress, not ready for production

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A Nuxt module that allows [NestJS-like](https://docs.nestjs.com/controllers) backend structure in nuxt, providing features like:

- 🎮 &nbsp;Controllers
- 🖌️ &nbsp;Decorators
- 🛎️ &nbsp;Injectable providers/services
- 🪄️ &nbsp;Parameter extraction
- ✅️ &nbsp;Body/DTO Validation (using [`class-validator`](https://github.com/typestack/class-validator))
- 🔄️ &nbsp;Transformers (using [`class-transformer`](https://github.com/typestack/class-transformer)) --> ⚠️ In development
- 🔒️ &nbsp;Guards --> ⚠️ In development

<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-nust?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Setup

1. Install the module to your Nuxt application:

<!--```bash
npx nuxi module add nuxt-nust
```-->

```bash
npm i nuxt-nust
```

2. Add `nuxt-nust` to list of modules in your `nuxt.config.ts` file

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-nust'],
  nust: {
    controllersFile: 'server/nust/index.ts', // Path to controllers export file in your project relative to root folder
    debug: false, // Enable to show the routes added by your controllers in the logs
  }
})
```

3. Create a file in your project to export all controllers that sits under the path specified in the previous step, for example: `server/nust/index.ts`

```typescript
// server/nust/index.ts
import { type NustControllers } from 'nuxt-nust'

export default {
  // Here you'll be adding your controller classes
  // Example:
  // post: PostController
} satisfies NustControllers
```

4. That's it! You can now use Nust Module in your Nuxt app ✨

#### Example of adding a controller, lets call this one `CatController`

1.Create a controller file under the nust directory, `server/nust/cat/Cat.controller.ts`

```typescript
import { Controller, type H3Event } from 'nuxt-nust'

@Controller('cat')
export class CatController {

  @Get('')
  findAll(event: H3Event) {
    return `this action returns all cats`
  }
  
}
```

2. Add controller to `server/nust/index.ts` file

```typescript
// server/nust/index.ts
import {type NustControllers} from 'nuxt-nust'
import { CatController } from "./cat/Cat.controller";

export default {
  cat: CatController
} satisfies NustControllers
```
 
3. Restart nuxt service
4. Now the endpoint `/api/cat` is available


> 🚧 Further Documentation in progress

<!--## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>-->


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-nust/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-nust

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-nust.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-nust

[license-src]: https://img.shields.io/npm/l/nuxt-nust.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-nust

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
