import { RedisClientType, createClient } from 'redis';
import { CacheAdapter } from './interfaces/CacheAdapter';
import RedisClient from '@redis/client/dist/lib/client';

export class RedisCacheAdapter implements CacheAdapter {
  private redisClient: RedisClientType<any, any, any>;

  async connect(): Promise<void> {
    const REDIS_HOST = process.env.REDIS_HOST ?? 'redis://localhost:6379';
    console.log(
      'process.env.REDISCLI_AUTH',
      process.env.REDISCLI_AUTH,
      process.env.REDIS_USER
    );
    const client = createClient({
      url: REDIS_HOST,
      username: process.env.REDIS_USER,
      password: process.env.REDISCLI_AUTH,
    });
    const connection = await client.connect();
    this.redisClient = connection;
  }

  async disconnect(): Promise<void> {
    await this.redisClient.disconnect();
  }

  async getCacheData(key: string): Promise<any> {
    const cacheData = await this.redisClient.get(key);
    return cacheData;
  }

  async setCacheData(key: string, val: string): Promise<any> {
    const resultSetData = await this.redisClient.set(key, val);
    return resultSetData;
  }
}
