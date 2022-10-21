export type GetCompanyKeysResponse = {
  keys: {
    public_key: string;
    secret_key: string;
  };
  report: string;
  otp: string;
};
export type GetThemeCompanyResponse = {
  primary_color?: string;
  secondary_color?: string;
  dark_mode?: boolean;
};
export type AnaliceIDResponse =
  | {
      type: string;
      image: string;
    }
  | string;
