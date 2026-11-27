import constants from '../constants';
import { parseMobile } from '../util';
import type { SignatureProps } from '../types';

const brandInfo = constants.brandInfo;

export const buildSignatureText = (props: SignatureProps): string => {
  const { name, pronoun, title, qualifications, mobile, email, twitter } =
    props;
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
    mobileText ? `M ${mobileText}` : null,
    email ? `E ${email}` : null,
    twitter ? `T ${twitter}` : null,
    `W ${brandInfo.brandLinkName}`,
    '',
    'This email may contain confidential information.',
    "If I've sent it to you by accident, please delete it immediately.",
  ];

  return textArr.filter((val) => val !== null).join('\n');
};

export const buildRepliesAndForwardsText = (props: SignatureProps): string => {
  const { name, pronoun, title, mobile, email, twitter } = props;
  const mobileText = parseMobile(mobile).replace(/&nbsp;/g, ' ');

  const titleOptional = title ? ` | ${title}` : '';
  const pronounOptional = pronoun ? ` (${pronoun})` : '';
  const textArr = [
    '--',
    `${name}${pronounOptional} | ${brandInfo.brandName}${titleOptional}`,
    `M ${mobileText} | E ${email}${twitter ? ` | T ${twitter}` : ''} | W ${
      brandInfo.brandLinkName
    }`,
  ];

  return textArr.join('\n');
};
