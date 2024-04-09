import { config } from 'dotenv';
import { RedisCacheAdapter } from './application/adapters/RedisCacheAdapter';
import { GetPublicGithubReposByUser } from './application/GetPublicGithubReposByUser';
import { FetchAppGateway } from './infra/gateway/FetchAppGateway';

config();

const fetchAppGateway = new FetchAppGateway();
const redisCacheAdapter = new RedisCacheAdapter();

await redisCacheAdapter.connect();

const getPublicGithubReposByUser = new GetPublicGithubReposByUser({
  appGateway: fetchAppGateway,
  cacheAdapter: redisCacheAdapter,
});

const githubUser = 'gsllucas';
const reposByUser = await getPublicGithubReposByUser.execute(githubUser);
console.log(reposByUser);
