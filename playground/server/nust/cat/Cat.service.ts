export class CatService {
  findOne(id: string) {
    return `this action returns cat with ID: ${id}`;
  }

  findAll() {
    return 'this action returns all cats';
  }
}
