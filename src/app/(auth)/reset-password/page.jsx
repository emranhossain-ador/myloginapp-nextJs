'use client'

import { Suspense } from "react";
import ResetPasswordForm from "./reset-password-form";

const ResetPasswordPage = () => {

    return (
        <div className="flex h-screen items-center justify-center">
            <Suspense fallback={<h4>Loading...</h4>}>

                <ResetPasswordForm />

            </Suspense>
        </div>
    );
}

export default ResetPasswordPage;