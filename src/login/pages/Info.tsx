import { kcSanitize } from "keycloakify/lib/kcSanitize";
import ErrorIcon from "../assets/ErrorIcon";
import InfoIcon from "../assets/InfoIcon";
import SuccessIcon from "../assets/SuccessIcon";
import { SideImageLayout } from "../components/SideImageLayout";
import { StatusMessage } from "../components/StatusMessage";
import type { PageProps } from "./PageProps";

const icons = {
    success: <SuccessIcon />,
    info: <InfoIcon />,
    warning: <ErrorIcon />,
    error: <ErrorIcon />
};

/**
 * Generic Keycloak info page: device login success, email verified, required actions to perform
 * (from an "execute actions" email link), etc.
 */
export default function Info({ kcContext, i18n }: PageProps<"info.ftl">) {
    const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;
    const { msgStr, advancedMsgStr } = i18n;

    // Without a header, the message itself is the title.
    const title = messageHeader ? advancedMsgStr(messageHeader) : message.summary;
    const body = messageHeader ? message.summary : undefined;

    const link = (() => {
        // After a refused device consent, Keycloak links back to the code page, but the code has
        // already been used: the user has to start over from the device.
        if (skipLink || isDeviceVerificationUri(actionUri)) return undefined;
        if (pageRedirectUri) return { href: pageRedirectUri, label: msgStr("backToApplication") };
        if (actionUri) return { href: actionUri, label: msgStr("proceedWithAction") };
        // `client` is missing when Keycloak doesn't know the client (e.g. device flow pages).
        if (client?.baseUrl) return { href: client.baseUrl, label: msgStr("backToApplication") };
    })();

    return (
        <SideImageLayout i18n={i18n}>
            <StatusMessage i18n={i18n} icon={icons[message.type]} title={<span dangerouslySetInnerHTML={{ __html: kcSanitize(title) }} />}>
                {body && <p dangerouslySetInnerHTML={{ __html: kcSanitize(body) }} />}
                {requiredActions && requiredActions.length > 0 && (
                    <p>
                        <strong>{requiredActions.map(action => advancedMsgStr(`requiredAction.${action}`)).join(", ")}</strong>
                    </p>
                )}
                {link && (
                    <p>
                        <a href={link.href}>{link.label}</a>
                    </p>
                )}
            </StatusMessage>
        </SideImageLayout>
    );
}

/** Keycloak's device verification endpoint: /realms/{realm}/device */
const isDeviceVerificationUri = (uri: string | undefined) => !!uri && new URL(uri, window.location.href).pathname.endsWith("/device");
