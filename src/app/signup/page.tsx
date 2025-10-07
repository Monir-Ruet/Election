import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "./_components/signup-form";

export default function SignupPage() {
  return (
    <AuthShell heroTitle="Create your account" heroSubtitle="Quick registration to get started">
      <SignupForm />
    </AuthShell>
  );
}
