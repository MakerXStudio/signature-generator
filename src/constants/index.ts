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

export interface Placeholders {
  name: string;
  pronoun: string;
  title: string;
  email: string;
  mobile: string;
  twitter: string;
  qualifications: string;
  supportHotline: string;
  supportEmail: string;
}

export const brandInfo: BrandInfo = {
  brandName: 'MakerX',
  brandLink: 'https://makerx.com.au/',
  brandLinkName: 'makerx.com.au',
  brandLinkColour: '#003FB5',
  brandLogo: {
    link: 'https://makerxsignatures.blob.core.windows.net/images/MakerX-Full-Logo-Black.jpg',
    alt: 'MakerX',
  },
  brandGPTWLogo: {
    link: 'https://makerxsignatures.blob.core.windows.net/images/GPTW-Best-Workplaces-Current.png',
    alt: 'MakerX Best Workplaces',
  },
};

export const placeholders: Placeholders = {
  name: 'Your Name',
  pronoun: 'he/him | she/her | they/them',
  title: 'Job Title',
  email: 'your.name@makerx.com.au',
  mobile: '+61 111 222 333',
  twitter: 'myTwitterHandle',
  qualifications: 'Jedi Master | PSM I',
  supportHotline: '1800 xyz xyz',
  supportEmail: 'support@some.domain',
};

export const defaultCountryCode = '+61';
