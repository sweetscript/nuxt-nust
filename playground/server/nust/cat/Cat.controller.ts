import type { H3Event } from '../../../../../nust-module/src/lib';
import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Body,
  Param,
} from '../../../../../nust-module/src/lib';
import { CreateCatDto } from './dto/CreateCat.dto';
import { UpdateCatDto } from './dto/UpdateCat.dto';

@Controller('cat')
export class CatController {
  @Get('')
  findAll() {
    return 'this action returns all cats';
  }

  @Post('')
  create(
    event: H3Event,
    @Body(CreateCatDto) dto: CreateCatDto,
  ) {
    console.log('dto', dto);
    return 'this action adds a new cat';
  }

  @Get(':id')
  findOne(event: H3Event, @Param('id') id: string) {
    // const id = getRouterParam(event, 'id')
    return `this action return a cat with ID:${id}`;
  }

  @Patch(':id')
  update(
    event: H3Event,
    @Param('id') id: string,
    @Body(UpdateCatDto) dto: UpdateCatDto,
  ) {
    console.log('update dto', dto);
    return `this action updates a cat with ID:${id}`;
  }

  @Delete(':id')
  delete(event: H3Event, @Param('id') id: string) {
    return `this action deletes a cat with ID:${id}`;
  }
}
