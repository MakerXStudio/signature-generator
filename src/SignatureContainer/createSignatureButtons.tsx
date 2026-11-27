import React, { type ReactElement } from 'react';

import {
  copyRepliesAndForwardsText,
  copySignature,
  copySignatureText,
} from '../util';
import Signature from '../Signature/Signature';
import RepliesAndForwards from '../RepliesAndForwards/RepliesAndForwards';
import Button from '../Button/Button';
import type { Placeholders, SignatureProps } from '../types';

type ButtonName =
  | 'CopySignatureText'
  | 'CopySignatureHtml'
  | 'CopyRepliesAndForwardsText'
  | 'CopyRepliesAndForwardsHtml';

const buttonMaker = (clickHandler: () => void, isText: boolean) => {
  const isSuccessClass = 'button is-success';
  const copiedText = 'Copied!';
  const classText = 'button';
  const classHtml = 'button is-link';
  const textText = 'Copy text only';
  const textHtml = 'Copy signature';
  return (
    <Button
      onClickHandler={clickHandler}
      classBefore={isText ? classText : classHtml}
      classAfter={isSuccessClass}
      textBefore={isText ? textText : textHtml}
      textAfter={copiedText}
    />
  );
};
export const createButtons = (
  signatureProps: SignatureProps,
  placeholders: Placeholders,
) => {
  const clickHandlers: Record<ButtonName, () => void> = {
    CopySignatureText: () =>
      copySignatureText({
        ...signatureProps,
        placeholders: placeholders,
      }),
    CopySignatureHtml: () =>
      copySignature(
        {
          ...signatureProps,
          placeholders: placeholders,
        },
        Signature,
      ),
    CopyRepliesAndForwardsText: () =>
      copyRepliesAndForwardsText({
        ...signatureProps,
        placeholders: placeholders,
      }),
    CopyRepliesAndForwardsHtml: () =>
      copySignature(
        {
          ...signatureProps,
          placeholders: placeholders,
        },
        RepliesAndForwards,
      ),
  };

  return (
    [
      { name: 'CopySignatureText', isText: true },
      { name: 'CopySignatureHtml', isText: false },
      { name: 'CopyRepliesAndForwardsText', isText: true },
      { name: 'CopyRepliesAndForwardsHtml', isText: false },
    ] as const
  )
    .map((buttonArr): [ButtonName, ReactElement] => [
      buttonArr.name,
      buttonMaker(clickHandlers[buttonArr.name], buttonArr.isText),
    ])
    .reduce(
      (result, item) => Object.assign(result, { [item[0]]: item[1] }),
      {} as Record<ButtonName, ReactElement>,
    );
};
