import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import Signature from './Signature';
import RepliesAndForwards from '../RepliesAndForwards/RepliesAndForwards';
import { signatureFixture } from './Signature.fixture';
import { brandInfo } from '../constants';

describe('Signature HTML output (golden)', () => {
  it('renders the standard signature with all sections', () => {
    const html = renderToStaticMarkup(<Signature {...signatureFixture} />);

    // Structural assertions: presence of inline-styled table, expected text.
    expect(html).toMatch(/<table[^>]*style="[^"]*font-family/);
    expect(html).toContain('Alice Example');
    expect(html).toContain('(she/her)');
    expect(html).toContain('Senior Maker');
    expect(html).toContain('PSM I');
    expect(html).toContain('mailto:alice@makerx.com.au');
    expect(html).toContain('tel:+61411222333');
    expect(html).toContain('https://twitter.com/aliceX');
    expect(html).toContain(brandInfo.brandLogo.link);
    expect(html).toContain(brandInfo.brandGPTWLogo.link); // addGPTW=true

    // Email-client safety: relies on inline styles, no scripts, no JS handlers.
    expect(html).not.toContain('<script');
    expect(html).not.toContain('onclick=');
    // Inner table styling must be inline.
    expect(html).toMatch(/<td[^>]*style="/);
  });

  it('omits the GPTW logo when addGPTW is false', () => {
    const html = renderToStaticMarkup(
      <Signature {...signatureFixture} addGPTW={false} />,
    );
    expect(html).not.toContain(brandInfo.brandGPTWLogo.link);
  });

  it('omits the mailto link for an invalid email', () => {
    const html = renderToStaticMarkup(
      <Signature {...signatureFixture} email="not-an-email" />,
    );
    expect(html).not.toContain('mailto:not-an-email');
    expect(html).toContain('not-an-email');
  });
});

describe('RepliesAndForwards HTML output (golden)', () => {
  it('renders the compact signature with all sections', () => {
    const html = renderToStaticMarkup(
      <RepliesAndForwards
        name="Alice"
        pronoun="she/her"
        title="Senior Maker"
        mobile="+61411222333"
        email="alice@makerx.com.au"
        twitter="aliceX"
        brandName={brandInfo.brandName}
        brandLink={brandInfo.brandLink}
        brandLinkName={brandInfo.brandLinkName}
      />,
    );

    expect(html).toContain('Alice');
    expect(html).toContain('she/her');
    expect(html).toContain('MakerX');
    expect(html).toContain('Senior Maker');
    expect(html).toContain('mailto:alice@makerx.com.au');
    expect(html).toContain('tel:+61411222333');
    expect(html).toContain('https://twitter.com/aliceX');
    expect(html).not.toContain('<script');
  });
});
