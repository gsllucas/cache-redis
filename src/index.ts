import { config } from 'dotenv';
import { randomUUID } from 'crypto';
import { CacheClient } from './services/CacheClient';
import { RedisCacheAdapter } from './adapters/RedisCacheAdapter';
import { stringifyJSON } from './util/functions/stringifyJSON';

config();

const redisCacheAdapter = new RedisCacheAdapter();
const cacheClient = new CacheClient(redisCacheAdapter);

await cacheClient.connect();

async function setCacheData() {
  const resultData = await cacheClient.setCacheData(
    'data_items:1',
    stringifyJSON({
      id: 1,
      items: [
        { id: randomUUID(), name: '01' },
        { id: randomUUID(), name: '02' },
        { id: randomUUID(), name: '03' },
      ],
    })
  );
  console.log('resultData', resultData);
}

async function getCacheData() {
  const cacheData = await cacheClient.getCacheData('data_items:1');
  console.log('cacheData', cacheData);
}

await setCacheData();
await getCacheData();
