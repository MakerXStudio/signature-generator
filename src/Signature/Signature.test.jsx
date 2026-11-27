import { renderToStaticMarkup } from 'react-dom/server';
import Signature from './Signature';
import { expectGolden } from '../test/golden';
import { fixtures } from '../test/fixtures';

describe('<Signature> static markup', () => {
  for (const [name, props] of Object.entries(fixtures)) {
    it(`matches the golden for ${name}`, () => {
      expectGolden(
        expect,
        `Signature.${name}.html`,
        renderToStaticMarkup(<Signature {...props} />)
      );
    });
  }
});
