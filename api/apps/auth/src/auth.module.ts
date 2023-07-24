import {
  PostgresDBModule,
  SharedModule,
  SharedService,
  UserEntity,
  UsersRepository,
} from '@app/shared';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './guard/jwt.guard';
import { JwtStrategy } from './strategy/jwt-strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '3600s',
        },
      }),
      inject: [ConfigService],
    }),
    SharedModule,
    PostgresDBModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtGuard,
    JwtStrategy,
    {
      provide: 'AuthServiceInterface',
      useClass: AuthService,
    },
    {
      provide: 'UsersRepositoryInterface',
      useClass: UsersRepository,
    },
    {
      provide: 'SharedServiceInterface',
      useClass: SharedService,
    },
  ],
})
export class AuthModule {}
