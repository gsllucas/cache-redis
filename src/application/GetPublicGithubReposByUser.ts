import { CacheAdapter } from '../adapters/CacheAdapter';
import { stringifyJSON } from '../util/functions/stringifyJSON';
import { RequestMeasurerHelper } from '../util/helpers/RequestMeasurerHelper';
import { AppGateway } from './gateway/AppGateway';

export class GetPublicGithubReposByUserOptions {
  cacheAdapter: CacheAdapter;
  appGateway: AppGateway;
}

export class GetPublicGithubReposByUser {
  private appGateway: AppGateway;
  private cacheAdapter: CacheAdapter;
  private requestMeasurer: RequestMeasurerHelper;

  constructor({ appGateway, cacheAdapter }: GetPublicGithubReposByUserOptions) {
    this.appGateway = appGateway;
    this.cacheAdapter = cacheAdapter;
    this.requestMeasurer = new RequestMeasurerHelper();
  }

  async execute(user: string) {
    if (!user) throw new Error('A valid user must be provided');

    this.requestMeasurer.markTime({
      type: 'start',
      date: new Date(),
    });

    const key = `${user}:repos`;
    const cacheData = await this.cacheAdapter.getCacheData(key);

    if (cacheData) {
      const milliseconds = this.requestMeasurer.markTime({
        type: 'end',
        date: new Date(),
      });
      return { strategy: 'cache', milliseconds, data: cacheData };
    }

    const URI = `https://api.github.com/users/${user}/repos`;
    const responseData = await this.appGateway.fetchData({
      endpoint: URI,
      method: 'GET',
    });
    await this.cacheAdapter.setCacheData(key, stringifyJSON(responseData));

    const milliseconds = this.requestMeasurer.markTime({
      type: 'end',
      date: new Date(),
    });

    return {
      strategy: 'http',
      milliseconds,
      data: stringifyJSON(responseData),
    };
  }
}
