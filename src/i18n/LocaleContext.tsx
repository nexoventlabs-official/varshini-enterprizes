import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import translations, { Locale, Translation } from './translations';
import { formatPrice, convertPrice, getCurrencyConfig, CurrencyConfig } from './currency';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translation;
  formatPrice: (priceInINR: number) => string;
  convertPrice: (priceInINR: number) => number;
  currency: CurrencyConfig;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem('varshini-locale');
    return (saved as Locale) || 'en-IN';
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('varshini-locale', newLocale);
    document.documentElement.lang = 'en';
  }, []);

  // Always use Indian English content — locale only controls currency & shipping regions
  const t = translations['en-IN'];

  const fp = useCallback(
    (priceInINR: number) => formatPrice(priceInINR, locale),
    [locale]
  );

  const cp = useCallback(
    (priceInINR: number) => convertPrice(priceInINR, locale),
    [locale]
  );

  const currency = getCurrencyConfig(locale);

  return (
    <LocaleContext.Provider
      value={{
        locale,
        setLocale,
        t,
        formatPrice: fp,
        convertPrice: cp,
        currency,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
