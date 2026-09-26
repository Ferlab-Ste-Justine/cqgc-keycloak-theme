import ErrorIcon from "../assets/ErrorIcon";
import InfoIcon from "../assets/InfoIcon";
import { SideImageLayout } from "../components/SideImageLayout";
import { StatusMessage } from "../components/StatusMessage";
import { isExpiryMessage } from "../utils";
import type { PageProps } from "./PageProps";

export default function ErrorPage({ kcContext, i18n }: PageProps<"error.ftl">) {
    const { url, client, showWhiteListInfoPage } = kcContext;
    const { msgStr } = i18n;

    const content = (() => {
        if (showWhiteListInfoPage) {
            return (
                <StatusMessage i18n={i18n} icon={<InfoIcon />} title={<span className="text-xl">{msgStr("activation_title")}</span>} contact>
                    <p>{msgStr("activation_text")}</p>
                </StatusMessage>
            );
        }

        if (isExpiryMessage(kcContext)) {
            return (
                <StatusMessage i18n={i18n} icon={<ErrorIcon />} title={msgStr("expiry_error_title")}>
                    <p>{msgStr("expiry_error_message_1")}</p>
                    <p>
                        {msgStr("expiry_error_message_2")} <a href={client.baseUrl ?? url.loginUrl}>{msgStr("expiry_error_try_again")}</a>.
                    </p>
                </StatusMessage>
            );
        }

        return <GenericError i18n={i18n} retryUrl={url.loginUrl} />;
    })();

    return <SideImageLayout i18n={i18n}>{content}</SideImageLayout>;
}

export function GenericError({ i18n, retryUrl }: Pick<PageProps<"error.ftl">, "i18n"> & { retryUrl: string }) {
    const { msgStr } = i18n;

    return (
        <StatusMessage i18n={i18n} icon={<ErrorIcon />} title={msgStr("error_title")} contact contactText={msgStr("error_contact_text")}>
            <p>
                {msgStr("error_message")} <a href={retryUrl}>{msgStr("try_again")}</a>
            </p>
        </StatusMessage>
    );
}
