export interface CacheAdapter {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getCacheData(key: string): Promise<any>;
  setCacheData(key: string, val: string): Promise<any>;
}
