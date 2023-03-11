const STRONG_PASSWORD_REGEX = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
);
const MEDIUM_PASSWORD_REGEX = new RegExp(
  "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
);

export const isPasswordSame = (
  password: string,
  cfmPassword: string
): boolean => {
  return password === cfmPassword;
};

export enum passwordStrengthOptions {
  "STRONG" = 1,
  "MEDIUM" = 2,
  "WEAK" = 3,
}
export const passwordStrengthCheck = (
  password: string
): passwordStrengthOptions => {
  if (STRONG_PASSWORD_REGEX.test(password))
    return passwordStrengthOptions.STRONG;
  if (MEDIUM_PASSWORD_REGEX.test(password))
    return passwordStrengthOptions.MEDIUM;
  return passwordStrengthOptions.WEAK;
};
