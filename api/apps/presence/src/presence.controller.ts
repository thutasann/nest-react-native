import { RedisService, SharedService } from '@app/shared';
import { Controller, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { PresenceService } from './presence.service';

@Controller()
export class PresenceController {
  constructor(
    private readonly presenceService: PresenceService,
    private readonly shareService: SharedService,
    private readonly redisService: RedisService,
  ) {}

  @MessagePattern({ cmd: 'get-presence' })
  @UseInterceptors(CacheInterceptor)
  async getPresence(@Ctx() context: RmqContext) {
    this.shareService.acknowledgeMessage(context);
    const foo = await this.redisService.get('foo');
    if (foo) {
      console.log('CACHED 🔐');
      return foo;
    }

    const res = await this.presenceService.getHello();
    this.redisService.set('foo', res);
    return res;
  }
}
