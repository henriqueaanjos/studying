import Redis from 'ioredis';
import { promisify } from 'util';

export const redisClient = new Redis();

const syncRedisGet: (key: string) => Promise<string | null> = promisify(
  redisClient.get.bind(redisClient),
);
const syncRedisSet: (key: string, value: string) => Promise<'OK'> = promisify(
  redisClient.set.bind(redisClient),
);

export function getRedis(key: string) {
  return syncRedisGet(key);
}

export function setRedis(key: string, value: string) {
  return syncRedisSet(key, value);
}
