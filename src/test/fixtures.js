import constants from '../constants';

const { brandLogo, brandName, brandLink, brandLinkName } = constants.brandInfo;
const { placeholders } = constants;

// The brand props SignatureContainer merges in from constants.brandInfo.
const brand = { brandLogo, brandName, brandLink, brandLinkName };

const allFields = {
  ...brand,
  name: 'Ada Lovelace',
  pronoun: 'she/her',
  title: 'Chief Engineer',
  qualifications: 'PhD | PSM I',
  mobile: '0412 345 678',
  email: 'ada.lovelace@makerx.com.au',
  twitter: 'adalovelace',
};

// Each key is part of its golden file names.
export const fixtures = {
  'all-fields-gptw': { ...allFields, addGPTW: true },
  'minimal-placeholders': {
    ...brand,
    name: placeholders.name,
    mobile: placeholders.mobile,
    email: placeholders.email,
  },
  'pronoun-twitter-at-nz-mobile': {
    ...brand,
    name: 'Kiri Te Kanawa',
    pronoun: 'she/her',
    mobile: '+64 21 123 4567',
    email: 'kiri@makerx.com.au',
    twitter: '@kiri',
  },
  'twitter-without-at': {
    ...brand,
    name: 'Alan Turing',
    mobile: '0412 345 678',
    email: 'alan@makerx.com.au',
    twitter: 'alanturing',
  },
  'invalid-mobile': {
    ...brand,
    name: 'Grace Hopper',
    mobile: '12345',
    email: 'grace@makerx.com.au',
  },
  'html-escaped-name': {
    ...brand,
    name: 'Bobby <b>"Tables"</b> & O\'Brien',
    mobile: '0412 345 678',
    email: 'bobby@makerx.com.au',
  },
  'markup-in-mobile': {
    ...brand,
    name: 'Mallory',
    mobile: '<em>call me</em>',
    email: 'mallory@makerx.com.au',
  },
  'gptw-off': { ...allFields, addGPTW: false },
};

// Keyed by input id suffix (`#input-<key>`). Must match filledProfile in
// e2e/clipboard.spec.mjs.
export const filledProfile = {
  name: 'Ada Lovelace',
  pronoun: 'she/her',
  title: 'Chief Engineer',
  qualifications: 'PhD | PSM I',
  mobile: '0412 345 678',
  email: 'ada.lovelace@makerx.com.au',
  twitter: '@adalovelace',
};
