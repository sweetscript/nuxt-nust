import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Body,
  Param,
  Inject,
  EventObject,
  ApiResponse,
} from '#nust';
import type { H3Event } from 'h3';
import { CreateCatDto } from './dto/CreateCat.dto';
import { UpdateCatDto } from './dto/UpdateCat.dto';
import { CatService } from './Cat.service';
import { CatEntity } from '~/server/nust/cat/entity/Cat.entity';

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
  create(
    @Body(CreateCatDto) dto: CreateCatDto,
    @EventObject() event: H3Event,
  ) {
    console.log('dto', dto);
    console.log('event', event.path);
    return 'this action adds a new cat';
  }

  // Get one example
  @Get(':id')
  @ApiResponse({ status: 200, instance: CatEntity })
  @ApiResponse({ status: 404, description: 'Not Found' })
  findOne(@Param('id') id: string): CatEntity {
    const cat = this.catService.findOne(Number(id));
    if (!cat)
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
      });
    return cat;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(UpdateCatDto) dto: UpdateCatDto,
  ) {
    console.log('update dto', dto);
    return `this action updates a cat with ID:${id}`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `this action deletes a cat with ID:${id}`;
  }
}
