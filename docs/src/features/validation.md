# Validation

:::tip
This feature is inspired by NestJS [controllers](https://docs.nestjs.com/techniques/validation)
:::

DTO Validation is implemented by the [@Body](/reference/parameter-decorators#@Body) decorator, the decorator will handle validations set by [class-validator](https://github.com/typestack/class-validator) package.

```typescript
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;
  
  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
```

