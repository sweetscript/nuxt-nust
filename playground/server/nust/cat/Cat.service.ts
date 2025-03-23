import type { CatEntity } from '~/server/nust/cat/entity/Cat.entity';

export class CatService {
  findOne(id: number): CatEntity | undefined {
    // return `this action returns cat with ID: ${id}`;
    return sampleData.find((i) => i.id === id);
  }

  findAll(): CatEntity[] {
    return sampleData;
  }
}

const sampleData = [
  { id: 1, name: 'Mittens', age: 2, breed: 'Siamese' },
  { id: 2, name: 'Whiskers', age: 3, breed: 'Maine Coon' },
  { id: 3, name: 'Oliver', age: 5, breed: 'Persian' },
  { id: 4, name: 'Luna', age: 4, breed: 'Bengal' },
  { id: 5, name: 'Simba', age: 1, breed: 'British Shorthair' },
  { id: 6, name: 'Sassy', age: 6, breed: 'Ragdoll' },
  { id: 7, name: 'Gizmo', age: 3, breed: 'Sphynx' },
  { id: 8, name: 'Nala', age: 2, breed: 'Norwegian Forest Cat' },
  { id: 9, name: 'Chloe', age: 4, breed: 'Abyssinian' },
  { id: 10, name: 'Leo', age: 7, breed: 'Russian Blue' },
];
