import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-reset-password.ftl" });

const meta = {
    title: "login/login-reset-password.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithUsernameError: Story = {
    args: {
        kcContext: {
            messagesPerField: {
                existsError: (field: string) => field === "username",
                get: () => "Please specify username."
            }
        }
    }
};
