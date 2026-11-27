import React from 'react';
import type { ComponentType } from 'react';
import constants from '../constants';
import type { Placeholders } from '../constants';
import type { SignatureProps } from '../types';
import ReactDOMServer from 'react-dom/server';
import {
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from 'react-phone-number-input';
import type { Value as PhoneNumber } from 'react-phone-number-input';

const brandInfo = constants.brandInfo;

const multiSplice = (toAddIndexes: number[], val: string, array: string[]) =>
  toAddIndexes.forEach((index) => array.splice(index, 0, val));

export const camelize = (str: string) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index: number) {
    if (+match === 0) return '';
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

export function parseMobile(mobileNum: string): string;
export function parseMobile(mobileNum: undefined): null;
export function parseMobile(mobileNum: string | undefined): string | null {
  if (mobileNum === undefined) return null;

  // some random number, trust the user
  if (
    !isValidPhoneNumber(mobileNum) &&
    !isValidPhoneNumber(constants.default.countryCode + mobileNum)
  )
    return mobileNum;
  // default to preset country code when the international prefix '+' is absence
  if (mobileNum.search(/\+/) < 0) {
    mobileNum = constants.default.countryCode + mobileNum;
  }

  return formatPhoneNumberIntl(mobileNum as PhoneNumber);
}

export const parseLandLine = (mobileNum: string | undefined) => {
  if (mobileNum === undefined) return null;

  const mobileFormatted = mobileNum.replace(/[\s|+]/g, '');
  const numberArr = mobileFormatted.split('');
  if (mobileFormatted.length === 8) {
    numberArr.splice(4, 0, '&nbsp;');
  } else if (mobileFormatted.length === 11) {
    multiSplice([2, 4, 9], '&nbsp;', numberArr);
    numberArr.splice(0, 0, '+');
  } else {
    return mobileNum;
  }
  return numberArr.join('');
};

const copyText = (text: string) => {
  const container = document.createElement('textarea');
  container.value = text;
  document.body.appendChild(container);
  container.select();
  document.execCommand('copy');
  document.body.removeChild(container);
};

export type CopyProps = SignatureProps & { placeholders: Placeholders };

export const copySignatureText = (props: CopyProps) => {
  const {
    name,
    pronoun,
    title,
    qualifications,
    mobile,
    email,
    twitter,
    isSupport,
    supportHotline,
    supportEmail,
  } = props;
  const pronounOptional = pronoun ? ` (${pronoun})` : '';
  const mobileText = parseMobile(mobile).replace(/&nbsp;/g, ' ');

  const textArr = [
    '--',
    '',
    `${name ? name : null}${pronounOptional}`,
    brandInfo.brandName,
    title ? title : null,
    qualifications ? `${qualifications}` : null,
    '',
    mobileText
      ? `M ${mobileText}${
          isSupport ? ` | Support hotline ${supportHotline}` : ''
        }`
      : null,
    email
      ? `E ${email}${isSupport ? ` | Support email ${supportEmail}` : ''}`
      : null,
    twitter ? `T ${twitter}` : null,
    `W ${brandInfo.brandLinkName}`,
    '',
    'This email may contain confidential information.',
    "If I've sent it to you by accident, please delete it immediately.",
  ];

  copyText(textArr.filter((val) => val !== null).join('\n'));
};

export const copyRepliesAndForwardsText = (props: CopyProps) => {
  const {
    name,
    pronoun,
    title,
    mobile,
    email,
    twitter,
    isSupport,
    supportHotline,
    supportEmail,
  } = props;
  const mobileText = parseMobile(mobile).replace(/&nbsp;/g, ' ');

  const titleOptional = title ? ` | ${title}` : '';
  const pronounOptional = pronoun ? ` (${pronoun})` : '';
  const textArr = [
    '--',
    `${name}${pronounOptional} | ${brandInfo.brandName}${titleOptional}`,
    `M ${mobileText} | E ${email}${twitter ? ` | T ${twitter}` : ''} | W ${
      brandInfo.brandLinkName
    }`,
    isSupport
      ? `Support hotline ${supportHotline} | Support email ${supportEmail}`
      : null,
  ];

  copyText(textArr.filter((val) => val !== null).join('\n'));
};

export const copySignature = (
  props: CopyProps,
  SignatureComponent: ComponentType<CopyProps>
) => {
  // You need to copy the signature as richtext html if you want it to paste nicely into outlook
  // credit: https://stackoverflow.com/questions/34191780/javascript-copy-string-to-clipboard-as-text-html
  const html = ReactDOMServer.renderToStaticMarkup(
    <SignatureComponent {...props} />
  );

  const container = document.createElement('div');
  container.innerHTML = html;

  container.style.position = 'fixed';
  container.style.pointerEvents = 'none';
  container.style.opacity = '0';

  document.body.appendChild(container);

  window.getSelection()!.removeAllRanges();

  const range = document.createRange();
  range.selectNode(container);
  window.getSelection()!.addRange(range);

  document.execCommand('copy');

  document.body.removeChild(container);
};

// Drops the null and undefined values; keys typed as only null or undefined
// are dropped from the type too.
type Stripped<T> = {
  [K in keyof T as T[K] extends null | undefined ? never : K]: T[K];
};

export const stripObject = <T extends object>(obj: T): Stripped<T> =>
  Object.entries(obj)
    .filter(([, val]) => val !== null && val !== undefined)
    .reduce(
      (result, [key, val]) => Object.assign(result, { [key]: val }),
      {} as Stripped<T>
    );
