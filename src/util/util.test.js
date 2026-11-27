import {
  camelize,
  copyRepliesAndForwardsText,
  copySignatureText,
  parseLandLine,
  parseMobile,
  stripObject,
} from '.';
import { expectGolden } from '../test/golden';
import { fixtures } from '../test/fixtures';
import { stubExecCommand } from '../test/execCommand';

// Inputs are recorded as text so undefined survives the JSON round trip.
const inputTable = (fn, inputs) =>
  JSON.stringify(
    inputs.map((input) => ({
      input: input === undefined ? '(undefined)' : input,
      output: fn(input),
    })),
    null,
    2
  ) + '\n';

describe('parseMobile', () => {
  it('matches the golden input table', () => {
    const inputs = [
      undefined,
      '',
      '0412 345 678',
      '0412345678',
      '412345678',
      '+61 412 345 678',
      '+61412345678',
      '+61 111 222 333',
      '+64 21 123 4567',
      '021 123 4567',
      '+44 7700 900123',
      '02 9876 5432',
      '(02) 9876 5432',
      '1800 123 456',
      '12345',
      'call me',
      '<em>call me</em>',
    ];
    expectGolden(expect, 'parseMobile.json', inputTable(parseMobile, inputs));
  });
});

describe('parseLandLine', () => {
  it('matches the golden input table', () => {
    const inputs = [
      undefined,
      '',
      '9876 5432',
      '98765432',
      '02 9876 5432',
      '+61 2 9876 5432',
      '61298765432',
      '1800 123 456',
      '13 13 13',
      '+61 111 222 333',
      'n/a',
    ];
    expectGolden(
      expect,
      'parseLandLine.json',
      inputTable(parseLandLine, inputs)
    );
  });
});

describe('camelize', () => {
  const table = [
    ['Your Name', 'yourName'],
    ['hello world', 'helloWorld'],
    ['Job Title', 'jobTitle'],
    ['EquipmentClass name', 'equipmentClassName'],
    ['support-hotline', 'support-Hotline'],
    ['ABC', 'aBC'],
    ['0 zero', 'Zero'],
    ['', ''],
  ];
  for (const [input, expected] of table) {
    it(`camelizes ${JSON.stringify(input)}`, () => {
      expect(camelize(input)).toBe(expected);
    });
  }
});

describe('stripObject', () => {
  const table = [
    [{}, {}],
    [{ a: 1 }, { a: 1 }],
    [{ a: null, b: undefined }, {}],
    [
      { a: 1, b: null, c: undefined, d: 0, e: '', f: false, g: 'x' },
      { a: 1, d: 0, e: '', f: false, g: 'x' },
    ],
    [{ nested: { inner: null } }, { nested: { inner: null } }],
  ];
  for (const [input, expected] of table) {
    it(`strips ${JSON.stringify(input)}`, () => {
      const result = stripObject(input);
      expect(result).toEqual(expected);
      expect(Object.keys(result)).toEqual(Object.keys(expected));
    });
  }
});

describe('text copy builders', () => {
  // No name: the signature text builder writes the literal "null".
  const cases = {
    ...fixtures,
    nameless: { ...fixtures['minimal-placeholders'], name: '' },
  };

  let stub;
  beforeEach(() => {
    stub = stubExecCommand();
  });
  afterEach(() => {
    stub.restore();
  });

  for (const [name, props] of Object.entries(cases)) {
    it(`copySignatureText matches the golden for ${name}`, () => {
      copySignatureText(props);
      expect(stub.copies).toHaveLength(1);
      expectGolden(expect, `copySignatureText.${name}.txt`, stub.copies[0]);
    });

    it(`copyRepliesAndForwardsText matches the golden for ${name}`, () => {
      copyRepliesAndForwardsText(props);
      expect(stub.copies).toHaveLength(1);
      expectGolden(
        expect,
        `copyRepliesAndForwardsText.${name}.txt`,
        stub.copies[0]
      );
    });
  }
});
