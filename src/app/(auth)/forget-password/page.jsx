"use client";

import { requestPasswordReset } from "@/lib/auth-client";
import { Button, Form, Input, Label, TextField } from "@heroui/react";

const ForgotPassPage = () => {

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const { resData, error } = await requestPasswordReset({
            email: data.email,
            redirectTo: "/reset-password",
        })
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <Form
                className="flex max-w-md w-full flex-col gap-3 rounded-xl border border-border/80 bg-gray-800 p-4 shadow-sm"
                onSubmit={handleForgotPassword}
            >
                <h2 className="text-lg font-semibold text-center">Forgot Password</h2>
                <TextField isRequired name="email" type="email">
                    <Label>Work email</Label>
                    <Input className="bg-field" name="email" placeholder="you@company.com" />
                </TextField>
                <Button className="w-full py-5 px-4 mt-6" type="submit">
                    Continue
                </Button>
            </Form>
        </div>
    );
}

export default ForgotPassPage;