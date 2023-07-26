import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: string) {
    console.log(`GET ${key} from REDIS 🔴`);
    return await this.cache.get(key);
  }

  async set<T>(key: string, value: T) {
    console.log(`SET ${key} to REDIS 🔴`);
    await this.cache.set(key, value);
  }

  async del(key: string) {
    await this.cache.del(key);
  }
}
