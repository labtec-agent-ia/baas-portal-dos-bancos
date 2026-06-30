import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

// Configuração para conectar ao Postgres no Docker
// Note que a porta mapeada no localhost é 5444
export const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgresql://baas_user:secure_password_123@localhost:5444/baas_portal',
  pool: { min: 2, max: 10 }
});
