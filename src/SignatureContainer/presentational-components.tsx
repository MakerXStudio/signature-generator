import React from 'react';
import type { ReactNode } from 'react';

import Signature from '../Signature/Signature';
import RepliesAndForwards from '../RepliesAndForwards/RepliesAndForwards';
import type { SignatureProps } from '../types';

export type SignatureButtons = {
  CopySignatureText: ReactNode;
  CopySignatureHtml: ReactNode;
  CopyRepliesAndForwardsText: ReactNode;
  CopyRepliesAndForwardsHtml: ReactNode;
};

type BrandSignatureContainerProps = SignatureButtons & {
  signatureProps: SignatureProps;
};

export const BrandSignatureContainer = ({
  signatureProps,
  CopySignatureText,
  CopySignatureHtml,
  CopyRepliesAndForwardsText,
  CopyRepliesAndForwardsHtml,
}: BrandSignatureContainerProps) => (
  <div className="content">
    <div className="level">
      <div className="level-left">
        <h3 className="level-item">Standard Signature</h3>
      </div>
      <div className="level-right">
        {CopySignatureText}
        {CopySignatureHtml}
      </div>
    </div>
    <Signature {...signatureProps} />
    <div className="level">
      <div className="level-left">
        <h3 className="level-item">Replies and Forwards Signature</h3>
      </div>
      <div className="level-right">
        {CopyRepliesAndForwardsText}
        {CopyRepliesAndForwardsHtml}
      </div>
    </div>
    <RepliesAndForwards {...signatureProps} />
  </div>
);
