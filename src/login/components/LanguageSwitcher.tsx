import { Button } from "@/components/ui/button";
import type { I18n } from "../i18n";

/** Only these are offered, even if the realm enables more languages. */
const SUPPORTED_LANGUAGES: string[] = ["en", "fr"];

/** One button per other supported language (with en/fr: a single "EN"/"FR" toggle). */
export function LanguageSwitcher({ i18n }: { i18n: I18n }) {
    const { currentLanguage } = i18n;
    const languages = i18n.enabledLanguages.filter(({ languageTag }) =>
        SUPPORTED_LANGUAGES.includes(languageTag)
    );

    if (languages.length <= 1) return null;

    return (
        <div className="flex gap-2">
            {languages
                .filter(({ languageTag }) => languageTag !== currentLanguage.languageTag)
                .map(({ languageTag, label, href }) => (
                    <Button key={languageTag} asChild className="no-underline">
                        <a href={href} lang={languageTag} aria-label={label}>
                            {languageTag.toUpperCase()}
                        </a>
                    </Button>
                ))}
        </div>
    );
}
