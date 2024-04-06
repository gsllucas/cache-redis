import { CacheAdapter } from '../adapters/interfaces/CacheAdapter';

export class CacheClient implements CacheAdapter {
  constructor(private cacheAdapter: CacheAdapter) {}

  async connect(): Promise<void> {
    await this.cacheAdapter.connect();
  }

  async disconnect(): Promise<void> {
    await this.cacheAdapter.disconnect();
  }

  async getCacheData(key: string): Promise<any> {
    const cacheData = await this.cacheAdapter.getCacheData(key);
    return cacheData;
  }

  async setCacheData(key: string, val: string): Promise<any> {
    const resultSetData = await this.cacheAdapter.setCacheData(key, val);
    return resultSetData;
  }
}
