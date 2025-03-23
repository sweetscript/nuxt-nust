import { IsString, IsInt } from 'class-validator';
import { ApiProperty, ApiSchema } from 'nuxt-nust/utils';

@ApiSchema({ title: 'CreateCatDto' })
export class CreateCatDto {
  @IsString()
  name: string;

  @ApiProperty({ type: 'number' })
  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
