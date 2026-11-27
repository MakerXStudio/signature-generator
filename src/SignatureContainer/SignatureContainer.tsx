import React from 'react';

import constants from '../constants';
import './SignatureContainer.scss';
import { BrandSignatureContainer } from './presentational-components';
import { createButtons } from './createSignatureButtons';
import { stripObject } from '../util';
import type { SignatureProps } from '../types';

import { useAppSelector } from '../hooks';

const assignPlaceholders = <K extends string>(
  props: Record<K, string>,
  placeholders: NoInfer<Record<K, string>>
): Record<K, string> => {
  const isBlank = (a: string | null | undefined) =>
    a === '' || a === null || a === undefined;
  const result = {} as Record<K, string>;
  for (const key of Object.keys(props) as K[]) {
    const value = props[key];
    result[key] = isBlank(value) ? placeholders[key] : value;
  }
  return result;
};

const SignatureContainer = () => {
  var profile = useAppSelector((state) => state.signature.profile);

  const {
    name,
    pronoun,
    title,
    qualifications,
    twitter,
    mobile,
    email,
    supportHotline,
    supportEmail,
    addGPTW,
  } = profile;

  const placeholders = constants.placeholders;
  const brandInfo = constants.brandInfo;

  // The profile has no brand fields, so the brand values always come from
  // brandInfo.
  const signatureProps: SignatureProps = stripObject({
    title,
    qualifications,
    pronoun,
    twitter,
    phone: null,
    ...assignPlaceholders(
      {
        name,
        mobile,
        email,
        supportHotline,
        supportEmail,
      },
      placeholders
    ),
    addGPTW,
    brandLogo: brandInfo.brandLogo,
    brandName: brandInfo.brandName,
    brandLink: brandInfo.brandLink,
    brandLinkName: brandInfo.brandLinkName,
  });

  const buttons = createButtons(signatureProps, placeholders);

  var containerProps = {
    signatureProps,
    ...buttons,
  };

  return <BrandSignatureContainer {...containerProps} />;
};

export default SignatureContainer;
