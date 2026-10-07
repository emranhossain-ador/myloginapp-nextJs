"use client";

import { useSearchParams } from 'next/navigation'
import { resetPassword } from "@/lib/auth-client";
import { Button, Form, Input, Label, TextField } from "@heroui/react";

const ResetPasswordForm = () => {

    const searchParams = useSearchParams();
    const token = searchParams.get("token");


    const handleResetPassword = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const resData = await resetPassword({
            newPassword: data.password,
            token
        });

    }


    return (
        <Form
            className="flex w-80 flex-col gap-3 rounded-xl border border-border/80 bg-gray-800 p-4 shadow-sm"
            onSubmit={handleResetPassword}
        >
            <TextField isRequired name="password" type="password">
                <Label>Password</Label>
                <Input className="bg-field" name='password' placeholder="You password" />
            </TextField>
            <Button className="w-full py-5 px-4 mt-6" type="submit">
                Continue
            </Button>
        </Form>
    )
}

export default ResetPasswordForm;