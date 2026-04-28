import React from 'react';
import { useLocale } from '@/i18n';
import type { Locale } from '@/i18n';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LocaleOption {
  value: Locale;
  label: string;
  flagUrl: string;
  currency: string;
}

const localeOptions: LocaleOption[] = [
  { value: 'en-IN', label: 'India', flagUrl: 'https://flagcdn.com/w40/in.png', currency: 'INR' },
  { value: 'en-US', label: 'USA', flagUrl: 'https://flagcdn.com/w40/us.png', currency: 'USD' },
  { value: 'de-EU', label: 'Europe', flagUrl: 'https://flagcdn.com/w40/eu.png', currency: 'EUR' },
];

const FlagImg: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = '' }) => (
  <img
    src={src}
    alt={alt}
    className={`inline-block rounded-sm object-cover ${className}`}
    style={{ width: 20, height: 14 }}
    loading="eager"
  />
);

const LanguageSelector: React.FC = () => {
  const { locale, setLocale } = useLocale();

  const current = localeOptions.find((o) => o.value === locale) || localeOptions[0];

  return (
    <Select value={locale} onValueChange={(val) => setLocale(val as Locale)}>
      <SelectTrigger className="w-auto min-w-[140px] h-9 gap-2 border-border/60 bg-background/80 backdrop-blur-sm text-sm font-medium hover:bg-accent/50 transition-colors">
        <SelectValue>
          <span className="flex items-center gap-2">
            <FlagImg src={current.flagUrl} alt={current.label} />
            <span className="hidden sm:inline">{current.label}</span>
            <span className="text-muted-foreground text-xs">({current.currency})</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end" className="min-w-[180px]">
        {localeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value} className="cursor-pointer">
            <span className="flex items-center gap-3">
              <FlagImg src={option.flagUrl} alt={option.label} className="mr-1" />
              <span className="font-medium">{option.label}</span>
              <span className="text-muted-foreground text-xs ml-auto">({option.currency})</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
