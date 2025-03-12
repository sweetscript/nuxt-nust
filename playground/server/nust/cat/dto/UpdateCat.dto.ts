import { IsString, IsInt } from 'class-validator';

export class UpdateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
