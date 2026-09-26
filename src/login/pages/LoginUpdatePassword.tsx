import { useState, type FocusEvent, type FormEvent } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormField, PasswordInput } from "../components/FormField";
import { MessageAlert } from "../components/MessageAlert";
import { SideImageLayout } from "../components/SideImageLayout";
import type { PageProps } from "./PageProps";

/** 8+ characters with a lowercase, an uppercase, a digit and a special character. */
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

type Errors = { "password-new"?: string; "password-confirm"?: string };

export default function LoginUpdatePassword({ kcContext, i18n }: PageProps<"login-update-password.ftl">) {
    const { url, message, messagesPerField, isAppInitiatedAction, auth } = kcContext;
    const { msgStr } = i18n;

    const serverError = (field: string) => (messagesPerField.existsError(field) ? kcSanitize(messagesPerField.get(field)) : undefined);

    const [errors, setErrors] = useState<Errors>({
        "password-new": serverError("password"),
        "password-confirm": serverError("password-confirm")
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = (data: FormData): Errors => {
        const password = String(data.get("password-new") ?? "");
        const confirm = String(data.get("password-confirm") ?? "");
        const required = msgStr("required_field_error");

        return {
            "password-new": !password ? required : !PASSWORD_REGEX.test(password) ? msgStr("password_format_hint") : undefined,
            "password-confirm": !confirm ? required : confirm !== password ? msgStr("password_verification_error") : undefined
        };
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
        if (submitter?.name !== "cancel-aia") {
            const nextErrors = validate(new FormData(event.currentTarget));
            setErrors(nextErrors);
            if (nextErrors["password-new"] || nextErrors["password-confirm"]) {
                event.preventDefault();
                return;
            }
        }
        setIsSubmitting(true);
    };

    // Re-validate a field when it loses focus, once it has a value.
    const onBlur = (field: keyof Errors) => (event: FocusEvent<HTMLInputElement>) => {
        if (!event.currentTarget.value || !event.currentTarget.form) return;
        const next = validate(new FormData(event.currentTarget.form));
        setErrors(prev => ({ ...prev, [field]: next[field] }));
    };

    return (
        <SideImageLayout i18n={i18n}>
            <div className="flex w-full max-w-[496px] flex-col gap-6">
                <h1 className="text-2xl">{msgStr("update_password_title")}</h1>

                {message && !messagesPerField.existsError("password", "password-confirm") && <MessageAlert message={message} />}

                <form
                    id="kc-passwd-update-form"
                    className="flex flex-col gap-6"
                    action={url.loginAction}
                    method="post"
                    noValidate
                    onSubmit={onSubmit}
                >
                    {/* Lets password managers associate the new password with the account. */}
                    <input type="text" hidden readOnly autoComplete="username" value={auth?.attemptedUsername ?? ""} />

                    <FormField
                        id="password-new"
                        label={msgStr("new_password_label")}
                        error={errors["password-new"]}
                        hint={msgStr("password_format_hint")}
                    >
                        <PasswordInput
                            id="password-new"
                            name="password-new"
                            autoComplete="new-password"
                            autoFocus
                            showLabel={msgStr("showPassword")}
                            hideLabel={msgStr("hidePassword")}
                            onBlur={onBlur("password-new")}
                            aria-invalid={!!errors["password-new"]}
                            aria-describedby={errors["password-new"] ? "password-new-error" : "password-new-hint"}
                        />
                    </FormField>

                    <FormField id="password-confirm" label={msgStr("confirm_password_label")} error={errors["password-confirm"]}>
                        <PasswordInput
                            id="password-confirm"
                            name="password-confirm"
                            autoComplete="new-password"
                            showLabel={msgStr("showPassword")}
                            hideLabel={msgStr("hidePassword")}
                            onBlur={onBlur("password-confirm")}
                            aria-invalid={!!errors["password-confirm"]}
                            aria-describedby={errors["password-confirm"] ? "password-confirm-error" : undefined}
                        />
                    </FormField>

                    <div className="flex items-center gap-2">
                        <Checkbox id="logout-sessions" name="logout-sessions" value="on" defaultChecked />
                        <Label htmlFor="logout-sessions" className="font-normal">
                            {msgStr("logoutOtherSessions")}
                        </Label>
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={isSubmitting}>
                            {msgStr("submit")}
                        </Button>
                        {isAppInitiatedAction && (
                            <Button type="submit" variant="outline" name="cancel-aia" value="true">
                                {msgStr("cancel")}
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </SideImageLayout>
    );
}
