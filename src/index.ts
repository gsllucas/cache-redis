import { config } from 'dotenv';
import { RedisCacheAdapter } from './infra/adapters/RedisCacheAdapter';
import { GetPublicGithubReposByUser } from './application/GetPublicGithubReposByUser';
import { FetchAppGateway } from './infra/gateway/FetchAppGateway';

config();

const fetchAppGateway = new FetchAppGateway();
const redisCacheAdapter = new RedisCacheAdapter();

await redisCacheAdapter.connect();

const getPublicGithubReposByUser = new GetPublicGithubReposByUser(
  redisCacheAdapter,
  fetchAppGateway
);

const reposByUser = await getPublicGithubReposByUser.execute('gsllucas');
console.log(reposByUser);
