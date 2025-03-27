# Overview

::: warning
Still in development, Contributions are welcome
:::

Nust is a nuxt module that allows [NestJS like](https://docs.nestjs.com/controllers) backend structure in nuxt, Standardizing your backend with CRUD structure,  powering nuxt backend with features like:

- 🎮 &nbsp;Controllers
- 🖌️ &nbsp;Decorators
- 🛎️ &nbsp;Injectable providers/services
- 🪄️ &nbsp;Parameter extraction
- ✅️ &nbsp;Body/DTO Validation (using [`class-validator`](https://github.com/typestack/class-validator))
- 🔄️ &nbsp;Transformers (using [`class-transformer`](https://github.com/typestack/class-transformer))
- 🔒️ &nbsp;Guards
- 📖️ &nbsp;OpenAPI documentation support, Nestjs like Api documentation decorators for better Swagger and Scalar support

Turn your server structure from this:

#### From this:

```js
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

```js
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

If you've worked with other backend focused frameworks you'd realise this structure is familiar, where the logic for a CRUD resource all sits under one folder/module, helps keep the backend code organised and its logic reusable.


###  Resource controllers

You're event handler changes from this:

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
import { Controller, Get, Post, Delete, Body, Param } from '#nust'

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
