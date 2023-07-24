import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { NewUserDTO } from './dtos/new-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from './dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserEntity, UserRepositoryInterface } from '@app/shared';
import { AuthServiceInterface } from './interfaces/auth.service.interface';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject('UsersRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly jwtService: JwtService,
  ) {}

  async getUsers() {
    return this.userRepository.findAll();
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findByCondition({
      where: {
        email,
      },
      select: ['firstName', 'lastName', 'email', 'password'],
    });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  /**
   * register
   */
  async register(newUser: Readonly<NewUserDTO>): Promise<UserEntity> {
    const { firstName, lastName, email, password } = newUser;
    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('An account with that email already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    const savedUser = await this.userRepository.save({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    delete savedUser.password;
    return savedUser;
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.findByEmail(email);
    const doesUserExist = !!user;

    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!doesPasswordMatch) return null;

    return user;
  }

  /**
   * Login
   */
  async login(loginUser: Readonly<LoginUserDTO>): Promise<{
    token: string;
  }> {
    const { email, password } = loginUser;
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;

    const jwt = await this.jwtService.signAsync({ user });

    return {
      token: jwt,
    };
  }

  /**
   * Verify JWT
   */
  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    if (!jwt) {
      throw new UnauthorizedException();
    }

    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
