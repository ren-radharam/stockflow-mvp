"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { loginSchema } from "@/validators/auth";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(
    data: LoginFormData
  ) {
    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result =
        await response.json();

      if (!response.ok) {
        toast.error(
          result.error ||
            "Login failed"
        );

        return;
      }

      toast.success(
        "Welcome back!"
      );

      window.location.href = "/dashboard";
    } catch {
      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      className="
        w-full
        max-w-md
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        shadow-2xl
      "
    >
      <CardContent className="p-8">
        <div className="mb-8 space-y-2 text-center">
          <h1
            className="
              text-4xl
              font-semibold
              tracking-tight
              text-white
            "
          >
            Welcome back
          </h1>

          <p className="text-sm text-zinc-400">
            Login to continue managing
            inventory.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label className="text-zinc-300">
              Email
            </Label>

            <Input
              type="email"
              placeholder="you@example.com"
              className="
                border-white/10
                bg-black/20
                text-white
                placeholder:text-zinc-500
                focus-visible:ring-1
                focus-visible:ring-white/20
              "
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-300">
              Password
            </Label>

            <Input
              type="password"
              placeholder="••••••••"
              className="
                border-white/10
                bg-black/20
                text-white
                placeholder:text-zinc-500
                focus-visible:ring-1
                focus-visible:ring-white/20
              "
              {...register("password")}
            />

            {errors.password && (
              <p className="text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="
              h-11
              w-full
              rounded-xl
              bg-white
              font-medium
              text-black
              hover:bg-zinc-200
            "
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}