# DTO OpenAPI decorators

:::tip
This feature is inspired by NestJS [openapi decorators](https://docs.nestjs.com/openapi/types-and-parameters)
:::

If openapi is enabled in your nuxt application, The nust module will automatically add its controller routes to the _openapi.json schema.

It will also pick up route parameters like @Param and @Body and add them to the openapi schema.

However, in order for the DTO/Body schema to show in the openapi docs, you need to use [@ApiProperty](/reference/openapi#@ApiProperty) decorator and append it to your DTO parameters.

For example:

```typescript
import { ApiProperty } from '#nust';

@ApiSchema({ title: 'CreateCatDto' })
export class CreateCatDto {
  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'number' })
  age: number;

  @ApiProperty({ type: 'string' })
  breed: string;
}
```

[@ApiSchema](/reference/openapi#@ApiSchema) decorator can be used to modify the schema of the openapi DTO model


