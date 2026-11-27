import type { Placeholders } from './constants';

// addGPTW stays unset until the checkbox is first toggled.
export type Profile = { -readonly [K in keyof Placeholders]: string } & {
  addGPTW?: boolean;
};

export type BrandLogo = {
  readonly link: string;
  readonly alt: string;
};

export type SignatureProps = {
  name: string;
  pronoun?: string;
  title?: string;
  qualifications?: string;
  mobile: string;
  email: string;
  twitter?: string;
  supportHotline: string;
  supportEmail: string;
  addGPTW?: boolean;
  isSupport?: boolean;
  brandLogo: BrandLogo;
  brandName: string;
  brandLink: string;
  brandLinkName: string;
};
