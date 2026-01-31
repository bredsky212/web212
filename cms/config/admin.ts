import type { EnvFn } from './_types';

const adminConfig = ({ env }: { env: EnvFn }) => ({
  auth: {
    secret: env<string>('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env<string>('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env<string>('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env<string>('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env<boolean>('FLAG_NPS', true),
    promoteEE: env<boolean>('FLAG_PROMOTE_EE', true),
  },
});

export default adminConfig;
