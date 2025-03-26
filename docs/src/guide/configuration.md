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

| Option                       | Type      | Default | Description                                                                               |
|------------------------------|-----------|---------|-------------------------------------------------------------------------------------------|
| `controllersFile`            | `string`  | --      | // Path to controllers export file in your project relative to root folder, for example: `~/server/nust/index.ts` |
| `debug`                      | `boolean` | `false` | Enables debug logging of routes created by the controllers                                |
| `autoPrependEvent` (Planned) | `boolean` | `true`  | If enabled, will pass the H3Event as the first argument in all controller route methods   |



## Controllers File

The controllers file should return an object of all controllers, each controller having its unique key

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
