import type { ExtendKcContext } from "keycloakify/login";
import type { KcEnvName, ThemeName } from "../kc.gen";

export type KcContextExtension = {
    themeName: ThemeName;
    properties: Record<KcEnvName, string> & {};
    // Present at runtime (Keycloak's ClientBean) but not typed by Keycloakify.
    // Used by the "Cancel" buttons to send the user back to the application.
    client: { baseUrl?: string };
};

export type KcContextExtensionPerPage = {
    // Set by the legacy EmailWhitelistAuthenticator provider, only if it is still deployed.
    "error.ftl": { showWhiteListInfoPage?: boolean };
};

export type KcContext = ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>;
