# Configuration

`nuxt-nust` package can be configured under the `nust` property in your `nuxt.config.ts` file

```typescript{4,5,6}
// nuxt.config.ts
export default defineNuxtConfig({
  ...
  nust: {
    // Enter configuration here
  }
  ...
})
```

## Options

| Option                       | Type      | Default | Description                                                                                                               |
|------------------------------|-----------|---------|---------------------------------------------------------------------------------------------------------------------------|
| `controllersFile`            | `string`  | --      | // Path to controllers export file in your project relative to root folder, for example: `~/server/nust/index.ts`         |
| `debug`                      | `boolean` | `false` | Enables debug logging of routes created by the controllers                                                                |
| `autoPrependEvent` (Planned) | `boolean` | `true`  | If enabled, will pass the H3Event as the first argument in all controller route methods                                   |
| `openApiTag`      | `string`  | null   | If set, the routes will no longer be tagged by thier controller key and instead all nust routes will be tagged by set tag |


## `controllersFile`

The controllers file should return an object of all controllers, each controller having its unique key.

:::tip
Controllers file should sit under the `server` directory and ideally all controllers should be underneath the same directory holding the controllersFile
:::

Example: 

```typescript
// server/nust/index.ts
import { type NustControllers } from '#nust'
import { CatController } from './cat/Cat.controller';
import { DogController } from './dog/Dog.controller';

export default {
  // Here you'll be adding your controller classes
  cat: CatController,
  dog: DogController,
} satisfies NustControllers
```

## `debug`

Enabled this if you wish to see all the server handlers that were added by the nust module in your nuxt logs, like so:

```
ℹ Vite client warmed up in 6ms
Nust route added:  GET /cat -> findAll
Nust route added:  POST /cat -> create
Nust route added:  GET /cat/:id -> findOne
Nust route added:  PATCH /cat/:id -> update
Nust route added:  DELETE /cat/:id -> delete
ℹ Vite server warmed up in 924ms 
```

## `autoPrependEvent`

<Badge type="warning">Planned work</Badge>

## `openApiTag`

Nust module will assign the controller key as the openapi tag for its routes, however you can assign a custom tag for all nust routes using `openApiTag` config
