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
    // Update document lang attribute
    const langMap: Record<Locale, string> = {
      'en-IN': 'en',
      'en-US': 'en',
      'de-EU': 'de',
    };
    document.documentElement.lang = langMap[newLocale];
  }, []);

  const t = translations[locale];

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
