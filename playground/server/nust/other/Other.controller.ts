import { Controller, All, Get, UseGuards, Ip, Query } from '#nust';
import AuthGuard from '~/server/guards/Auth.guard';
import Method from '~/server/decorators/Method.decorator';

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

  @Get('ip-address')
  getIpAddress(@Ip() ip: string, @Query('id') id: string) {
    return {
      ip: ip,
      query: {
        id: id,
      },
    };
  }

  @All('custom-param-decorator')
  customParamDecorator(@Method() method: string) {
    return {
      method: method,
    };
  }
}
