import React from 'react';

import constants from '../constants';
import './SignatureContainer.scss';
import { BrandSignatureContainer } from './presentational-components';
import { createButtons } from './createSignatureButtons';
import { stripObject } from '../util';

import type { Profile } from '../types';

const withPlaceholder = (
  value: string | null | undefined,
  placeholder: string,
) =>
  value === '' || value === null || value === undefined ? placeholder : value;

interface SignatureContainerProps {
  profile: Profile;
}

const SignatureContainer = ({ profile }: SignatureContainerProps) => {
  const {
    name,
    pronoun,
    title,
    qualifications,
    twitter,
    mobile,
    email,
    addGPTW,
  } = profile;

  const placeholders = constants.placeholders;
  const brandInfo = constants.brandInfo;

  // The profile never holds brand fields, so they always come from brandInfo.
  const signatureProps = stripObject({
    title,
    qualifications,
    pronoun,
    twitter,
    phone: null,
    name: withPlaceholder(name, placeholders.name),
    mobile: withPlaceholder(mobile, placeholders.mobile),
    email: withPlaceholder(email, placeholders.email),
    addGPTW,
    brandLogo: brandInfo.brandLogo,
    brandName: brandInfo.brandName,
    brandLink: brandInfo.brandLink,
    brandLinkName: brandInfo.brandLinkName,
  });

  const buttons = createButtons(signatureProps, placeholders);

  const containerProps = {
    signatureProps,
    ...buttons,
  };

  return <BrandSignatureContainer {...containerProps} />;
};

export default SignatureContainer;
