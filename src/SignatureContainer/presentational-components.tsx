import React, { type ReactNode } from 'react';

import Signature from '../Signature/Signature';
import RepliesAndForwards from '../RepliesAndForwards/RepliesAndForwards';
import type { SignatureProps } from '../types';

interface BrandSignatureContainerProps {
  signatureProps: SignatureProps;
  CopySignatureText: ReactNode;
  CopySignatureHtml: ReactNode;
  CopyRepliesAndForwardsText: ReactNode;
  CopyRepliesAndForwardsHtml: ReactNode;
}

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
