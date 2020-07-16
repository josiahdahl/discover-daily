import { createClient, RedisClient } from 'redis';
import { promisify } from 'util';

const redisClient = createClient(parseInt(process.env.REDIS_PORT, 10), process.env.REDIS_HOST, { password: process.env.REDIS_PASSWORD });

export function asyncClient(method: keyof RedisClient, ...args) {
  const maybeFunction = redisClient[method];
  console.log(`Calling redis.${method}`);
  if (typeof maybeFunction === 'function') {
    return promisify(maybeFunction).bind(redisClient).apply(null, args);
  }
  throw new Error('The key passed is not a function on the Redis Client');
}
