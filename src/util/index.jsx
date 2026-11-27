import React from 'react';
import constants from '../constants';
import ReactDOMServer from 'react-dom/server';
import {
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from 'react-phone-number-input';

const brandInfo = constants.brandInfo;

export const parseMobile = (mobileNum) => {
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

  return formatPhoneNumberIntl(mobileNum);
};

const copyText = (text) => {
  const container = document.createElement('textarea');
  container.value = text;
  document.body.appendChild(container);
  container.select();
  document.execCommand('copy');
  document.body.removeChild(container);
};

export const copySignatureText = (props) => {
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

  copyText(textArr.filter((val) => val !== null).join('\n'));
};

export const copyRepliesAndForwardsText = (props) => {
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

  copyText(textArr.filter((val) => val !== null).join('\n'));
};

export const copySignature = (props, SignatureComponent) => {
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

  window.getSelection().removeAllRanges();

  const range = document.createRange();
  range.selectNode(container);
  window.getSelection().addRange(range);

  document.execCommand('copy');

  document.body.removeChild(container);
};

export const stripObject = (obj) =>
  Object.entries(obj)
    .filter(([key, val]) => val !== null && val !== undefined)
    .reduce((result, [key, val]) => Object.assign(result, { [key]: val }), {});
