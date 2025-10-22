import { redis } from '../config/redis.js';

export const storeRefreshToken = async (userId, refreshToken) => {
    await redis.set(
        `refresh_token:${userId}`,
        refreshToken,
        {
            ex: 604800,
            nx: true
        }
    );
};
