import constants from '../constants';
import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js';

export function parseMobile(mobileNum: string): string;
export function parseMobile(mobileNum: undefined): null;
export function parseMobile(mobileNum: string | undefined): string | null {
  if (mobileNum === undefined) return null;

  if (
    !isValidPhoneNumber(mobileNum) &&
    !isValidPhoneNumber(constants.default.countryCode + mobileNum)
  )
    return mobileNum;
  if (mobileNum.search(/\+/) < 0) {
    mobileNum = constants.default.countryCode + mobileNum;
  }

  return parsePhoneNumber(mobileNum)?.formatInternational() ?? '';
}

// Keys whose type is exactly null are always removed; null is removed from the
// rest. Keys that may be undefined stay possibly undefined.
type StripNull<T> = {
  [K in keyof T as [T[K]] extends [null] ? never : K]: Exclude<T[K], null>;
};

export const stripObject = <T extends object>(obj: T): StripNull<T> =>
  Object.entries(obj)
    .filter(([, val]) => val !== null && val !== undefined)
    .reduce(
      (result, [key, val]) => Object.assign(result, { [key]: val }),
      {},
    ) as StripNull<T>;
