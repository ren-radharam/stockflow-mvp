import { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function AuthCard({
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <Card className="w-full max-w-[440px] border-white/10 bg-zinc-900/60 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.45)]">
      <CardContent className="space-y-6 p-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {title}
          </h1>

          <p className="text-sm text-zinc-400">
            {description}
          </p>
        </div>

        {children}
      </CardContent>
    </Card>
  );
}