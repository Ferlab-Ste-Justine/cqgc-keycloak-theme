import { useState, type FormEvent } from "react";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, IconInput } from "../components/FormField";
import { MessageAlert } from "../components/MessageAlert";
import { SideImageLayout } from "../components/SideImageLayout";
import type { PageProps } from "./PageProps";

/** OAuth 2.0 device authorization grant: the user enters the code displayed by their device. */
export default function LoginOauth2DeviceVerifyUserCode({ kcContext, i18n }: PageProps<"login-oauth2-device-verify-user-code.ftl">) {
    // No `client` here: Keycloak only knows the client once a valid code has been entered.
    const { url, message } = kcContext;
    const { msgStr } = i18n;

    const [error, setError] = useState<string>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        const code = String(new FormData(event.currentTarget).get("device_user_code") ?? "").trim();

        if (!code) {
            event.preventDefault();
            setError(msgStr("required_field_error"));
            return;
        }
        setIsSubmitting(true);
    };

    // No language switcher: Keycloak ignores kc_locale here (no auth session yet), so the page
    // follows the browser language / KEYCLOAK_LOCALE cookie.
    return (
        <SideImageLayout i18n={i18n}>
            <div className="flex w-full max-w-[496px] flex-col gap-6">
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-2xl">{msgStr("oauth2DeviceVerificationTitle")}</h1>
                    <p>{msgStr("verifyOAuth2DeviceUserCode")}</p>
                </div>

                {/* Invalid or expired codes come back as an error message. */}
                {message && message.type !== "info" && <MessageAlert message={message} />}

                <form
                    id="kc-user-verify-device-user-code-form"
                    className="flex flex-col gap-6"
                    action={url.oauth2DeviceVerificationAction}
                    method="post"
                    noValidate
                    onSubmit={onSubmit}
                >
                    <FormField id="device-user-code" label={msgStr("device_user_code_label")} error={error}>
                        <IconInput
                            id="device-user-code"
                            name="device_user_code"
                            type="text"
                            icon={<KeyRound />}
                            autoComplete="off"
                            autoCapitalize="characters"
                            spellCheck={false}
                            autoFocus
                            aria-invalid={!!error}
                            aria-describedby={error ? "device-user-code-error" : undefined}
                        />
                    </FormField>

                    <Button type="submit" className="self-start" disabled={isSubmitting}>
                        {msgStr("submit")}
                    </Button>
                </form>
            </div>
        </SideImageLayout>
    );
}
