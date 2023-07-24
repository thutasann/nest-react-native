import { RmqContext, RmqOptions } from '@nestjs/microservices';

export interface SharedServiceInterface {
  getgetRmqOptions(queue: string): RmqOptions;
  acknowledgeMessage(context: RmqContext): void;
}
