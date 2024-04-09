import {
  AppGateway,
  AppGatewayOptions,
} from '../../application/gateway/AppGateway';

export class FetchAppGateway implements AppGateway {
  async fetchData<T>({
    endpoint,
    method,
    body,
    headers,
  }: AppGatewayOptions): Promise<T> {
    const responseData = await fetch(endpoint, { method, body, headers });
    const jsonData = await responseData.json();
    return jsonData;
  }
}
