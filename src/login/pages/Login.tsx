import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Mail, TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import CQGCIcon from "../assets/CQGCIcon";
import CQGCLogo from "../assets/CQGCLogo";
import Divider from "../assets/Divider";
import ErrorIcon from "../assets/ErrorIcon";
import MSSSIcon from "../assets/MSSSIcon";
import { FormField, IconInput, PasswordInput } from "../components/FormField";
import { MessageAlert } from "../components/MessageAlert";
import { SideImageLayout } from "../components/SideImageLayout";
import { ContactBlock, StatusMessage } from "../components/StatusMessage";
import { isExpiryMessage, isPrescriptionClient, redirectTo, RESET_EMAIL_STORAGE_KEY, storage } from "../utils";
import type { PageProps } from "./PageProps";

/** Identity provider icons, keyed by provider alias. */
const providerIcons: Record<string, ReactNode> = {
    microsoft: <MSSSIcon />,
    cqgc: <CQGCIcon />
};

export default function Login({ kcContext, i18n }: PageProps<"login.ftl">) {
    const { realm, url, social, client, message, messagesPerField, login } = kcContext;
    const { msgStr } = i18n;

    const isPrescription = isPrescriptionClient(kcContext);
    const hasCredentialsError = messagesPerField.existsError("username", "password");

    // Keycloak answers a reset-password request with this page and a success message.
    const [resetEmail] = useState(() => (message?.type === "success" ? storage.get(RESET_EMAIL_STORAGE_KEY) : null));
    useEffect(() => storage.remove(RESET_EMAIL_STORAGE_KEY), []);

    const [showLoginForm, setShowLoginForm] = useState(hasCredentialsError || !!login.username);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        const data = new FormData(event.currentTarget);
        const required = msgStr("required_field_error");
        const nextErrors = {
            username: data.get("username") ? undefined : required,
            password: data.get("password") ? undefined : required
        };
        setErrors(nextErrors);

        if (nextErrors.username || nextErrors.password) {
            event.preventDefault();
            return;
        }
        // Native POST to Keycloak.
        setIsSubmitting(true);
    };

    if (resetEmail) {
        return (
            <SideImageLayout i18n={i18n}>
                <StatusMessage i18n={i18n} align="start" title={msgStr("reset_password_confirmation_title")}>
                    <p>
                        {msgStr("reset_password_confirmation_message_1")} <strong>{resetEmail}</strong>
                    </p>
                    <ContactBlock i18n={i18n} text={msgStr("reset_password_confirmation_message_2")} />
                </StatusMessage>
            </SideImageLayout>
        );
    }

    if (isExpiryMessage(kcContext)) {
        return (
            <SideImageLayout i18n={i18n}>
                <StatusMessage i18n={i18n} icon={<ErrorIcon />} title={msgStr("expiry_error_title")}>
                    <p>{msgStr("expiry_error_message_1")}</p>
                    <p>
                        {msgStr("expiry_error_message_2")} <a href={url.loginResetCredentialsUrl}>{msgStr("expiry_error_try_again")}</a>.
                    </p>
                </StatusMessage>
            </SideImageLayout>
        );
    }

    return (
        <SideImageLayout i18n={i18n} languageSwitcher={realm.internationalizationEnabled && !isPrescription}>
            <div className="ml-20 flex w-full max-w-[496px] flex-col items-start gap-10 max-side-sm:ml-0">
                <header className="flex flex-wrap items-center gap-6">
                    <CQGCLogo />
                    <Divider />
                    <h1 className="w-[120px] text-xl">{msgStr(isPrescription ? "login_title_prescription" : "login_title")}</h1>
                </header>

                {message && !hasCredentialsError && <MessageAlert message={message} />}

                {!showLoginForm ? (
                    <div className="flex w-full flex-col items-center p-6">
                        <h2 className="text-xl font-semibold text-cqgc-blue-10">{msgStr("login_options")}</h2>
                        <ul className="mt-6 flex w-[299px] flex-col gap-4">
                            {social?.providers?.map(p => (
                                <li key={p.alias}>
                                    <SocialButton id={`social-${p.alias}`} href={p.loginUrl} icon={providerIcons[p.alias]}>
                                        <span className="sr-only">{msgStr("login_title")}</span>
                                        {p.displayName}
                                    </SocialButton>
                                </li>
                            ))}
                            {realm.password && (
                                <li>
                                    <SocialButton id="social-CQGC" icon={<CQGCIcon />} onClick={() => setShowLoginForm(true)}>
                                        CQGC
                                    </SocialButton>
                                </li>
                            )}
                        </ul>
                    </div>
                ) : (
                    <form
                        id="kc-form-login"
                        className="flex w-full flex-col gap-6"
                        action={url.loginAction}
                        method="post"
                        noValidate
                        onSubmit={onSubmit}
                    >
                        {hasCredentialsError && (
                            <Alert variant="destructive">
                                <TriangleAlert />
                                <AlertTitle>{msgStr("login_failed_title")}</AlertTitle>
                                <AlertDescription>{msgStr("login_failed_message")}</AlertDescription>
                            </Alert>
                        )}

                        <FormField
                            id="username"
                            label={msgStr(isPrescription ? "username_label_prescription" : "username_label")}
                            error={errors.username}
                        >
                            <IconInput
                                id="username"
                                name="username"
                                type="text"
                                icon={<Mail />}
                                defaultValue={login.username ?? ""}
                                autoComplete="username"
                                autoFocus
                                aria-invalid={!!errors.username || hasCredentialsError}
                                aria-describedby={errors.username ? "username-error" : undefined}
                            />
                        </FormField>

                        <FormField id="password" label={msgStr("password_label")} error={errors.password}>
                            <PasswordInput
                                id="password"
                                name="password"
                                autoComplete="current-password"
                                showLabel={msgStr("showPassword")}
                                hideLabel={msgStr("hidePassword")}
                                aria-invalid={!!errors.password || hasCredentialsError}
                                aria-describedby={errors.password ? "password-error" : undefined}
                            />
                            {realm.resetPasswordAllowed && (
                                <a href={url.loginResetCredentialsUrl} className="self-start">
                                    {msgStr("forgot_password")}
                                </a>
                            )}
                        </FormField>

                        {kcContext.auth?.selectedCredential && <input type="hidden" name="credentialId" value={kcContext.auth.selectedCredential} />}

                        <div className="flex gap-2">
                            <Button type="submit" name="login" id="kc-login" disabled={isSubmitting}>
                                {msgStr("submit")}
                            </Button>
                            {client.baseUrl && (
                                <Button type="button" variant="outline" onClick={() => redirectTo(client.baseUrl)}>
                                    {msgStr("cancel")}
                                </Button>
                            )}
                        </div>
                    </form>
                )}
            </div>
        </SideImageLayout>
    );
}

type SocialButtonProps = {
    id: string;
    icon: ReactNode;
    children: ReactNode;
} & ({ href: string; onClick?: never } | { href?: never; onClick: () => void });

function SocialButton({ id, icon, children, href, onClick }: SocialButtonProps) {
    const className =
        "flex w-full items-center gap-2.5 rounded-sm border border-cqgc-social-border bg-white px-4 py-2 text-base text-cqgc-social no-underline hover:bg-cqgc-gray-2 active:bg-cqgc-social-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cqgc-social focus-visible:ring-offset-2";

    return href ? (
        <a id={id} href={href} className={className}>
            {icon}
            <span>{children}</span>
        </a>
    ) : (
        <button id={id} type="button" onClick={onClick} className={className}>
            {icon}
            <span>{children}</span>
        </button>
    );
}
