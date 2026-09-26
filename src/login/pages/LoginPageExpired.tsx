import { SideImageLayout } from "../components/SideImageLayout";
import type { PageProps } from "./PageProps";
import { GenericError } from "./Error";

export default function LoginPageExpired({ kcContext, i18n }: PageProps<"login-page-expired.ftl">) {
    return (
        <SideImageLayout i18n={i18n}>
            {/* Restarting the flow is Keycloak's documented way out of an expired login page. */}
            <GenericError i18n={i18n} retryUrl={kcContext.url.loginRestartFlowUrl} />
        </SideImageLayout>
    );
}
