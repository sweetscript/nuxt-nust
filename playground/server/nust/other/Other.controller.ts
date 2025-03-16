import {
  Controller,
  All,
  Get,
  UseGuards,
  Ip,
  Query,
} from '../../../../../nust-module/src/runtime/lib';
import AuthGuard from '~/server/guards/Auth.guard';
import type { H3Event } from 'h3';

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
  getIpAddress(
    _event: H3Event,
    @Ip() ip: string,
    @Query('id') id: string,
  ) {
    return {
      ip: ip,
      query: {
        id: id,
      },
    };
  }
}
