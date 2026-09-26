import SuccessIcon from "../assets/SuccessIcon";
import { SideImageLayout } from "../components/SideImageLayout";
import { StatusMessage } from "../components/StatusMessage";
import type { PageProps } from "./PageProps";

export default function LoginVerifyEmail({ i18n }: PageProps<"login-verify-email.ftl">) {
    const { msgStr } = i18n;

    return (
        <SideImageLayout i18n={i18n}>
            <StatusMessage i18n={i18n} icon={<SuccessIcon />} title={msgStr("verify_email_title")}>
                <p>{msgStr("verify_email_message")}</p>
            </StatusMessage>
        </SideImageLayout>
    );
}
