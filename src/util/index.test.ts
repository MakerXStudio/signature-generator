import { parseMobile } from '.';

describe('parseMobile', () => {
  it('formats an Australian mobile without the country code', () => {
    expect(parseMobile('0412 345 678')).toBe('+61 412 345 678');
  });

  it('formats an Australian mobile with the country code', () => {
    expect(parseMobile('+61412345678')).toBe('+61 412 345 678');
  });

  it('returns an invalid number unchanged', () => {
    expect(parseMobile('12345')).toBe('12345');
  });

  it('returns null for undefined', () => {
    expect(parseMobile(undefined)).toBeNull();
  });
});
