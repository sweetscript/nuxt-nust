import { IsString, IsInt } from 'class-validator';
import { ApiProperty, ApiSchema } from '#nust';

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
