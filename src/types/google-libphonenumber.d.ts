declare module 'google-libphonenumber' {
  export class PhoneNumberUtil {
    static getInstance(): PhoneNumberUtil;
    parse(phoneNumber: string, regionCode?: string): PhoneNumber;
    isValidNumber(phoneNumber: PhoneNumber): boolean;
    getRegionCodeForNumber(phoneNumber: PhoneNumber): string | null;
  }

  export class PhoneNumber {
    getCountryCode(): number;
    getNationalNumber(): number;
  }
}
