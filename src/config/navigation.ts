import { NavigationItem } from "@/types";

export const MAIN_NAV: NavigationItem[] = [
  { label: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Guilds", href: "/dashboard/guilds", icon: "Users" },
];

export const LAYER_NAV: { layer: number; label: string; items: NavigationItem[] }[] = [
  {
    layer: 1,
    label: "Infrastructure",
    items: [
      { label: "Data Fabric", href: "/dashboard/data-fabric", icon: "Database", layer: 1 },
      { label: "Innovation Sandbox", href: "/dashboard/sandbox", icon: "FlaskConical", layer: 1 },
    ],
  },
  {
    layer: 2,
    label: "Intelligence",
    items: [
      { label: "AI Marketplace", href: "/dashboard/marketplace", icon: "Store", layer: 2 },
      { label: "Analytics Engines", href: "/dashboard/analytics", icon: "BarChart3", layer: 2 },
    ],
  },
  {
    layer: 3,
    label: "Engagement",
    items: [
      { label: "Collaboration Hub", href: "/dashboard/collaboration", icon: "Handshake", layer: 3 },
      { label: "Trust Mark", href: "/dashboard/trust-mark", icon: "ShieldCheck", layer: 3 },
    ],
  },
];

export const GUILD_NAV: NavigationItem[] = [
  { label: "Healthcare", href: "/dashboard/guilds/healthcare", icon: "Heart" },
  { label: "Proptech", href: "/dashboard/guilds/proptech", icon: "Building2" },
  { label: "Agrifood", href: "/dashboard/guilds/agrifood", icon: "Sprout" },
  { label: "Food Services", href: "/dashboard/guilds/food-services", icon: "UtensilsCrossed" },
];
