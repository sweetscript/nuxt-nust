import type { Event } from '../../../../../nust-module/src/lib'
import { Controller, Get, Patch, Post, Delete } from '../../../../../nust-module/src/lib'

@Controller('cat')
export class CatController {
  @Get('')
  findAll() {
    return 'this action returns all cats'
  }

  @Post('')
  create() {
    return 'this action adds a new cat'
  }

  @Get(':id')
  findOne(event: Event) {
    const id = getRouterParam(event, 'id')
    return `this action return a cat with ID:${id}`
  }

  @Patch(':id')
  update(event: Event) {
    const id = getRouterParam(event, 'id')
    return `this action updates a cat with ID:${id}`
  }

  @Delete(':id')
  delete(event: Event) {
    const id = getRouterParam(event, 'id')
    return `this action deletes a cat with ID:${id}`
  }
}
