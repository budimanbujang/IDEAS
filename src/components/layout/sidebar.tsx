"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MAIN_NAV, LAYER_NAV, GUILD_NAV } from "@/config/navigation";

const LAYER_COLORS: Record<number, string> = {
  1: "text-orange-600 bg-orange-50",
  2: "text-purple-600 bg-purple-50",
  3: "text-teal-600 bg-teal-50",
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600">
            <span className="text-lg font-bold text-white">I</span>
          </div>
          <div>
            <span className="text-lg font-bold text-gray-900">IDEAS</span>
            <span className="ml-1 text-[10px] text-gray-400 uppercase tracking-wider">Platform</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {/* Main nav */}
        <div className="space-y-1">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <span className="text-base">{getIcon(item.icon)}</span>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Guild shortcuts */}
        <div className="mt-6">
          <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Guilds
          </h4>
          <div className="space-y-1">
            {GUILD_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <span className="text-base">{getIcon(item.icon)}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Layer sections */}
        {LAYER_NAV.map((section) => (
          <div key={section.layer} className="mt-6">
            <h4 className="mb-2 flex items-center gap-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              <span
                className={cn(
                  "inline-flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold",
                  LAYER_COLORS[section.layer]
                )}
              >
                L{section.layer}
              </span>
              {section.label}
            </h4>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <span className="text-base">{getIcon(item.icon)}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-gray-200 p-4">
        <div className="rounded-lg bg-gradient-to-r from-primary-50 to-blue-50 p-3">
          <p className="text-xs font-medium text-primary-700">Phase 1: Foundation</p>
          <p className="mt-0.5 text-[10px] text-gray-500">2026 Roadmap Active</p>
          <div className="mt-2 h-1.5 rounded-full bg-primary-200">
            <div className="h-1.5 w-1/3 rounded-full bg-primary-600" />
          </div>
        </div>
      </div>
    </aside>
  );
}

function getIcon(name: string): string {
  const icons: Record<string, string> = {
    LayoutDashboard: "\u25A6",
    Users: "\u2603",
    Heart: "\u2764",
    Building2: "\u2302",
    Sprout: "\u2618",
    UtensilsCrossed: "\u2616",
    Database: "\u2B27",
    FlaskConical: "\u2697",
    Store: "\u2302",
    BarChart3: "\u2587",
    Handshake: "\u2764",
    ShieldCheck: "\u2713",
  };
  return icons[name] || "\u25CF";
}
