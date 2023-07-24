import { Controller, Inject } from '@nestjs/common';
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
    @Inject('AuthServiceInterface')
    private readonly authService: AuthService,

    @Inject('SharedServiceInterface')
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

  @MessagePattern({ cmd: 'verify-jwt' })
  async verifyJwt(
    @Ctx() context: RmqContext,
    @Payload() payload: { jwt: string },
  ) {
    this.sharedService.acknowledgeMessage(context);
    return this.authService.verifyJwt(payload.jwt);
  }
}
