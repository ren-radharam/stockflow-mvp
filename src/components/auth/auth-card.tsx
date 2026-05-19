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
    <Card className="w-full max-w-md border-white/10 bg-zinc-900/70 backdrop-blur-xl shadow-2xl">
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