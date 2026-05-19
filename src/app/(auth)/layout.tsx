import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#27272a,transparent_40%)]" />

      <div className="absolute left-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-violet-500/20 blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-120px] h-[300px] w-[300px] rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}