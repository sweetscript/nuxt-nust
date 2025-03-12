import type { NustControllers } from '../../../../nust-module/src/lib';
import { CatController } from '~/server/nust/cat/Cat.controller';
import { DogController } from '~/server/nust/dog/Dog.controller';
import { OtherController } from '~/server/nust/other/Other.controller';

export default {
  cat: CatController,
  dog: DogController,
  other: OtherController,
} satisfies NustControllers;
