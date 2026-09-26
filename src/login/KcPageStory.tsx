import type { DeepPartial } from "keycloakify/tools/DeepPartial";
import type { KcContext } from "./KcContext";
import KcPage from "./KcPage";
import { createGetKcContextMock } from "keycloakify/login/KcContext";
import type { KcContextExtension, KcContextExtensionPerPage } from "./KcContext";
import { themeNames, kcEnvDefaults } from "../kc.gen";

const kcContextExtension: KcContextExtension = {
    themeName: themeNames[0],
    properties: {
        ...kcEnvDefaults
    },
    client: { baseUrl: "https://example.org" }
};
const kcContextExtensionPerPage: KcContextExtensionPerPage = {
    "error.ftl": {}
};

export const { getKcContextMock } = createGetKcContextMock({
    kcContextExtension,
    kcContextExtensionPerPage,
    overrides: {
        locale: {
            currentLanguageTag: "fr",
            supported: [
                { languageTag: "en", label: "English", url: "#" },
                { languageTag: "fr", label: "Français", url: "#" }
            ]
        }
    },
    overridesPerPage: {
        "login.ftl": {
            social: {
                providers: [
                    {
                        providerId: "microsoft",
                        alias: "microsoft",
                        displayName: "ssss.gouv.qc.ca",
                        loginUrl: "#",
                        iconClasses: ""
                    }
                ]
            }
        }
    }
});

export function createKcPageStory<PageId extends KcContext["pageId"]>(params: {
    pageId: PageId;
}) {
    const { pageId } = params;

    function KcPageStory(props: {
        kcContext?: DeepPartial<Extract<KcContext, { pageId: PageId }>>;
    }) {
        const { kcContext: overrides } = props;

        const kcContextMock = getKcContextMock({
            pageId,
            overrides
        });

        return <KcPage kcContext={kcContextMock} />;
    }

    return { KcPageStory };
}
