import { Controller, Get, Post, Patch, Delete, Param, Body  } from '#nust';
import { UserService } from './user.service';
import type { CreateUserDto } from './dto/CreateUser.dto';
import type { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('user')
export class userController {
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
