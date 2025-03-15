import {
  Controller,
  All,
  Get,
  UseGuards,
} from '../../../../../nust-module/src/runtime/lib';
import AuthGuard from '~/server/guards/Auth.guard';

@Controller()
export class OtherController {
  @All('other')
  findAll() {
    return 'this action returns on all methods';
  }

  @Get('protected')
  @UseGuards(AuthGuard)
  getProtected() {
    return 'this action returns is protected';
  }

  @Get('guest')
  @UseGuards(new AuthGuard('guest'))
  getPublic() {
    return 'this action returns is public';
  }
}
