import { forwardRef, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisCacheService } from '../services/redis.service';

@Module({
  imports: [
    forwardRef(() =>
      CacheModule.registerAsync({
        useFactory: async (configService: ConfigService) => ({
          store: await redisStore({
            url: configService.get('REDIS_URI'),
          }),
        }),
        isGlobal: true,
        inject: [ConfigService],
      }),
    ),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisModule {}
