import React, { type ReactElement } from 'react';

import { copyHtml, copyText } from '../clipboard';
import { renderSignatureHtml } from '../signatureOutput/html';
import {
  buildRepliesAndForwardsText,
  buildSignatureText,
} from '../signatureOutput/text';
import Signature from '../Signature/Signature';
import RepliesAndForwards from '../RepliesAndForwards/RepliesAndForwards';
import Button from '../Button/Button';
import type { SignatureProps } from '../types';

type ButtonName =
  | 'CopySignatureText'
  | 'CopySignatureHtml'
  | 'CopyRepliesAndForwardsText'
  | 'CopyRepliesAndForwardsHtml';

const buttonMaker = (clickHandler: () => Promise<void>, isText: boolean) => {
  const isSuccessClass = 'button is-success';
  const copiedText = 'Copied!';
  const isFailureClass = 'button is-danger';
  const failedText = 'Copy failed';
  const classText = 'button';
  const classHtml = 'button is-link';
  const textText = 'Copy text only';
  const textHtml = 'Copy signature';
  return (
    <Button
      onClickHandler={clickHandler}
      classBefore={isText ? classText : classHtml}
      classAfter={isSuccessClass}
      classFailure={isFailureClass}
      textBefore={isText ? textText : textHtml}
      textAfter={copiedText}
      textFailure={failedText}
    />
  );
};
export const createButtons = (signatureProps: SignatureProps) => {
  const clickHandlers: Record<ButtonName, () => Promise<void>> = {
    CopySignatureText: () => copyText(buildSignatureText(signatureProps)),
    CopySignatureHtml: () =>
      copyHtml(
        renderSignatureHtml(Signature, signatureProps),
        buildSignatureText(signatureProps),
      ),
    CopyRepliesAndForwardsText: () =>
      copyText(buildRepliesAndForwardsText(signatureProps)),
    CopyRepliesAndForwardsHtml: () =>
      copyHtml(
        renderSignatureHtml(RepliesAndForwards, signatureProps),
        buildRepliesAndForwardsText(signatureProps),
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
