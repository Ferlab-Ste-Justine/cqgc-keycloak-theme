import type { KcContext } from "./KcContext";

/** Client of the prescription portal: different title/labels and no language switcher. */
export const PRESCRIPTION_CLIENT_ID = "clin-prescription-client";

export const isPrescriptionClient = (kcContext: KcContext) =>
    kcContext.client.clientId === PRESCRIPTION_CLIENT_ID;

/** Keycloak's "Action expired" message, as rendered in each supported language. */
const EXPIRY_MESSAGES = ["Action expired", "Action expirée"];

export const isExpiryMessage = (kcContext: KcContext) =>
    EXPIRY_MESSAGES.some(m => kcContext.message?.summary.includes(m));

/**
 * The reset-password page stores the submitted email here so the login page can display it on
 * the confirmation screen (Keycloak answers the reset request with login.ftl + a success message).
 */
export const RESET_EMAIL_STORAGE_KEY = "cqgc.resetEmail";

export const storage = {
    get(key: string) {
        try {
            return sessionStorage.getItem(key);
        } catch {
            return null;
        }
    },
    set(key: string, value: string) {
        try {
            sessionStorage.setItem(key, value);
        } catch {
            /* storage unavailable */
        }
    },
    remove(key: string) {
        try {
            sessionStorage.removeItem(key);
        } catch {
            /* storage unavailable */
        }
    }
};

export const redirectTo = (url: string | undefined) => {
    if (url) window.location.href = url;
};
