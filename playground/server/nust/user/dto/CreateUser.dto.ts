import { IsString, IsInt } from 'class-validator';
import { ApiProperty, ApiSchema } from '#nust';

@ApiSchema({ title: 'CreateUserDto' })
export class CreateUserDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  name: string;

  @ApiProperty({ type: 'number' })
  @IsInt()
  age: number;

  // Add more properties as needed
}
