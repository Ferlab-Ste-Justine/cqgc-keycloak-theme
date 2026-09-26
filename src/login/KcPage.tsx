import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";

const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

// CQGC pages: own layout, Tailwind + shadcn/ui (the CSS is loaded with these chunks only).
const Login = lazy(() => import("./pages/Login"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const LoginUpdatePassword = lazy(() => import("./pages/LoginUpdatePassword"));
const LoginVerifyEmail = lazy(() => import("./pages/LoginVerifyEmail"));
const LoginPageExpired = lazy(() => import("./pages/LoginPageExpired"));
const ErrorPage = lazy(() => import("./pages/Error"));

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return <Login kcContext={kcContext} i18n={i18n} />;
                    case "login-reset-password.ftl":
                        return <LoginResetPassword kcContext={kcContext} i18n={i18n} />;
                    case "login-update-password.ftl":
                        return <LoginUpdatePassword kcContext={kcContext} i18n={i18n} />;
                    case "login-verify-email.ftl":
                        return <LoginVerifyEmail kcContext={kcContext} i18n={i18n} />;
                    case "login-page-expired.ftl":
                        return <LoginPageExpired kcContext={kcContext} i18n={i18n} />;
                    case "error.ftl":
                        return <ErrorPage kcContext={kcContext} i18n={i18n} />;
                    // Every other page (register, OTP, WebAuthn, info, terms…) uses
                    // Keycloakify's default implementation with Keycloak's default CSS.
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
