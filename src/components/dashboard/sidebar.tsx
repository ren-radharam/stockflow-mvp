"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  Settings,
} from "lucide-react";

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        hidden
        w-64
        border-r
        border-white/10
        bg-black/40
        backdrop-blur-xl
        lg:flex
        lg:flex-col
      "
    >
      <div className="border-b border-white/10 p-6">
        <h1
          className="
            text-2xl
            font-semibold
            tracking-tight
            text-white
          "
        >
          StockFlow
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Inventory Platform
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {links.map((link) => {
          const Icon = link.icon;

          const active =
            pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                transition-all

                ${
                  active
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              <Icon className="h-4 w-4" />

              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}