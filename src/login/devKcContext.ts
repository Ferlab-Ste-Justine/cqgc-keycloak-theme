import type { KcContext } from "./KcContext";
import { getKcContextMock } from "./KcPageStory";

/** Builds a mocked KcContext from the dev server's query string (dev only). */
export function getDevKcContext(params: URLSearchParams): KcContext {
    const pageId = (params.get("page") ?? "login.ftl") as KcContext["pageId"];

    return getKcContextMock({
        pageId,
        overrides: {
            locale: {
                currentLanguageTag: params.get("lang") ?? "fr",
                supported: ["en", "fr"].map(languageTag => ({
                    languageTag,
                    label: languageTag,
                    url: withParam(params, "lang", languageTag)
                }))
            },
            client: {
                clientId: params.get("client") ?? "clin-client",
                baseUrl: "https://example.org"
            },
            // ?error=credentials: simulate a failed login
            ...(params.get("error") === "credentials" && {
                message: { type: "error", summary: "Invalid username or password." },
                messagesPerField: {
                    existsError: (...fields: string[]) =>
                        fields.includes("username") || fields.includes("password")
                }
            })
        }
    });
}

function withParam(params: URLSearchParams, key: string, value: string) {
    const next = new URLSearchParams(params);
    next.set(key, value);
    return `?${next}`;
}
