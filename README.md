# Nust Module

> Development in progress, not ready for production

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A Nuxt module that allows [NestJS-like](https://docs.nestjs.com/controllers) backend structure, using controllers, decorators and injectables 

<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nust-module?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

<!--## Features

 Highlight some of the features your module provide here 
- ⛰ &nbsp;Controllers
- 🚠 &nbsp;Decorators
- 🌲 &nbsp;Injectable provider services -->

## Setup

Install the module to your Nuxt application:

<!--```bash
npx nuxi module add nust-module
```-->

```bash
npm i nust-module
```

Add `nust-module/module` to list of modules in your `nuxt.config.ts` file

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nust-module/module']
})
```

Create a file in your project with this path `server/nust/index.ts`

```typescript
// server/nust/index.ts
import { type NustControllers } from 'nust-module'

export default {
  // Here you'll be adding your controller classes
  // Example:
  // post: PostController
} satisfies NustControllers
```

That's it! You can now use Nust Module in your Nuxt app ✨

#### Example of adding a controller, lets call this one `CatController`

1.Create a controller file under the nust directory, `server/nust/cat/Cat.controller.ts`

```typescript
import { Controller, type H3Event } from 'nust-module'

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
import {type NustControllers} from 'nust-module'
import { CatController } from "./cat/Cat.controller";

export default {
  cat: CatController
} satisfies NustControllers
```

3. Restart nuxt service
4. Now the endpoint `/api/cat` is available


Documentation in progress

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
[npm-version-src]: https://img.shields.io/npm/v/nust-module/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nust-module

[npm-downloads-src]: https://img.shields.io/npm/dm/nust-module.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nust-module

[license-src]: https://img.shields.io/npm/l/nust-module.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nust-module

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
