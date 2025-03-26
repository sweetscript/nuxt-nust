# Controllers

:::tip
This feature is inspired by NestJS [controllers](https://docs.nestjs.com/controllers)
:::

Controllers are classes that are responsible for handling incoming requests and sending responses back to the client. 

To create a basic controller, we use classes and decorators. Decorators link classes with the necessary metadata, allowing Nest to create a routing map that connects requests to their corresponding controllers.

A class can be defined as a controller by adding the decorator [@Controller](/reference/controller-decorators#@Controller) to it like so

```typescript
import { Controller } from '#nust'

@Controller('')
export default class CatController{
  //route methods goes here
}
```

The Controller decorator accepts a prefix parameter which if set will prefix all controller routes with it.


## Routing

You can add routes as methods to the controller and prefix the functions with the method [route decorators](/reference/controller-decorators#@RouteDecorators)

Available method decorators: `Get` `Post` `Put` `Patch` `Delete` `Options` `Head` `Any`

Example: 

```typescript
import { Controller, Get } from '#nust'
import { H3Event } from 'h3'

@Controller('cat')
export default class CatController{
  
  @Get()
  findAll(event: H3Event){
    // Logic to return all cats here
    return //[]
  }
  
}
```

## Route parameters

To define routes with parameters, you can add route parameter tokens in the route path to capture the dynamic values from the URL.

An example:

```typescript
@Get('cat/:id')
findOne(event: H3Event) {
  const id = getRouterParam(event);
  return `This action returns a #${id} cat`;
}
```

The [@Param](/reference/parameter-decorators#@Param) decorator can be used to fetch the parameter directly like so


```typescript
@Get('cat/:id')
findOne(event: H3Event, @Param('id') id: string) {
  return `This action returns a #${id} cat`;
}
```

## Route wildcards

```typescript
@Get('abcd/*')
findAll() {
  return 'This route uses a wildcard';
}
```

## Query parameters

You can use the [@Query](/reference/parameter-decorators#@Query) decorator to fetch query parameters directly

```typescript
@Get('cat')
findAll(@Query('age') age: number, @Query('breed') breed: string) {
  return `This action returns all cats filtered by age: ${age} and breed: ${breed}`;
}
```

## Request payloads

You can define the body DTO like so:

```typescript
//dto/CreateCat.dto.ts
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```

Now you can use this dto class and pass it the @Body decorator.

```typescript
@Post()
async create(@Body(CreateCatDto) dto: CreateCatDto) {
  console.log('passed dto', dto)
  return 'This action adds a new cat';
}
```

The [@Body](/reference/parameter-decorators#@Body) decorator will handle validation of class-validator decorators set in the DTO, and it will also preform a class-transformer plainToInstance. 

You can use the [@RawBody](/reference/parameter-decorators#@RawBody) decorator to return the payload without validaton or transformation.


### Custom parameter decorators

You can create your own paramter decorators by utilising the [createCustomParamDecorator](/reference/parameter-decorators#createCustomParamDecorator) function like so:

```typescript
export default function MyCustomDecorator() {
  return createCustomParamDecorator((event) => {
    // custom logic here 
    return // return value to assing to arg here
  });
} 
```
