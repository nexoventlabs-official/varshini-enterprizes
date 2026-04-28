import type { Locale } from './translations';

export type CurrencyCode = 'INR' | 'USD' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  symbolPosition: 'before' | 'after';
  rate: number; // conversion rate from INR
  locale: string;
  decimals: number;
}

const currencyMap: Record<Locale, CurrencyConfig> = {
  'en-IN': {
    code: 'INR',
    symbol: '₹',
    symbolPosition: 'before',
    rate: 1,
    locale: 'en-IN',
    decimals: 0,
  },
  'en-US': {
    code: 'USD',
    symbol: '$',
    symbolPosition: 'before',
    rate: 0.012, // 1 INR ≈ 0.012 USD
    locale: 'en-US',
    decimals: 2,
  },
  'de-EU': {
    code: 'EUR',
    symbol: '€',
    symbolPosition: 'after',
    rate: 0.011, // 1 INR ≈ 0.011 EUR
    locale: 'de-DE',
    decimals: 2,
  },
};

export const getCurrencyConfig = (locale: Locale): CurrencyConfig => {
  return currencyMap[locale];
};

export const convertPrice = (priceInINR: number, locale: Locale): number => {
  const config = currencyMap[locale];
  return Number((priceInINR * config.rate).toFixed(config.decimals));
};

export const formatPrice = (priceInINR: number, locale: Locale): string => {
  const config = currencyMap[locale];
  const converted = priceInINR * config.rate;

  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  }).format(converted);
};

export const formatPriceValue = (value: number, locale: Locale): string => {
  const config = currencyMap[locale];
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  }).format(value);
};

export default currencyMap;
