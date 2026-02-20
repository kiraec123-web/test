"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coffee, ClipboardList, BarChart3 } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Order", icon: Coffee },
  { href: "/barista", label: "Barista", icon: ClipboardList },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
] as const;

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-border bg-brand-bg-card md:static md:border-t-0 md:border-r md:w-20 md:min-h-screen md:flex md:flex-col md:items-center md:pt-6">
      <ul className="flex justify-around py-2 md:flex-col md:gap-6 md:py-0">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex flex-col items-center gap-1 px-3 py-1 text-xs font-medium transition-colors ${
                  isActive
                    ? "text-brand-primary"
                    : "text-brand-text-muted hover:text-brand-text"
                }`}
              >
                <Icon size={20} strokeWidth={1.5} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
