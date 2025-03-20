import type { CatEntity } from '~/server/nust/cat/entity/Cat.entity';

export class CatService {
  findOne(id: string): CatEntity {
    return {
      id,
      name: 'Name',
      age: 5,
      breed: 'Breed',
    };
    // return `this action returns cat with ID: ${id}`;
  }

  findAll() {
    return 'this action returns all cats';
  }
}
