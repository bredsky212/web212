import path from 'path';

type StrapiEnv = {
  (key: string, defaultValue?: unknown): unknown;
  bool: (key: string, defaultValue?: boolean) => boolean;
  int: (key: string, defaultValue?: number) => number;
};

export default ({ env }: { env: StrapiEnv }) => {
  const client = String(env('DATABASE_CLIENT', 'postgres'));
  const sslEnabled = env.bool('DATABASE_SSL', false);

  const connection =
    client === 'sqlite'
      ? {
          filename: path.join(
            __dirname,
            '..',
            '..',
            String(env('DATABASE_FILENAME', '.tmp/data.db'))
          ),
        }
      : {
          host: String(env('DATABASE_HOST', 'postgres')),
          port: env.int('DATABASE_PORT', 5432),
          database: String(env('DATABASE_NAME', 'strapi')),
          user: String(env('DATABASE_USERNAME', 'strapi')),
          password: String(env('DATABASE_PASSWORD', 'strapi')),
          ssl: sslEnabled
            ? { rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true) }
            : false,
        };

  return {
    connection: {
      client,
      connection,
      pool: {
        min: env.int('DATABASE_POOL_MIN', 0),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
    },
  };
};
