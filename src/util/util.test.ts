import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  parseMobile,
  isValidEmail,
  copySignatureText,
  copyRepliesAndForwardsText,
  copySignature,
  stripObject,
} from './index';

describe('parseMobile', () => {
  it('returns null for undefined input', () => {
    expect(parseMobile(undefined)).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(parseMobile('')).toBeNull();
  });

  it('formats an Australian local number with default country code', () => {
    const result = parseMobile('411222333');
    expect(result).not.toBeNull();
    expect(result).toContain('+61');
  });

  it('formats a fully qualified international number', () => {
    const result = parseMobile('+61411222333');
    expect(result).toBe('+61 411 222 333');
  });

  it('passes through an unparseable number unchanged', () => {
    expect(parseMobile('not a phone')).toBe('not a phone');
  });
});

describe('isValidEmail', () => {
  it('accepts a standard email', () => {
    expect(isValidEmail('a@b.co')).toBe(true);
  });

  it('rejects missing tld', () => {
    expect(isValidEmail('a@b')).toBe(false);
  });

  it('rejects empty input', () => {
    expect(isValidEmail('')).toBe(false);
  });

  it('rejects undefined input', () => {
    expect(isValidEmail(undefined)).toBe(false);
  });
});

describe('stripObject', () => {
  it('drops null and undefined keys', () => {
    expect(stripObject({ a: 1, b: null, c: undefined, d: '' })).toEqual({
      a: 1,
      d: '',
    });
  });
});

describe('clipboard helpers', () => {
  let writeText: ReturnType<typeof vi.fn>;
  let write: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    writeText = vi.fn().mockResolvedValue(undefined);
    write = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText, write },
    });
    // jsdom may not provide ClipboardItem
    if (typeof (globalThis as { ClipboardItem?: unknown }).ClipboardItem === 'undefined') {
      (globalThis as { ClipboardItem: unknown }).ClipboardItem = class {
        constructor(public data: Record<string, Blob>) {}
      };
    }
  });

  it('copySignatureText writes plain text with the expected lines', async () => {
    const ok = await copySignatureText({
      name: 'Alice',
      title: 'Maker',
      mobile: '+61411222333',
      email: 'alice@makerx.com.au',
    });
    expect(ok).toBe(true);
    expect(writeText).toHaveBeenCalledOnce();
    const written = writeText.mock.calls[0]?.[0] as string;
    expect(written).toContain('Alice');
    expect(written).toContain('MakerX');
    expect(written).toContain('M +61 411 222 333');
    expect(written).toContain('E alice@makerx.com.au');
    expect(written).toContain('W makerx.com.au');
  });

  it('copyRepliesAndForwardsText emits the compact format', async () => {
    const ok = await copyRepliesAndForwardsText({
      name: 'Bob',
      title: 'Engineer',
      mobile: '+61411222333',
      email: 'bob@makerx.com.au',
    });
    expect(ok).toBe(true);
    const written = writeText.mock.calls[0]?.[0] as string;
    expect(written).toContain('Bob | MakerX | Engineer');
    expect(written).toContain('M +61 411 222 333');
  });

  it('copySignature reports failure when clipboard.write rejects', async () => {
    write.mockRejectedValueOnce(new Error('denied'));
    const Comp = () => null;
    const ok = await copySignature({} as Record<string, unknown>, Comp);
    expect(ok).toBe(false);
  });

  it('copySignature reports success on resolve', async () => {
    const Comp = () => null;
    const ok = await copySignature({} as Record<string, unknown>, Comp);
    expect(ok).toBe(true);
    expect(write).toHaveBeenCalledOnce();
  });
});
