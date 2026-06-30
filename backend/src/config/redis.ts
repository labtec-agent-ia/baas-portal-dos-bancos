import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = Number(process.env.REDIS_PORT) || 6399;

export const redis = new Redis({
  host: redisHost,
  port: redisPort,
});

redis.on('connect', () => {
  console.log(`🟢 Redis conectado na porta ${redisPort}`);
});

redis.on('error', (err) => {
  console.error('🔴 Erro na conexão com Redis:', err);
});
