import type { SignatureProps } from './Signature';
import { brandInfo } from '../constants';

export const signatureFixture: SignatureProps = {
  name: 'Alice Example',
  pronoun: 'she/her',
  title: 'Senior Maker',
  qualifications: 'PSM I',
  mobile: '+61411222333',
  email: 'alice@makerx.com.au',
  twitter: 'aliceX',
  brandLogo: brandInfo.brandLogo,
  brandLink: brandInfo.brandLink,
  brandLinkName: brandInfo.brandLinkName,
  addGPTW: true,
};
