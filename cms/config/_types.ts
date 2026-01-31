// Shared typing for Strapi config env() helper.
// Generic allows env<string>(..., default) and inference from default value.
export type EnvFn = <T = unknown>(key: string, defaultValue?: T) => T;
