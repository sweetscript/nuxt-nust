# Api Responses decorators

:::tip

This feature is inspired by NestJS [openapi responses](https://docs.nestjs.com/openapi/operations#responses)
:::

If you wish to show the types of responses in your openapi docs, you can use the nust @ApiResponse decorators or its shrothands to assign the possible responses to controller route methods.

Example: 

```typescript
@Post('')
@ApiResponse({ status: 200, description: 'OK' })
create(@Body(CreateCatDto) dto: CreateCatDto) {
  // logic here
}
```

## Providing class as response

You can use the instance property to define the class/dto type returned by the api, which the module will convert to openapi schema content

```typescript
// Get one example
@Get(':id')
@ApiResponse({ status: 200, instance: CatEntity })
@ApiResponse({ status: 404, description: 'Cat not found' })
findOne(@Param('id') id: string) {
  return this.catService.findOne(Number(id));
}
```

## Using response shorthands

You can use [shorthands](/reference/openapi#ApiResponseShorthands) that cover all common response types to assign responses quickly to route methods, for example:

```typescript
// Get one example
import {UseGuards} from "./guard.decorator";

@Get(':id')
@UseGuards(AuthGuard)
@ApiOkResponse() // to cover success response
@ApiBadRequestResponse() // to cover validation error response that might be retuned by @Body
@ApiForbiddenResponse() // to cover auth error response returned by AuthGuard
create(@Body(CreateCatDto) dto: CreateCatDto) {
  // logic here
}
```
