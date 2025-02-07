import React from 'react';
import constants from '../constants';
import { parseMobile } from '../util';

const brandInfo = constants.brandInfo;

const Signature = (props) => {
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

  const qualificationsElemenent = qualifications ? (
    <>
      <br />
      <span>
        {qualifications}
        <br />
      </span>
    </>
  ) : null;

  // Note: css classes do not work for email so you need to use inline styles!
  // Adding a tbody causes the email sig to break in certain clients :'(
  return (
    <div className="content">
      <table
        border="0"
        cellSpacing="0"
        cellPadding="0"
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
                {qualificationsElemenent}
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
            <td colSpan="2">
              <table
                border="0"
                cellSpacing="0"
                cellPadding="0"
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
                      <a
                        style={{ color: brandInfo.brandLinkColour }}
                        href={`tel:${parseMobile(mobile).replace(/\s/g, '')}`}
                        dangerouslySetInnerHTML={{
                          __html: parseMobile(mobile).replace(/\s/g, '&nbsp;'),
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: 0 }}>
                      <b>E</b>
                    </td>
                    <td style={{ padding: 0 }}>
                      <a
                        href={`mailto:${email}`}
                        style={{ color: brandInfo.brandLinkColour }}
                      >
                        {email}
                      </a>
                    </td>
                  </tr>
                  {twitter ? (
                    <tr>
                      <td style={{ padding: 0 }}>
                        <b>T</b>
                      </td>
                      <td style={{ padding: 0 }}>
                        <a
                          href={`https://twitter.com/${twitter.replace(
                            '@',
                            ''
                          )}`}
                          rel="noopener noreferrer"
                          target="_blank"
                          style={{ color: brandInfo.brandLinkColour }}
                        >
                          @{twitter.replace('@', '')}
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
              <table border="0" cellSpacing="0" cellPadding="0">
                <tr>
                  <td
                    style={{
                      padding: 0,
                      verticalAlign: 'middle',
                    }}
                  >
                    <img
                      width="150"
                      height="30"
                      style={{
                        width: '150px',
                        height: '30px',
                        maxWidth: 'none',
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
                        width="28"
                        height="40"
                        style={{
                          width: '28px',
                          height: '40px',
                          maxWidth: 'none',
                        }}
                        src={brandInfo.brandGPTWLogo.link}
                        alt={brandInfo.brandGPTWLogo.alt}
                      />
                    </td>
                  ) : null}
                </tr>
              </table>
            </td>
          </tr>
          <tr>
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
                If I've sent it to you by accident, please delete it
                immediately.
              </td>
            </tr>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Signature;
