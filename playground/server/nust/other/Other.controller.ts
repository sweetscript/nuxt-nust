import {
  Controller,
  All,
} from '../../../../../nust-module/src/runtime/lib';

@Controller()
export class OtherController {
  @All('other')
  findAll() {
    return 'this action returns on all methods';
  }
}
