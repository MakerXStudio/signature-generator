import type { Placeholders } from './constants';

// The profile held in the store: one string per placeholder (all start
// blank) plus the Add GPTW checkbox, which is only set once it is toggled.
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
