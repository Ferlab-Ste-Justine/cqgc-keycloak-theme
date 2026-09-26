import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { Button } from "@/components/ui/button";
import { FormField, IconInput } from "../components/FormField";
import { MessageAlert } from "../components/MessageAlert";
import { SideImageLayout } from "../components/SideImageLayout";
import { isPrescriptionClient, redirectTo, RESET_EMAIL_STORAGE_KEY, storage } from "../utils";
import type { PageProps } from "./PageProps";

export default function LoginResetPassword({ kcContext, i18n }: PageProps<"login-reset-password.ftl">) {
    const { url, client, message, messagesPerField, auth } = kcContext;
    const { msgStr } = i18n;

    const serverError = messagesPerField.existsError("username") ? kcSanitize(messagesPerField.get("username")) : undefined;
    const [error, setError] = useState<string | undefined>(serverError);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        const username = String(new FormData(event.currentTarget).get("username") ?? "").trim();

        if (!username) {
            event.preventDefault();
            setError(msgStr("required_field_error"));
            return;
        }
        // Shown by the login page once Keycloak confirms the email was sent.
        storage.set(RESET_EMAIL_STORAGE_KEY, username);
        setIsSubmitting(true);
    };

    return (
        <SideImageLayout i18n={i18n}>
            <div className="flex w-full max-w-[496px] flex-col gap-6">
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-2xl">{msgStr("reset_password_title")}</h1>
                    <p>{msgStr("reset_password_text")}</p>
                </div>

                {message && !messagesPerField.existsError("username") && message.type !== "info" && <MessageAlert message={message} />}

                <form
                    id="kc-reset-password-form"
                    className="flex flex-col gap-6"
                    action={url.loginAction}
                    method="post"
                    noValidate
                    onSubmit={onSubmit}
                >
                    <FormField
                        id="username"
                        label={msgStr(isPrescriptionClient(kcContext) ? "username_label_prescription" : "username_label")}
                        error={error}
                    >
                        <IconInput
                            id="username"
                            name="username"
                            type="text"
                            icon={<Mail />}
                            defaultValue={auth?.attemptedUsername ?? ""}
                            autoComplete="username"
                            autoFocus
                            aria-invalid={!!error}
                            aria-describedby={error ? "username-error" : undefined}
                        />
                    </FormField>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={isSubmitting}>
                            {msgStr("submit")}
                        </Button>
                        {client.baseUrl && (
                            <Button type="button" variant="outline" onClick={() => redirectTo(client.baseUrl)}>
                                {msgStr("cancel")}
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </SideImageLayout>
    );
}
