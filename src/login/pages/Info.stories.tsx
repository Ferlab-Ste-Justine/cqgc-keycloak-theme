import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "info.ftl" });

const meta = {
    title: "login/info.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DeviceLoginSuccess: Story = {
    args: {
        kcContext: {
            messageHeader: "${oauth2DeviceVerificationCompleteHeader}",
            message: {
                type: "success",
                summary: "Vous pouvez fermer cette fenêtre de navigateur et retourner sur votre appareil."
            },
            skipLink: true
        }
    }
};

export const DeviceConsentDenied: Story = {
    args: {
        kcContext: {
            messageHeader: undefined,
            message: { type: "error", summary: "Consentement refusé pour connecter l'appareil." },
            actionUri: "http://localhost:8080/realms/myrealm/device"
        }
    }
};

export const WithRequiredActions: Story = {
    args: {
        kcContext: {
            messageHeader: undefined,
            message: { type: "warning", summary: "Vous devez effectuer les actions suivantes :" },
            requiredActions: ["UPDATE_PASSWORD", "VERIFY_EMAIL"],
            actionUri: "#"
        }
    }
};
