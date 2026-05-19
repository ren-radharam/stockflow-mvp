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
        bg-black/30
        backdrop-blur-xl
        lg:flex
        lg:flex-col
      "
    >
      <div className="border-b border-white/10 p-6">
        <h1
          className="
            bg-gradient-to-r
            from-white
            to-zinc-400
            bg-clip-text
            text-2xl
            font-bold
            tracking-tight
            text-transparent
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
                group
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                transition-all
                duration-200

                ${
                  active
                    ? `
                      bg-white
                      text-black
                      shadow-lg
                      shadow-white/10
                    `
                    : `
                      text-zinc-400
                      hover:bg-white/5
                      hover:text-white
                    `
                }
              `}
            >
              <Icon
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-200
                  group-hover:scale-110
                "
              />

              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div
          className="
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
            p-4
          "
        >
          <p className="text-xs text-zinc-500">
            StockFlow v1.0
          </p>

          <p className="mt-1 text-sm text-zinc-300">
            Manage your inventory smarter.
          </p>
        </div>
      </div>
    </aside>
  );
}