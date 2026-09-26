import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "error.ftl" });

const meta = {
    title: "login/error.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ActionExpired: Story = {
    args: { kcContext: { message: { type: "error", summary: "Action expired." } } }
};

export const WhiteListInfo: Story = {
    args: { kcContext: { showWhiteListInfoPage: true } }
};
