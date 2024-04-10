export interface CacheAdapter {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getCacheData<T>(key: string): Promise<T>;
  setCacheData(key: string, val: string): Promise<any>;
}
