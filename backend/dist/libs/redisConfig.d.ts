import Redis from 'ioredis';
export declare const redisClient: Redis;
export declare function getRedis(key: string): Promise<string | null>;
export declare function setRedis(key: string, value: string): Promise<"OK">;
