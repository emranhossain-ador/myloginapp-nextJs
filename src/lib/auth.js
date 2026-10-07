import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { Resend } from "resend";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db("myloginapp");

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    database: mongodbAdapter(db),

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,

        sendResetPassword: async ({ user, url }) => {
            await resend.emails.send({
                from: "Acme <onboarding@resend.dev>",
                to: user.email,
                subject: "Reset Your Password",
                html: `
                    <h1>Reset Your Password</h1>
                    <p>Please click on the link below to reset your password.</p>
                    <a href="${url}">Reset Password</a>
                `,
            });
        },
    },

    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            await resend.emails.send({
                from: "Acme <onboarding@resend.dev>",
                to: user.email,
                subject: "Verify Your Email",
                html: `
                    <h1>Verify Your Email</h1>
                    <p>Please click on the link below to verify your email address.</p>
                    <a href="${url}">Verify Email</a>
                `,
            });
        },

        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        expiresIn: 3600,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
});