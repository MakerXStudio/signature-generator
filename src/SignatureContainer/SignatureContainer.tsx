import { useDeferredValue, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { brandInfo, placeholders } from '../constants';
import { BrandSignatureContainer } from './presentational-components';
import { createButtons } from './createSignatureButtons';
import type { Profile } from '../types';

const valueOrPlaceholder = (
  value: string | undefined,
  placeholder: string,
): string =>
  value === undefined || value === null || value === '' ? placeholder : value;

const SignatureContainer = () => {
  const name = useWatch<Profile>({ name: 'name' }) as string;
  const pronoun = useWatch<Profile>({ name: 'pronoun' }) as string;
  const title = useWatch<Profile>({ name: 'title' }) as string;
  const qualifications = useWatch<Profile>({
    name: 'qualifications',
  }) as string;
  const mobile = useWatch<Profile>({ name: 'mobile' }) as string;
  const email = useWatch<Profile>({ name: 'email' }) as string;
  const twitter = useWatch<Profile>({ name: 'twitter' }) as string;
  const addGPTW = useWatch<Profile>({ name: 'addGPTW' }) as boolean;

  const liveProps = useMemo(
    () => ({
      name: valueOrPlaceholder(name, placeholders.name),
      pronoun,
      title,
      qualifications,
      mobile: valueOrPlaceholder(mobile, placeholders.mobile),
      email: valueOrPlaceholder(email, placeholders.email),
      twitter,
      addGPTW: !!addGPTW,
      brandLogo: brandInfo.brandLogo,
      brandName: brandInfo.brandName,
      brandLink: brandInfo.brandLink,
      brandLinkName: brandInfo.brandLinkName,
    }),
    [name, pronoun, title, qualifications, mobile, email, twitter, addGPTW],
  );

  const deferred = useDeferredValue(liveProps);
  const buttons = useMemo(() => createButtons(deferred), [deferred]);

  return <BrandSignatureContainer signatureProps={deferred} {...buttons} />;
};

export default SignatureContainer;
