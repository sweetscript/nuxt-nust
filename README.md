# Nust Module for Nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nust is a nuxt module that allows [NestJS like](https://docs.nestjs.com/controllers) backend structure in nuxt, Standardizing your backend with CRUD structure,  powering nuxt backend with features like:

- 🎮 &nbsp;Controllers
- 🖌️ &nbsp;Decorators
- 🛎️ &nbsp;Injectable providers/services
- 🪄️ &nbsp;Parameter extraction
- ✅️ &nbsp;Body/DTO Validation (using [`class-validator`](https://github.com/typestack/class-validator))
- 🔄️ &nbsp;Transformers (using [`class-transformer`](https://github.com/typestack/class-transformer))
- 🔒️ &nbsp;Guards
- 📖️ &nbsp;OpenAPI documentation support, Nestjs like Api documentation decorators for better Swagger and Scalar support

[🏀 &nbsp;Online playground](https://stackblitz.com/edit/nuxt-nust-example?file=server%2Fnust%2Fcat%2FCat.controller.ts)

[📖 &nbsp;Documentation](https://sweetscript.github.io/nuxt-nust)

## Usage

1. Install the module to your Nuxt application:

<!--```bash
npx nuxi module add nuxt-nust
```-->

```bash
npm i nuxt-nust
```

2. Add `nuxt-nust` to list of modules in your `nuxt.config.ts` file, along with `nust` configuration:

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
import { type NustControllers } from '#nust'

export default {
  // Here you'll be adding your controller classes
  // Example:
  // post: PostController
} satisfies NustControllers
```

4. Update the `tsconfig.json` files by adding the following lines:

```json
{
  "extends": "../.nuxt/tsconfig.server.json",
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "strictPropertyInitialization": false
  }
}
```

5. That's it! You can now use Nust Module in your Nuxt app ✨

#### Example of adding a controller, lets call this one `CatController`

1.Create a controller file under the nust directory, `server/nust/cat/Cat.controller.ts`

```typescript
import { Controller, type H3Event } from '#nust'

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
import {type NustControllers} from '#nust'
import { CatController } from "./cat/Cat.controller";

export default {
  cat: CatController
} satisfies NustControllers
```
 
3. Restart nuxt service
4. Now the endpoint `/api/cat` is available


## Concept

Turn your server structure from this:

#### From this:
```
server/
├── api/
│   ├── cat/
│   │   ├── index.get.ts   //Find all
│   │   ├── index.post.ts  //Create
│   │   ├── [id].get.ts    //Find one
│   │   ├── [id].patch.ts  //Update
│   │   └── [id].delete.ts //delete
│   └── dog/
│       ├── index.get.ts   //Find all
│       ├── index.post.ts  //Create
│       ├── [id].get.ts    //Find one
│       ├── [id].patch.ts  //Update
│       └── [id].delete.ts //delete
└── utils/
    ├── catUtilss.ts
    └── dogUtils.ts
```

#### To this:  (Just and example, structure can be however you like)
```
server/
├── nust/
│   ├── cat/
│   │   ├── dto/               // For example, you can add your CRUD dto's here
│   │   │   ├── CreateCat.dto.ts
│   │   │   └── UpdateCat.dto.ts
│   │   ├── entity/            // For example, you can add your resource relevent types here
│   │   ├── cat.controller.ts  // Has all the CRUD methods
│   │   └── cat.service.ts     // cat service provider, can be used to hold all logic, allowing it to be injected to any controller and reuse the logic
│   └── dog/
│   │   ├── dog.controller.ts  // Has all the CRUD methods
│   │   └── dog.service.ts     // dog service provider
└── index.ts                   // controllersFile, a file that exports an object of all controllers
```

If you've worked with other backend focused frameworks you'd find this structure familiar, where the logic for a CRUD resource all sits under one folder/module, helps keep the backend code organised and its logic reusable.


### Resource controllers?

Your event handler changes from this:

```typescript
//index.get.ts
export default defineEventHandler((event)=>{
  //...
  return //
})
//index.post.ts
export default defineEventHandler((event)=>{
  //...
  return //
})
//[id].get.ts
export default defineEventHandler((event)=>{
  //...
  return //
})
//[id].post.ts
export default defineEventHandler((event)=>{
  //...
  return //
})
//[id].delete.ts
export default defineEventHandler((event)=>{
  //...
  return //
})
```

To this:

```typescript
import {Controller, Get, Post, Delete, Body, Param} from '#nust'

@Controller('cat') // Prefix can be defind here or you can just add it to each method
export class CatController {
  // Get all
  @Get('')
  findAll() {
    //...
  }

  // POST Create
  @Post('')
  create(event: H3Event, @Body(CreateCatDto) dto: CreateCatDto) {
    //...
  }

  // Get one
  @Get(':id')
  findOne(event: H3Event, @Param('id') id: string): CatEntity {
    //..
  }

  @Patch(':id')
  update(
    event: H3Event,
    @Param('id') id: string,
    @Body(UpdateCatDto) dto: UpdateCatDto,
  ) {
    //...
  }

  @Delete(':id')
  delete(event: H3Event, @Param('id') id: string) {
    //...
  }
  
  @Any('get-random-cat')
  otherNoneStandardCRUDmethod(event: H3Event) {
    //...
  }
}
```


## Documentation

https://sweetscript.github.io/nuxt-nust/guide/setup.html

## Contribution

Contributions are welcome 🙏

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

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-nust/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-nust

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-nust.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-nust

[license-src]: https://img.shields.io/npm/l/nuxt-nust.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-nust

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
