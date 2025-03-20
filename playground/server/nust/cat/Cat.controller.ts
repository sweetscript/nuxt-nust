import type { H3Event } from '../../../../../nust-module/src/runtime/lib';
import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Body,
  Param,
  Inject,
} from '../../../../../nust-module/src/runtime/lib';
import { CreateCatDto } from './dto/CreateCat.dto';
import { UpdateCatDto } from './dto/UpdateCat.dto';
import { CatService } from './Cat.service';
import type { CatEntity } from '~/server/nust/cat/entity/Cat.entity';

@Controller('cat')
export class CatController {
  constructor(
    @Inject(CatService)
    private readonly catService: CatService,
  ) {}

  // Get all example
  @Get('')
  findAll() {
    return this.catService.findAll();
  }

  // POST Create example
  @Post('')
  create(event: H3Event, @Body(CreateCatDto) dto: CreateCatDto) {
    console.log('dto', dto);
    return 'this action adds a new cat';
  }

  // Get one example
  @Get(':id')
  findOne(event: H3Event, @Param('id') id: string): CatEntity {
    return this.catService.findOne(id);
    // const id = getRouterParam(event, 'id')
    // return `this action return a cat with ID:${id}`;
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
