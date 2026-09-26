import { useEffect, type CSSProperties, type ReactNode } from "react";
import sideImage from "../assets/side-image.webp";
import type { I18n } from "../i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
// Tailwind is only loaded with the CQGC pages, never with Keycloak's default pages.
import "../index.css";

type Props = {
    i18n: I18n;
    /** Renders the language toggle in the top right corner. */
    languageSwitcher?: boolean;
    children: ReactNode;
};

/** Full page layout: photo panel on the left (hidden ≤1180px), centered content on the right. */
export function SideImageLayout({ i18n, languageSwitcher = false, children }: Props) {
    useEffect(() => {
        document.documentElement.lang = i18n.currentLanguage.languageTag;
    }, [i18n.currentLanguage.languageTag]);

    return (
        <div
            className="flex min-h-screen bg-cqgc-gray-4"
            style={{ "--side-image": `url(${sideImage})` } as CSSProperties}
        >
            <div
                aria-hidden
                className="sticky top-0 hidden h-screen shrink-0 bg-[image:var(--side-image)] bg-cover bg-center transition-[width] duration-200 side-sm:block side-sm:w-[435px] side-lg:w-[575px]"
            />
            <main className="relative flex flex-1 items-center justify-center px-6 py-24 max-side-sm:bg-[image:linear-gradient(rgb(225_232_239/0.9),rgb(225_232_239/0.9)),var(--side-image)] max-side-sm:bg-cover max-side-sm:bg-bottom">
                {languageSwitcher && (
                    <div className="absolute top-10 right-10">
                        <LanguageSwitcher i18n={i18n} />
                    </div>
                )}
                {children}
            </main>
        </div>
    );
}
