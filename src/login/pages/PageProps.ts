import type { I18n } from "../i18n";
import type { KcContext } from "../KcContext";

/** Props of the CQGC pages. They render their own layout instead of Keycloakify's Template. */
export type PageProps<PageId extends KcContext["pageId"]> = {
    kcContext: Extract<KcContext, { pageId: PageId }>;
    i18n: I18n;
};
