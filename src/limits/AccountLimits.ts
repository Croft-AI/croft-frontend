export enum BasicAccountLimits {
  IMPRESSIONS = 20,
  SCHEDULES = 3,
}

export enum PremiumAccountLimits {
  IMPRESSIONS = 50,
  SCHEDULES = 10,
}

export enum AccountTypes {
  BASIC = "BASIC",
  PREMIUM = "PREMIUM",
}

export const AccountIs = {
  [AccountTypes.BASIC]: BasicAccountLimits,
  [AccountTypes.PREMIUM]: PremiumAccountLimits,
};
