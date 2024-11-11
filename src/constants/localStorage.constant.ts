const version = "v1";

export const localStorageKey = {
  accessToken: `accessToken_${version}`,
  refreshToken: `refreshToken_${version}`,
  exp: `exp_${version}`,
} as const;
