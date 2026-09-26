import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";
import { PRESCRIPTION_CLIENT_ID, RESET_EMAIL_STORAGE_KEY } from "../utils";

const { KcPageStory } = createKcPageStory({ pageId: "login.ftl" });

const meta = {
    title: "login/login.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const English: Story = {
    args: { kcContext: { locale: { currentLanguageTag: "en" } } }
};

export const PrescriptionClient: Story = {
    args: { kcContext: { client: { clientId: PRESCRIPTION_CLIENT_ID } } }
};

export const InvalidCredentials: Story = {
    args: {
        kcContext: {
            login: { username: "john.doe@ssss.gouv.qc.ca" },
            message: { type: "error", summary: "Invalid username or password." },
            messagesPerField: {
                existsError: (...fields: string[]) => fields.includes("username") || fields.includes("password")
            }
        }
    }
};

export const ActionExpired: Story = {
    args: {
        kcContext: {
            message: { type: "error", summary: "Action expired. Please continue with login now." }
        }
    }
};

export const ResetEmailSent: Story = {
    args: {
        kcContext: {
            message: {
                type: "success",
                summary: "You should receive an email shortly with further instructions."
            }
        }
    },
    beforeEach: () => {
        sessionStorage.setItem(RESET_EMAIL_STORAGE_KEY, "john.doe@ssss.gouv.qc.ca");
    }
};

export const WithWarningMessage: Story = {
    args: {
        kcContext: {
            message: { type: "warning", summary: "Your session has expired, please log in again." }
        }
    }
};
