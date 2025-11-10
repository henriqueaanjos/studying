"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
exports.getRedis = getRedis;
exports.setRedis = setRedis;
const ioredis_1 = require("ioredis");
const util_1 = require("util");
exports.redisClient = new ioredis_1.default();
const syncRedisGet = (0, util_1.promisify)(exports.redisClient.get.bind(exports.redisClient));
const syncRedisSet = (0, util_1.promisify)(exports.redisClient.set.bind(exports.redisClient));
function getRedis(key) {
    return syncRedisGet(key);
}
function setRedis(key, value) {
    return syncRedisSet(key, value);
}
//# sourceMappingURL=redisConfig.js.map