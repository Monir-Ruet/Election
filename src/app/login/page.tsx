import { LoginForm } from "./_components/login-form";
import Image from "next/image";

export default async function Login() {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <LoginForm />
            </div>
        </div>
    );
}
