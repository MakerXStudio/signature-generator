import { memo, type ReactNode } from 'react';
import { brandInfo } from '../constants';
import { isValidEmail, parseMobile } from '../util';

export interface RepliesAndForwardsProps {
  name?: string;
  pronoun?: string;
  title?: string;
  mobile?: string;
  email?: string;
  twitter?: string;
  brandName?: string;
  brandLink?: string;
  brandLinkName?: string;
}

const renderPhoneWithNbsp = (formatted: string): ReactNode[] => {
  const parts = formatted.split(/\s+/);
  const out: ReactNode[] = [];
  parts.forEach((part, i) => {
    if (i > 0) out.push(<span key={`s${i}`}>&nbsp;</span>);
    out.push(<span key={`p${i}`}>{part}</span>);
  });
  return out;
};

const RepliesAndForwardsImpl = (props: RepliesAndForwardsProps) => {
  const {
    name,
    pronoun,
    title,
    mobile,
    email,
    twitter,
    brandName,
    brandLink,
    brandLinkName,
  } = props;
  const styleObj = {
    color: 'black',
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontSize: '11pt',
  };
  const titleOptional = title ? <>&nbsp;|&nbsp;{title}</> : null;
  const pronounOptional = pronoun ? <>({pronoun})&nbsp;</> : null;

  const formattedMobile = parseMobile(mobile);
  const mobileTel = formattedMobile ? formattedMobile.replace(/\s/g, '') : '';
  const mobileChildren = formattedMobile
    ? renderPhoneWithNbsp(formattedMobile)
    : null;
  const safeEmail = isValidEmail(email) ? email : undefined;
  const twitterHandle = twitter ? twitter.replace('@', '') : '';

  return (
    <div className="content">
      <p style={styleObj}>
        <br />
        <br />
        <b>
          {name}&nbsp;{pronounOptional}|&nbsp;{brandName}
          {titleOptional}
        </b>
        <br />
        {mobileChildren ? (
          <>
            <b>M</b>&nbsp;
            <a
              href={`tel:${mobileTel}`}
              style={{ color: brandInfo.brandLinkColour }}
            >
              {mobileChildren}
            </a>{' '}
            |{' '}
          </>
        ) : null}
        <b>E</b>&nbsp;
        {safeEmail ? (
          <a
            href={`mailto:${safeEmail}`}
            style={{ color: brandInfo.brandLinkColour }}
          >
            {safeEmail}
          </a>
        ) : (
          <span>{email}</span>
        )}{' '}
        |{' '}
        {twitter ? (
          <span>
            <span>
              <b>T</b>&nbsp;
              <a
                href={`https://twitter.com/${twitterHandle}`}
                rel="noopener noreferrer"
                target="_blank"
                style={{ color: brandInfo.brandLinkColour }}
              >
                @{twitterHandle}
              </a>
            </span>{' '}
            |{' '}
          </span>
        ) : null}
        <b>W</b>&nbsp;
        <a href={brandLink} style={{ color: brandInfo.brandLinkColour }}>
          {brandLinkName}
        </a>
      </p>
    </div>
  );
};

const RepliesAndForwards = memo(RepliesAndForwardsImpl);
export default RepliesAndForwards;
