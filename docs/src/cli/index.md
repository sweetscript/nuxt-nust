# CLI

The cli provides a generate feature to easily create resources, controllers, providers ...etc

## Setup

To use the nust module, update your package.json file by adding the following:

```json{2-4}
//package.json
  "bin": {
    "nust": "./node_modules/nuxt-nust/bin/cli.js"
  },
```

You can now use the nust cli in your nuxt project

```bash
npx nust g {type} {name} --path=server/nust
```

## Generating a new resource

To create a new resource, simply run the following command in the root directory of your project:

```bash
npx nust g resource {name}
```

This will generate all the resource building blocks (service, controller, dtos, entity)

for example running `npx nust g resource User` will generate these files:

```js
//server/nust/
└── user/
    ├── dto/
    │   ├── CreateUser.dto.ts
    │   └── UpdateUser.dto.ts
    ├── entity/
    │   └── user.entity.ts
    ├── user.controller.ts
    └── user.service.ts
```

## Generate a new controller

```bash
npx nust g controller User
```

## Generate a new service

```bash
npx nust g service User
```

## Generate a new entity

```bash
npx nust g entity User
```


## Generate a new dto

```bash
npx nust g dto User --dtoType=create
```
