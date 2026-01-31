import type { EnvFn } from './_types';

const serverConfig = ({ env }: { env: EnvFn }) => {
  const appKeys = env<string>('APP_KEYS', '')
    .split(',')
    .map((key) => key.trim())
    .filter(Boolean);

  return {
    host: env<string>('HOST', '0.0.0.0'),
    port: env<number>('PORT', 1337),
    app: {
      keys: appKeys,
    },
  };
};

export default serverConfig;
