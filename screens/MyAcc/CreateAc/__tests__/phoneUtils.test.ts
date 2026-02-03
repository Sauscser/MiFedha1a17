import { stripLeadingZeros, formatE164, parseE164ToParts } from '../index';

// Mock phoneUtil behavior by passing a fake phoneUtil into formatE164 / parseE164ToParts
const mockNumber = () => ({
  getCountryCode: () => 233,
  getNationalNumber: () => 712345678,
});

const mockPhoneUtil = {
  parse: (s: string) => {
    if (!s || !s.startsWith('+')) throw new Error('Invalid');
    return mockNumber();
  },
  isValidNumber: () => true,
  getRegionCodeForNumber: () => 'GH',
};

describe('phone utils', () => {
  test('stripLeadingZeros removes zeros', () => {
    expect(stripLeadingZeros('0012300')).toBe('12300');
    expect(stripLeadingZeros('0')).toBe('');
    expect(stripLeadingZeros('123')).toBe('123');
  });

  test('formatE164 builds correct formatted number', () => {
    const res = formatE164('233', '0712345678', mockPhoneUtil as any);
    expect(res.formatted).toBe('+233712345678');
    expect(res.region).toBe('GH');
    expect(res.isValid).toBe(true);
  });

  test('parseE164ToParts throws on invalid', () => {
    expect(() => parseE164ToParts('not-a-phone', mockPhoneUtil as any)).toThrow();
  });

  test('parseE164ToParts returns parts for valid', () => {
    const parts = parseE164ToParts('+233712345678', mockPhoneUtil as any);
    expect(parts.region).toBe('GH');
    expect(parts.formatted).toBe('+233712345678');
  });
});