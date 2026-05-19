"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { signupSchema } from "@/validators/auth";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),

    defaultValues: {
      organizationName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignupFormValues) {
    try {
      setIsLoading(true);

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Signup failed");

        return;
      }

      toast.success("Account created successfully");

      window.location.href = "/dashboard";
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormField
          control={form.control}
          name="organizationName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-300">
                Organization Name
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="Acme Inc."
                  className="border-zinc-800 bg-zinc-950/50 text-white focus-visible:ring-1 focus-visible:ring-violet-500"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-300">
                Email
              </FormLabel>

              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="border-zinc-800 bg-zinc-950/50 text-white focus-visible:ring-1 focus-visible:ring-violet-500"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-300">
                Password
              </FormLabel>

              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="border-zinc-800 bg-zinc-950/50 text-white focus-visible:ring-1 focus-visible:ring-violet-500"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="h-10 w-full bg-white text-black transition-all hover:scale-[1.01] hover:bg-zinc-200"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </Form>
  );
}