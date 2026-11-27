export interface Profile {
  name: string;
  pronoun: string;
  title: string;
  email: string;
  phone: string;
  mobile: string;
  twitter: string;
  qualifications: string;
  addGPTW: boolean;
}

export interface BrandLogo {
  link: string;
  alt: string;
}

export interface BrandInfo {
  brandName: string;
  brandLink: string;
  brandLinkName: string;
  brandLinkColour: string;
  brandLogo: BrandLogo;
  brandGPTWLogo: BrandLogo;
}

export type Placeholders = Partial<Record<keyof Profile, string>>;

// The props each signature component and text builder receives: the profile
// with placeholders applied to name, mobile and email, plus the brand fields.
export interface SignatureProps {
  name: string;
  pronoun?: string;
  title?: string;
  qualifications?: string;
  mobile: string;
  email: string;
  twitter?: string;
  addGPTW?: boolean;
  brandLogo: BrandLogo;
  brandName: string;
  brandLink: string;
  brandLinkName: string;
}

export type CopyProps = SignatureProps & { placeholders: Placeholders };
