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

  it('returns null for undefined', () => {
    expect(parseMobile(undefined)).toBeNull();
  });
});
