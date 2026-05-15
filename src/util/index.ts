import { renderToStaticMarkup } from 'react-dom/server';
import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from 'libphonenumber-js';
import { createElement, type ComponentType, type ReactNode } from 'react';
import { brandInfo, defaultCountryCode } from '../constants';

export const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export const isValidEmail = (email: string | undefined): boolean =>
  !!email && EMAIL_REGEX.test(email);

export const parseMobile = (mobileNum: string | undefined): string | null => {
  if (mobileNum === undefined || mobileNum === '') return null;

  if (
    !isValidPhoneNumber(mobileNum) &&
    !isValidPhoneNumber(defaultCountryCode + mobileNum)
  ) {
    return mobileNum;
  }

  const withCountryCode =
    mobileNum.indexOf('+') < 0 ? defaultCountryCode + mobileNum : mobileNum;

  const parsed = parsePhoneNumberFromString(withCountryCode);
  return parsed ? parsed.formatInternational() : mobileNum;
};

const writeTextToClipboard = async (text: string): Promise<boolean> => {
  if (!navigator.clipboard) {
    console.warn('Clipboard API unavailable (insecure context?)');
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.warn('Clipboard writeText failed', err);
    return false;
  }
};

const writeHtmlToClipboard = async (
  html: string,
  text: string,
): Promise<boolean> => {
  if (!navigator.clipboard?.write || typeof ClipboardItem === 'undefined') {
    console.warn('Rich clipboard API unavailable');
    return false;
  }
  try {
    const item = new ClipboardItem({
      'text/html': new Blob([html], { type: 'text/html' }),
      'text/plain': new Blob([text], { type: 'text/plain' }),
    });
    await navigator.clipboard.write([item]);
    return true;
  } catch (err) {
    console.warn('Clipboard write failed', err);
    return false;
  }
};

export interface SignatureTextProps {
  name?: string;
  pronoun?: string;
  title?: string;
  qualifications?: string;
  mobile?: string;
  email?: string;
  twitter?: string;
  isSupport?: boolean;
  supportHotline?: string;
  supportEmail?: string;
}

export const copySignatureText = (props: SignatureTextProps): Promise<boolean> => {
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
  const mobileFormatted = parseMobile(mobile);
  const mobileText = mobileFormatted ?? '';

  const textArr: (string | null)[] = [
    '--',
    '',
    `${name ? name : ''}${pronounOptional}`,
    brandInfo.brandName,
    title ? title : null,
    qualifications ? qualifications : null,
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

  return writeTextToClipboard(
    textArr.filter((val): val is string => val !== null).join('\n'),
  );
};

export const copyRepliesAndForwardsText = (
  props: SignatureTextProps,
): Promise<boolean> => {
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
  const mobileFormatted = parseMobile(mobile);
  const mobileText = mobileFormatted ?? '';

  const titleOptional = title ? ` | ${title}` : '';
  const pronounOptional = pronoun ? ` (${pronoun})` : '';
  const textArr: (string | null)[] = [
    '--',
    `${name ?? ''}${pronounOptional} | ${brandInfo.brandName}${titleOptional}`,
    `M ${mobileText} | E ${email ?? ''}${
      twitter ? ` | T ${twitter}` : ''
    } | W ${brandInfo.brandLinkName}`,
    isSupport
      ? `Support hotline ${supportHotline} | Support email ${supportEmail}`
      : null,
  ];

  return writeTextToClipboard(
    textArr.filter((val): val is string => val !== null).join('\n'),
  );
};

export const copySignature = <P extends Record<string, unknown>>(
  props: P,
  SignatureComponent: ComponentType<P>,
): Promise<boolean> => {
  const node: ReactNode = createElement(SignatureComponent, props);
  const html = renderToStaticMarkup(node);
  return writeHtmlToClipboard(html, html.replace(/<[^>]+>/g, ''));
};

export const stripObject = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
  const result: Partial<T> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined) {
      (result as Record<string, unknown>)[key] = value;
    }
  }
  return result;
};
