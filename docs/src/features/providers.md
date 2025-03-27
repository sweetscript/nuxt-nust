# Providers

Providers are service classes that contain the backend logic, and can be injected into multiple Controllers.

For example, you can create a standard service class like so:

```typescript
export class CatService {
  private readonly cats: Cat[] = [];

  create(cat: CatEntity) {
    this.cats.push(cat); // DB/BE logic goes here
  }

  findAll(): CatEntity[] {
    return this.cats; // DB/BE logic goes here
  }
}
```

Then in the controller you wish to use the service you can inject it using the [@Inject](/reference/provider-decorators#@Inject) decorator like so:

```typescript{6}
import { Controller, Post, Get, Body } from '#nust'

@Controller('cat')
export default class CatController {

  constructor(@Inject(CatService) private readonly catService: CatService) {}

  @Post()
  async create(@Body() dto: CreateCatDto) {
    this.catsService.create(dto); // You can directly use the serivce like so
  }

  @Get()
  async findAll(): Promise<CatEntity[]> {
    return this.catsService.findAll();
  }
}
```

Nust will handle the injection of these services into any controller class or other provider classes.

