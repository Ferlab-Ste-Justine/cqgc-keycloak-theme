import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-oauth-grant.ftl" });

const meta = {
    title: "login/login-oauth-grant.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTermsAndPolicy: Story = {
    args: {
        kcContext: {
            client: {
                name: "CQGC CLI",
                attributes: {
                    tosUri: "https://example.org/tos",
                    policyUri: "https://example.org/privacy"
                }
            },
            oauth: {
                clientScopesRequested: [
                    { consentScreenText: "${profileScopeConsentText}" },
                    { consentScreenText: "${emailScopeConsentText}" },
                    { consentScreenText: "${offlineAccessScopeConsentText}" }
                ]
            }
        }
    }
};
