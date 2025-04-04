export function generateController(
  name: string,
  asResource?: boolean,
): string {
  if (asResource) {
    return `import { Controller, Get, Post, Patch, Delete, Param, Body  } from '#nust';
import { UserService } from './user.service';
import type { CreateUserDto } from './dto/CreateUser.dto';
import type { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('${name.toLowerCase()}')
export class ${name}Controller {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Post()
  create(@Body(CreateUserDto) dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
`;
  }
  return `import { Controller, Get } from '#nust';

@Controller('${name.toLowerCase()}')
export class ${name}Controller {
  @Get()
  findAll() {
    return [];
  }
}
`;
}

export function generateService(
  name: string,
  asResource?: boolean,
): string {
  if (asResource) {
    return `import type { CreateUserDto } from './dto/CreateUser.dto';
import type { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserEntity } from './entity/user.entity'

export class ${name}Service {

  async findAll(){
    //
  }

  async findOne(id: string) {
    //
  }

  async create(dto: CreateUserDto){
    //
  }

  async update(id: string, dto: UpdateUserDto){
    //
  }

  async remove(id: string) {
    //
  }
}
`;
  }
  return `import { Injectable } from '#nust';

export class ${name}Service {

}
`;
}

export function generateEntity(name: string): string {
  return `export class ${name}Entity {
  id: number;
  // Add your entity properties here
}
`;
}

export function generateDto(
  name: string,
  type: 'create' | 'update',
): string {
  const className =
    type === 'create' ? `Create${name}Dto` : `Update${name}Dto`;
  return `import { IsString, IsInt } from 'class-validator';
import { ApiProperty, ApiSchema } from '#nust';

@ApiSchema({ title: '${className}' })
export class ${className} {
  @ApiProperty({ type: 'string' })
  @IsString()
  name: string;

  @ApiProperty({ type: 'number' })
  @IsInt()
  age: number;

  // Add more properties as needed
}
`;
}

export function generateResource(name: string): {
  controller: string;
  service: string;
  entity: string;
  createDto: string;
  updateDto: string;
} {
  return {
    controller: generateController(name, true),
    service: generateService(name, true),
    entity: generateEntity(name),
    createDto: generateDto(name, 'create'),
    updateDto: generateDto(name, 'update'),
  };
}
