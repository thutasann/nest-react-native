import { UserEntity } from '@app/shared';
import { LoginUserDTO } from '../dtos/login-user.dto';
import { NewUserDTO } from '../dtos/new-user.dto';

export interface AuthServiceInterface {
  getUsers(): Promise<UserEntity[]>;
  findByEmail(email: string): Promise<UserEntity>;
  hashPassword(password: string): Promise<string>;
  register(newUser: Readonly<NewUserDTO>): Promise<UserEntity>;
  doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean>;
  validateUser(email: string, password: string): Promise<UserEntity>;
  login(loginUser: Readonly<LoginUserDTO>): Promise<{ token: string }>;
  verifyJwt(jwt: string): Promise<{ exp: number }>;
}
