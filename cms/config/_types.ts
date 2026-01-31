export type EnvFn = {
  (key: string, defaultValue?: unknown): unknown;
  bool: (key: string, defaultValue?: boolean) => boolean;
  int: (key: string, defaultValue?: number) => number;
  array: (key: string, defaultValue?: string[]) => string[];
};
export type StrapiConfigContext = { env: EnvFn };