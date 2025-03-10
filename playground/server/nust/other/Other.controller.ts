import { Controller, All } from '../../../../../nust-module/src/lib'

@Controller()
export class OtherController {
  @All('other')
  findAll() {
    return 'this action returns on all methods'
  }
}
