import { GuildConfig } from "@/types";

export const GUILDS: Record<string, GuildConfig> = {
  healthcare: {
    slug: "healthcare",
    name: "Healthcare Guild",
    entity: "KPJ Health System",
    description:
      "Focused on clinical AI, genomics, and value-based care models leveraging KPJ's 30+ hospitals.",
    sector: "Healthcare",
    icon: "Heart",
    color: "emerald",
    gradientClass: "gradient-healthcare",
    phase: 1,
    status: "active",
    kpis: [
      { key: "hospitals_connected", label: "Hospitals Connected", value: 24, target: 30, trend: "up" },
      { key: "clinical_ai_models", label: "Clinical AI Models", value: 7, target: 15, trend: "up" },
      { key: "patient_records", label: "Patient Records Digitized", value: 2400000, target: 5000000, unit: "records", trend: "up" },
      { key: "genomic_analyses", label: "Genomic Analyses", value: 1200, target: 5000, trend: "up" },
    ],
    capabilities: [
      "Clinical AI diagnostics",
      "Genomic sequencing & analysis",
      "Real-world evidence generation",
      "Value-based care optimization",
      "Medical imaging AI",
      "Drug interaction prediction",
    ],
  },
  proptech: {
    slug: "proptech",
    name: "Proptech Guild",
    entity: "JLand Group",
    description:
      'Using "IBTEC Digital Twin" for township management, smart building energy optimization, and predictive maintenance.',
    sector: "Real Estate & Property",
    icon: "Building2",
    color: "blue",
    gradientClass: "gradient-proptech",
    phase: 1,
    status: "active",
    kpis: [
      { key: "buildings_monitored", label: "Buildings Monitored", value: 48, target: 100, trend: "up" },
      { key: "energy_savings", label: "Energy Savings", value: 18.5, target: 30, unit: "%", trend: "up" },
      { key: "predictive_alerts", label: "Predictive Maintenance Alerts", value: 340, target: 500, trend: "up" },
      { key: "digital_twins", label: "Digital Twins Deployed", value: 12, target: 25, trend: "up" },
    ],
    capabilities: [
      "IBTEC Digital Twin platform",
      "Smart building energy optimization",
      "Predictive maintenance AI",
      "Township management analytics",
      "Occupancy & space utilization",
      "ESG compliance monitoring",
    ],
  },
  agrifood: {
    slug: "agrifood",
    name: "Agrifood Guild",
    entity: "JPO/Kulim",
    description:
      'Implementing precision agriculture and "Plantortion Intelligence" for yield optimization and ESG reporting.',
    sector: "Agriculture & Food Production",
    icon: "Sprout",
    color: "amber",
    gradientClass: "gradient-agrifood",
    phase: 2,
    status: "planned",
    kpis: [
      { key: "hectares_monitored", label: "Hectares Monitored", value: 15000, target: 50000, trend: "stable" },
      { key: "yield_improvement", label: "Yield Improvement", value: 8.2, target: 20, unit: "%", trend: "up" },
      { key: "esg_score", label: "ESG Score", value: 72, target: 90, trend: "up" },
      { key: "sensors_deployed", label: "IoT Sensors Deployed", value: 2400, target: 10000, trend: "up" },
    ],
    capabilities: [
      "Precision agriculture AI",
      "Plantortion Intelligence engine",
      "Yield optimization models",
      "ESG reporting automation",
      "Satellite imagery analysis",
      "Supply chain optimization",
    ],
  },
  "food-services": {
    slug: "food-services",
    name: "Food Services Guild",
    entity: "QSR Brands",
    description:
      'Utilizing hyper-local demand forecasting to reduce food waste and building a "Farm-to-Fork" Halal traceability system.',
    sector: "Food Services & QSR",
    icon: "UtensilsCrossed",
    color: "red",
    gradientClass: "gradient-foodservices",
    phase: 2,
    status: "planned",
    kpis: [
      { key: "outlets_connected", label: "Outlets Connected", value: 120, target: 500, trend: "stable" },
      { key: "food_waste_reduction", label: "Food Waste Reduction", value: 12, target: 35, unit: "%", trend: "up" },
      { key: "forecast_accuracy", label: "Demand Forecast Accuracy", value: 82, target: 95, unit: "%", trend: "up" },
      { key: "halal_traced", label: "Products Halal-Traced", value: 450, target: 2000, trend: "up" },
    ],
    capabilities: [
      "Hyper-local demand forecasting",
      "Food waste reduction AI",
      "Farm-to-Fork traceability",
      "Halal certification tracking",
      "Menu optimization engine",
      "Supply chain visibility",
    ],
  },
};

export const GUILD_LIST = Object.values(GUILDS);

export function getGuild(slug: string): GuildConfig | undefined {
  return GUILDS[slug];
}
