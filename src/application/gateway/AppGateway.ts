export interface AppGatewayOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  body?: any;
  headers?: Headers;
}

export declare abstract class AppGateway {
  fetchData<T>(options: AppGatewayOptions): Promise<T>;
}
