import { AuthCard } from "@/components/auth/auth-card";

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Login to continue managing inventory."
    >
      <div className="text-sm text-zinc-400">
        Login form coming next...
      </div>
    </AuthCard>
  );
}