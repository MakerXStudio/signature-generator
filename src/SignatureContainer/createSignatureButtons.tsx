import React from 'react';
import type { ReactNode } from 'react';

import {
  copyRepliesAndForwardsText,
  copySignature,
  copySignatureText,
} from '../util';
import Signature from '../Signature/Signature';
import RepliesAndForwards from '../RepliesAndForwards/RepliesAndForwards';
import Button from '../Button/Button';
import type { Placeholders } from '../constants';
import type { SignatureProps } from '../types';
import type { SignatureButtons } from './presentational-components';

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
  placeholders: Placeholders
): SignatureButtons => {
  const clickHandlers = {
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
        Signature
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
        RepliesAndForwards
      ),
  };

  const buttons: { name: keyof SignatureButtons; isText: boolean }[] = [
    { name: 'CopySignatureText', isText: true },
    { name: 'CopySignatureHtml', isText: false },
    { name: 'CopyRepliesAndForwardsText', isText: true },
    { name: 'CopyRepliesAndForwardsHtml', isText: false },
  ];

  return buttons
    .map((buttonArr): [keyof SignatureButtons, ReactNode] => [
      buttonArr.name,
      buttonMaker(clickHandlers[buttonArr.name], buttonArr.isText),
    ])
    .reduce(
      (result, item) => Object.assign(result, { [item[0]]: item[1] }),
      {} as SignatureButtons
    );
};
