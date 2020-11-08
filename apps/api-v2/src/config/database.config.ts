import { registerAs } from '@nestjs/config';
import * as knex from 'knex';
import * as path from 'path';

export interface DatabaseConfig extends knex.Config {}

export const databaseConfig = registerAs(
  'database',
  (): DatabaseConfig => ({
    client: process.env.DATABASE_CLIENT,
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
    migrations: {
      tableName: process.env.DATABASE_MIGRATIONS_TABLE,
      directory: path.join(path.dirname(__filename), 'migrations'),
    },
  })
);
