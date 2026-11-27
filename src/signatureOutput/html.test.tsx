import { renderToStaticMarkup } from 'react-dom/server';
import { renderSignatureHtml } from './html';
import type { SignatureProps } from '../types';

describe('renderSignatureHtml', () => {
  it('removes preload links and returns parser-normalized markup', () => {
    const Component = (props: SignatureProps) => (
      <table>
        <tr>
          <td>
            <img src="https://example.com/logo.png" alt={props.name} />
          </td>
        </tr>
      </table>
    );

    const props = { name: 'Logo' } as SignatureProps;
    expect(renderToStaticMarkup(<Component {...props} />)).toContain(
      '<link rel="preload"',
    );

    const html = renderSignatureHtml(Component, {
      name: 'Logo',
    } as SignatureProps);

    expect(html).not.toContain('<link');
    expect(html).toBe(
      '<table><tbody><tr><td><img src="https://example.com/logo.png" alt="Logo"></td></tr></tbody></table>',
    );
  });
});
