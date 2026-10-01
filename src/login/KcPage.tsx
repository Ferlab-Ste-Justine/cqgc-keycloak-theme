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
const Info = lazy(() => import("./pages/Info"));
const ErrorPage = lazy(() => import("./pages/Error"));
const LoginOauthGrant = lazy(() => import("./pages/LoginOauthGrant"));
const LoginOauth2DeviceVerifyUserCode = lazy(
    () => import("./pages/LoginOauth2DeviceVerifyUserCode")
);

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
                    case "login-oauth2-device-verify-user-code.ftl":
                        return (
                            <LoginOauth2DeviceVerifyUserCode
                                kcContext={kcContext}
                                i18n={i18n}
                            />
                        );
                    case "login-oauth-grant.ftl":
                        return <LoginOauthGrant kcContext={kcContext} i18n={i18n} />;
                    case "info.ftl":
                        return <Info kcContext={kcContext} i18n={i18n} />;
                    case "error.ftl":
                        return <ErrorPage kcContext={kcContext} i18n={i18n} />;
                    // Every other page (register, OTP, WebAuthn, terms…) uses
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
