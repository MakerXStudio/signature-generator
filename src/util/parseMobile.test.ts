import { parseMobile } from '.';

describe('parseMobile', () => {
  it('prepends +61 to a valid AU mobile without + and formats it', () => {
    expect(parseMobile('0412 345 678')).toBe('+61 412 345 678');
  });

  it('formats a valid international number', () => {
    expect(parseMobile('+14155552671')).toBe('+1 415 555 2671');
  });

  it('returns an invalid number unchanged', () => {
    expect(parseMobile('12345')).toBe('12345');
  });

  // These depend on libphonenumber-js metadata (1.13.x). Older metadata treated
  // these AU mobile ranges as invalid and returned them unchanged, so a metadata
  // change that alters these results is a deliberate, visible change.
  it.each([
    ['0463681349', '+61 463 681 349'],
    ['0454123456', '+61 454 123 456'],
    ['0494123456', '+61 494 123 456'],
  ])('formats AU mobile %s in a newer range as %s', (input, expected) => {
    expect(parseMobile(input)).toBe(expected);
  });

  it('returns null for undefined', () => {
    expect(parseMobile(undefined)).toBeNull();
  });
});
