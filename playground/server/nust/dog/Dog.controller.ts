import type { Event } from '../../../../../nust-module/src/lib'
import { Controller, Get, Patch, Post, Delete } from '../../../../../nust-module/src/lib'

@Controller('dog')
export class DogController {
  @Get('')
  findAll() {
    return 'this action returns all dogs'
  }

  @Post('')
  create() {
    return 'this action adds a new dog'
  }

  @Get(':id')
  findOne(event: Event) {
    const id = getRouterParam(event, 'id')
    return `this action return a dog with ID:${id}`
  }

  @Patch(':id')
  update(event: Event) {
    const id = getRouterParam(event, 'id')
    return `this action updates a dog with ID:${id}`
  }

  @Delete(':id')
  delete(event: Event) {
    const id = getRouterParam(event, 'id')
    return `this action deletes a dog with ID:${id}`
  }
}
