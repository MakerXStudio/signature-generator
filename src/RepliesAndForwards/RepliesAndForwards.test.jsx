import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import RepliesAndForwards from './RepliesAndForwards';
import { expectGolden } from '../test/golden';
import { fixtures } from '../test/fixtures';

describe('<RepliesAndForwards> static markup', () => {
  for (const [name, props] of Object.entries(fixtures)) {
    it(`matches the golden for ${name}`, () => {
      expectGolden(
        expect,
        `RepliesAndForwards.${name}.html`,
        renderToStaticMarkup(<RepliesAndForwards {...props} />)
      );
    });
  }
});
