import { memo, type ReactNode } from 'react';
import { brandInfo } from '../constants';
import { isValidEmail, parseMobile } from '../util';
import type { BrandLogo } from '../constants';

export interface SignatureProps {
  name?: string;
  pronoun?: string;
  title?: string;
  qualifications?: string;
  mobile?: string;
  email?: string;
  twitter?: string;
  brandLogo: BrandLogo;
  brandLink: string;
  brandLinkName: string;
  addGPTW?: boolean;
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

const SignatureImpl = (props: SignatureProps) => {
  const {
    name,
    pronoun,
    title,
    qualifications,
    mobile,
    email,
    twitter,
    brandLogo,
    brandLink,
    brandLinkName,
    addGPTW,
  } = props;

  const titleElement = title ? (
    <>
      <br />
      <span style={{ color: '#000' }}>{title}</span>
    </>
  ) : null;

  const pronounOptional = pronoun ? ` (${pronoun})` : null;

  const qualificationsElement = qualifications ? (
    <>
      <br />
      <span>
        {qualifications}
        <br />
      </span>
    </>
  ) : null;

  const formattedMobile = parseMobile(mobile);
  const mobileTel = formattedMobile ? formattedMobile.replace(/\s/g, '') : '';
  const mobileChildren = formattedMobile
    ? renderPhoneWithNbsp(formattedMobile)
    : null;
  const safeEmail = isValidEmail(email) ? email : undefined;
  const twitterHandle = twitter ? twitter.replace('@', '') : '';

  // Note: css classes do not work for email so you need to use inline styles!
  // Adding a tbody causes the email sig to break in certain clients :'(
  return (
    <div className="content">
      <table
        border={0}
        cellSpacing={0}
        cellPadding={0}
        style={{
          color: 'black',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontSize: '11pt',
          width: 'auto',
        }}
      >
        <tbody>
          <tr>
            <td valign="top">
              {/*Offset text so it lines up with top of logo on light mode UIs and works in Outlook*/}
              <div style={{ height: '15px', lineHeight: '15px' }}>&nbsp;</div>
              <p>
                <b>
                  {name}
                  {pronounOptional}
                </b>
                {titleElement}
                {qualificationsElement}
              </p>
            </td>
            <td
              valign="top"
              style={{
                paddingRight: '20px',
                width: '96px',
              }}
            ></td>
          </tr>
          <tr>
            <td colSpan={2}>
              <table
                border={0}
                cellSpacing={0}
                cellPadding={0}
                style={{
                  color: 'black',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontSize: '11pt',
                  margin: 0,
                  padding: 0,
                }}
              >
                <tbody>
                  <tr>
                    <td style={{ padding: 0, width: '30px' }}>
                      <b>M</b>
                    </td>
                    <td style={{ padding: 0 }}>
                      {mobileChildren ? (
                        <a
                          style={{ color: brandInfo.brandLinkColour }}
                          href={`tel:${mobileTel}`}
                        >
                          {mobileChildren}
                        </a>
                      ) : null}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: 0 }}>
                      <b>E</b>
                    </td>
                    <td style={{ padding: 0 }}>
                      {safeEmail ? (
                        <a
                          href={`mailto:${safeEmail}`}
                          style={{ color: brandInfo.brandLinkColour }}
                        >
                          {safeEmail}
                        </a>
                      ) : (
                        <span>{email}</span>
                      )}
                    </td>
                  </tr>
                  {twitter ? (
                    <tr>
                      <td style={{ padding: 0 }}>
                        <b>T</b>
                      </td>
                      <td style={{ padding: 0 }}>
                        <a
                          href={`https://twitter.com/${twitterHandle}`}
                          rel="noopener noreferrer"
                          target="_blank"
                          style={{ color: brandInfo.brandLinkColour }}
                        >
                          @{twitterHandle}
                        </a>
                      </td>
                    </tr>
                  ) : null}
                  <tr>
                    <td style={{ padding: 0 }}>
                      <b>W</b>
                    </td>
                    <td style={{ padding: 0 }}>
                      <a
                        href={brandLink}
                        style={{ color: brandInfo.brandLinkColour }}
                      >
                        {brandLinkName}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table border={0} cellSpacing={0} cellPadding={0}>
                <tbody>
                  <tr>
                    <td
                      style={{
                        padding: 0,
                        verticalAlign: 'middle',
                      }}
                    >
                      <img
                        width={173}
                        height={35}
                        style={{
                          width: '173px',
                          height: '35px',
                          maxWidth: 'none',
                          verticalAlign: 'middle',
                        }}
                        src={brandLogo.link}
                        alt={brandLogo.alt}
                      />
                    </td>
                    {addGPTW ? (
                      <td
                        style={{
                          paddingLeft: '10px',
                          paddingTop: 0,
                          paddingBottom: 0,
                        }}
                      >
                        <img
                          width={62}
                          height={62}
                          style={{
                            width: '62px',
                            height: '62px',
                            maxWidth: 'none',
                            verticalAlign: 'middle',
                          }}
                          src={brandInfo.brandGPTWLogo.link}
                          alt={brandInfo.brandGPTWLogo.alt}
                        />
                      </td>
                    ) : null}
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td
              style={{
                color: '#4a4a4a',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontSize: '6.5pt',
                lineHeight: '1.5',
              }}
            >
              This email may contain confidential information.
              <br />
              If I&apos;ve sent it to you by accident, please delete it
              immediately.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Signature = memo(SignatureImpl);
export default Signature;
