import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessageAlert } from "../components/MessageAlert";
import { SideImageLayout } from "../components/SideImageLayout";
import type { PageProps } from "./PageProps";

/** Consent screen, shown for clients with "Consent required" (including the device flow). */
export default function LoginOauthGrant({ kcContext, i18n }: PageProps<"login-oauth-grant.ftl">) {
    const { url, oauth, client, message, realm } = kcContext;
    const { msgStr, advancedMsgStr } = i18n;

    const clientName = client.name ? advancedMsgStr(client.name) : client.clientId;
    const { logoUri, tosUri, policyUri } = client.attributes;

    return (
        <SideImageLayout i18n={i18n} languageSwitcher={realm.internationalizationEnabled}>
            <div id="kc-oauth" className="flex w-full max-w-[496px] flex-col gap-6">
                <div className="flex flex-col gap-1.5">
                    {logoUri && <img src={logoUri} alt="" className="mb-2 max-h-12 self-start" />}
                    <h1 className="text-2xl">{msgStr("oauthGrantTitle", clientName)}</h1>
                    <p>{msgStr("oauthGrantRequest")}</p>
                </div>

                {message && message.type !== "info" && <MessageAlert message={message} />}

                <ul className="flex flex-col gap-2">
                    {oauth.clientScopesRequested.map(scope => (
                        <li key={scope.consentScreenText} className="flex items-start gap-2">
                            <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-cqgc-blue-8" />
                            <span>
                                {advancedMsgStr(scope.consentScreenText)}
                                {scope.dynamicScopeParameter && (
                                    <>
                                        : <strong>{scope.dynamicScopeParameter}</strong>
                                    </>
                                )}
                            </span>
                        </li>
                    ))}
                </ul>

                {(tosUri || policyUri) && (
                    <p className="text-cqgc-gray-7">
                        {msgStr("oauthGrantInformation", clientName)}
                        {tosUri && (
                            <>
                                {" "}
                                {msgStr("oauthGrantReview").trim()}{" "}
                                <a href={tosUri} target="_blank" rel="noreferrer">
                                    {msgStr("oauthGrantTos")}
                                </a>
                            </>
                        )}
                        {policyUri && (
                            <>
                                {" "}
                                {msgStr("oauthGrantReview").trim()}{" "}
                                <a href={policyUri} target="_blank" rel="noreferrer">
                                    {msgStr("oauthGrantPolicy")}
                                </a>
                            </>
                        )}
                    </p>
                )}

                {/* The clicked button's name (accept/cancel) tells Keycloak the decision, so the
                    buttons are never disabled on submit (a disabled submitter isn't posted). */}
                <form action={url.oauthAction} method="post" className="flex gap-2">
                    <input type="hidden" name="code" value={oauth.code} />
                    <Button type="submit" name="accept" id="kc-login">
                        {msgStr("doYes")}
                    </Button>
                    <Button type="submit" name="cancel" id="kc-cancel" variant="outline">
                        {msgStr("doNo")}
                    </Button>
                </form>
            </div>
        </SideImageLayout>
    );
}
