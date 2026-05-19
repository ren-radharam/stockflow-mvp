"use client";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Topbar() {
  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/login";
  }

  return (
    <header
      className="
        flex
        items-center
        justify-between
        border-b
        border-white/10
        px-6
        py-4
      "
    >
      <div>
        <h2
          className="
            text-xl
            font-semibold
            text-white
          "
        >
          Dashboard
        </h2>

        <p className="text-sm text-zinc-500">
          Manage your inventory
        </p>
      </div>

      <Button
        onClick={handleLogout}
        variant="outline"
        className="
          border-white/10
          bg-white/5
          text-white
          hover:bg-white/10
          hover:text-white
        "
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </header>
  );
}