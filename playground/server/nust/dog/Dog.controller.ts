import type { H3Event } from '../../../../../nust-module/src/runtime/lib';
import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
} from '../../../../../nust-module/src/runtime/lib';
import AuthGuard from '../../guards/Auth.guard';

@Controller('dog', {
  guards: [AuthGuard],
})
export class DogController {
  @Get('')
  findAll() {
    return 'this action returns all dogs';
  }

  @Post('')
  create() {
    return 'this action adds a new dog';
  }

  @Get(':id')
  findOne(event: H3Event) {
    const id = getRouterParam(event, 'id');
    return `this action return a dog with ID:${id}`;
  }

  @Patch(':id')
  update(event: H3Event) {
    const id = getRouterParam(event, 'id');
    return `this action updates a dog with ID:${id}`;
  }

  @Delete(':id')
  delete(event: H3Event) {
    const id = getRouterParam(event, 'id');
    return `this action deletes a dog with ID:${id}`;
  }
}
