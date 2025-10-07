import { LoginForm } from "./_components/login-form";
import { AuthShell } from "@/components/auth/auth-shell";
import Link from "next/link";

export default async function Login() {
    return (
        <AuthShell heroTitle="Welcome back" heroSubtitle="Sign in securely to continue">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <LoginForm />
                <div className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account? {" "}
                    <Link href="/signup" className="text-primary underline underline-offset-4">
                        Sign up
                    </Link>
                </div>
            </div>
        </AuthShell>
    );
}
