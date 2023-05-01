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

export const isPasswordValid = (password: string, cfmPassword: string) => {
  if (!isPasswordSame(password, cfmPassword))
    throw new Error("Passwords are not the same!");
  if (passwordStrengthCheck(password) !== passwordStrengthOptions.STRONG)
    throw new Error(
      "Passwords are not complex enough! Password must contain alphabets, numbers & symbols"
    );
};

export const emailRegex = new RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export const isEmailValid = (email: string) => {
  if (!emailRegex.test(email))
    throw new Error(
      "Email entered is not valid! Email should be something like this: example@email.com"
    );
};
export const isFieldsEmpty = (fields: string[]) => {
  const isAllNotEmpty = fields.every((item) => item !== "");
  if (isAllNotEmpty) return;
  throw new Error("Some fields are left empty, please fill in all fields!");
};
