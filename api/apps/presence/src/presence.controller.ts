import { SharedService } from '@app/shared';
import { Controller, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { PresenceService } from './presence.service';
import { Context } from '@nestjs/graphql';

@Controller()
export class PresenceController {
  constructor(
    private readonly presenceService: PresenceService,
    private readonly shareService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'get-presence' })
  @UseInterceptors(CacheInterceptor)
  async getPresence(@Ctx() context: RmqContext) {
    this.shareService.acknowledgeMessage(context);
    return this.presenceService.getHello();
  }

  @MessagePattern({ cmd: 'get-active-user' })
  async getActiveUser(
    @Context() context: RmqContext,
    @Payload() payload: { id: number },
  ) {
    this.shareService.acknowledgeMessage(context);
    return this.presenceService.getActiveUser(payload.id);
  }
}
