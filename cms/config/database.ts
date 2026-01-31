import path from 'path';
import type { EnvFn } from './_types';

type DatabaseClient = 'mysql' | 'postgres' | 'sqlite';

const databaseConfig = ({ env }: { env: EnvFn }) => {
  const client = env<DatabaseClient>('DATABASE_CLIENT', 'sqlite');
  const sqliteFilename = env<string>('DATABASE_FILENAME', '.tmp/data.db');

  const connections = {
    mysql: {
      connection: {
        host: env<string>('DATABASE_HOST', 'localhost'),
        port: env<number>('DATABASE_PORT', 3306),
        database: env<string>('DATABASE_NAME', 'strapi'),
        user: env<string>('DATABASE_USERNAME', 'strapi'),
        password: env<string>('DATABASE_PASSWORD', 'strapi'),
        ssl: env<boolean>('DATABASE_SSL', false) && {
          key: env<string | undefined>('DATABASE_SSL_KEY'),
          cert: env<string | undefined>('DATABASE_SSL_CERT'),
          ca: env<string | undefined>('DATABASE_SSL_CA'),
          capath: env<string | undefined>('DATABASE_SSL_CAPATH'),
          cipher: env<string | undefined>('DATABASE_SSL_CIPHER'),
          rejectUnauthorized: env<boolean>('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
      },
      pool: { min: env<number>('DATABASE_POOL_MIN', 2), max: env<number>('DATABASE_POOL_MAX', 10) },
    },
    postgres: {
      connection: {
        connectionString: env<string | undefined>('DATABASE_URL'),
        host: env<string>('DATABASE_HOST', 'localhost'),
        port: env<number>('DATABASE_PORT', 5432),
        database: env<string>('DATABASE_NAME', 'strapi'),
        user: env<string>('DATABASE_USERNAME', 'strapi'),
        password: env<string>('DATABASE_PASSWORD', 'strapi'),
        ssl: env<boolean>('DATABASE_SSL', false) && {
          key: env<string | undefined>('DATABASE_SSL_KEY'),
          cert: env<string | undefined>('DATABASE_SSL_CERT'),
          ca: env<string | undefined>('DATABASE_SSL_CA'),
          capath: env<string | undefined>('DATABASE_SSL_CAPATH'),
          cipher: env<string | undefined>('DATABASE_SSL_CIPHER'),
          rejectUnauthorized: env<boolean>('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
        schema: env<string>('DATABASE_SCHEMA', 'public'),
      },
      pool: { min: env<number>('DATABASE_POOL_MIN', 2), max: env<number>('DATABASE_POOL_MAX', 10) },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', '..', sqliteFilename),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env<number>('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};

export default databaseConfig;
