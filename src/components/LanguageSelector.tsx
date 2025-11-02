import { Language } from "@/types";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  disabled?: boolean;
}

export const LanguageSelector = ({
  currentLanguage,
  onLanguageChange,
  disabled
}: LanguageSelectorProps) => {
  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'gu', label: 'ગુજરાતી', flag: '🇮🇳' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Languages className="h-5 w-5 text-muted-foreground" />
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={currentLanguage === lang.code ? 'default' : 'outline'}
          size="sm"
          onClick={() => onLanguageChange(lang.code)}
          disabled={disabled}
          className="gap-2"
        >
          <span>{lang.flag}</span>
          <span>{lang.label}</span>
        </Button>
      ))}
    </div>
  );
};
