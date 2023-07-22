import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewUserDTO } from './dtos/new-user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers() {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        email,
      },
      select: ['firstName', 'lastName', 'email', 'password'],
    });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(newUser: Readonly<NewUserDTO>): Promise<UserEntity> {
    const { firstName, lastName, email, password } = newUser;
    const existingUser = this.findByEmail(email);

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
}
