import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { SharedService } from '@app/shared';
import { NewUserDTO } from './dtos/new-user.dto';
import { LoginUserDTO } from './dtos/login-user.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'get-users' })
  async getUsers(@Ctx() context: RmqContext) {
    this.sharedService.acknowledgeMessage(context);
    return this.authService.getUsers();
  }

  @MessagePattern({ cmd: 'register' })
  async registerUser(
    @Ctx() context: RmqContext,
    @Payload() newUser: NewUserDTO,
  ) {
    this.sharedService.acknowledgeMessage(context);
    return this.authService.register(newUser);
  }

  @MessagePattern({ cmd: 'login' })
  async loginUser(
    @Ctx() context: RmqContext,
    @Payload() loginUser: LoginUserDTO,
  ) {
    this.sharedService.acknowledgeMessage(context);
    return this.authService.login(loginUser);
  }
}
