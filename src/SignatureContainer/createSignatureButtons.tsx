import {
  copyRepliesAndForwardsText,
  copySignature,
  copySignatureText,
} from '../util';
import Signature, { type SignatureProps } from '../Signature/Signature';
import RepliesAndForwards, {
  type RepliesAndForwardsProps,
} from '../RepliesAndForwards/RepliesAndForwards';
import Button from '../Button/Button';
import type * as React from 'react';
import type { ReactElement } from 'react';

export interface SignatureButtons {
  CopySignatureText: ReactElement;
  CopySignatureHtml: ReactElement;
  CopyRepliesAndForwardsText: ReactElement;
  CopyRepliesAndForwardsHtml: ReactElement;
}

const buttonMaker = (
  clickHandler: () => Promise<boolean>,
  isText: boolean,
): ReactElement => {
  const textBefore = isText ? 'Copy text only' : 'Copy signature';
  return (
    <Button
      onClickHandler={clickHandler}
      colorBefore="primary"
      colorAfter="success"
      textBefore={textBefore}
      textAfter="Copied!"
    />
  );
};

export const createButtons = (
  signatureProps: SignatureProps & RepliesAndForwardsProps,
): SignatureButtons => {
  return {
    CopySignatureText: buttonMaker(
      () => copySignatureText(signatureProps),
      true,
    ),
    CopySignatureHtml: buttonMaker(
      () =>
        copySignature(
          signatureProps as unknown as Record<string, unknown>,
          Signature as unknown as React.ComponentType<Record<string, unknown>>,
        ),
      false,
    ),
    CopyRepliesAndForwardsText: buttonMaker(
      () => copyRepliesAndForwardsText(signatureProps),
      true,
    ),
    CopyRepliesAndForwardsHtml: buttonMaker(
      () =>
        copySignature(
          signatureProps as unknown as Record<string, unknown>,
          RepliesAndForwards as unknown as React.ComponentType<
            Record<string, unknown>
          >,
        ),
      false,
    ),
  };
};
