import { AuthCard } from "@/components/auth/auth-card";
import { SignupForm } from "@/components/auth/signup-form";

import Link from "next/link";

export default function SignupPage() {
  return (
    <AuthCard
      title="Create your account"
      description="Start managing your inventory with StockFlow."
    >
      <SignupForm />

      <p className="mt-6 text-center text-sm text-zinc-400">
        Already have an account?{" "}

        <Link
        href="/login"
        className="
            text-blue-400
            transition
            hover:text-blue-300
        "
        >
        Login
        </Link>
    </p>
    </AuthCard>
  );
}