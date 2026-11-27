import type { BrandInfo, Placeholders } from '../types';

const constants = {
  brandInfo: {
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
  } satisfies BrandInfo,

  placeholders: {
    name: 'Your Name',
    pronoun: 'he/him | she/her | they/them',
    title: 'Job Title',
    email: 'your.name@makerx.com.au',
    mobile: '+61 111 222 333',
    twitter: 'myTwitterHandle',
    qualifications: 'Jedi Master | PSM I',
  } satisfies Placeholders,

  default: {
    countryCode: '+61',
  },
} satisfies {
  brandInfo: BrandInfo;
  placeholders: Placeholders;
  default: { countryCode: string };
};

export default constants;
