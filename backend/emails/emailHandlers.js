import { mailtrapClient, sender } from "../lib/mailtrap.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, username, profileUrl) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Welcome to Content Generator App!",
            html: createWelcomeEmailTemplate(username, profileUrl),
            category: "welcome",
        });
        console.log("Email sent successfully:", response);
    } catch (error) {
        throw error;
    }
}