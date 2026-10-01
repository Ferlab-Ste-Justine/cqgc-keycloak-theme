import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-oauth2-device-verify-user-code.ftl" });

const meta = {
    title: "login/login-oauth2-device-verify-user-code.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInvalidCode: Story = {
    args: {
        kcContext: {
            message: { type: "error", summary: "Code invalide, veuillez réessayer." }
        }
    }
};

export const WithExpiredCode: Story = {
    args: {
        kcContext: {
            message: {
                type: "error",
                summary: "Le code a expiré. Veuillez réessayer de vous connecter depuis votre appareil."
            }
        }
    }
};
