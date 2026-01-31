import type { StrapiConfigContext } from './_types';

const serverConfig = ({ env }: StrapiConfigContext) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});

export default serverConfig;
