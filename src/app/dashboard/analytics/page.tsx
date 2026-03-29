import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button } from "@/components/ui";
import Link from "next/link";

const ENGINES = [
  {
    name: "Genomics Engine",
    description: "Whole genome sequencing analysis, pharmacogenomics, and rare disease identification powered by the Healthcare Guild.",
    guild: "Healthcare",
    status: "active",
    models: 3,
    color: "emerald",
    capabilities: [
      "Variant calling & annotation",
      "Pharmacogenomic profiling",
      "Rare disease screening",
      "Population genetics analysis",
    ],
    metrics: { analyses: "1,200+", accuracy: "99.1%", avgTime: "4.2 hrs" },
  },
  {
    name: "Real-World Evidence Engine",
    description: "Generate real-world evidence from clinical data across KPJ's hospital network for drug safety and treatment effectiveness studies.",
    guild: "Healthcare",
    status: "active",
    models: 2,
    color: "emerald",
    capabilities: [
      "Treatment outcome analysis",
      "Drug safety signal detection",
      "Patient cohort identification",
      "Comparative effectiveness research",
    ],
    metrics: { studies: "15", patients: "2.4M", publications: "3" },
  },
  {
    name: "Demand Forecasting Engine",
    description: "Hyper-local demand prediction combining weather, events, historical sales, and location intelligence for QSR operations.",
    guild: "Food Services",
    status: "testing",
    models: 2,
    color: "red",
    capabilities: [
      "Daily demand prediction per outlet",
      "Menu item-level forecasting",
      "Weather & event impact modeling",
      "Food waste prediction",
    ],
    metrics: { outlets: "120", accuracy: "89.5%", wasteReduction: "12%" },
  },
  {
    name: "Plantortion Intelligence",
    description: "Precision agriculture analytics combining satellite imagery, IoT sensor data, and agronomic models for yield optimization.",
    guild: "Agrifood",
    status: "testing",
    models: 2,
    color: "amber",
    capabilities: [
      "Yield prediction modeling",
      "Optimal harvest scheduling",
      "Soil health assessment",
      "Satellite imagery analysis",
    ],
    metrics: { hectares: "15,000", sensors: "2,400", yieldImprovement: "8.2%" },
  },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Analytics Engines"
        description="Specialized AI-powered analytics engines that transform raw data into actionable insights across all guilds."
        badge={<Badge variant="info">Layer 2 - Intelligence</Badge>}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {ENGINES.map((engine) => (
          <Card key={engine.name} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{engine.name}</CardTitle>
                  <CardDescription className="mt-1">{engine.guild} Guild</CardDescription>
                </div>
                <Badge variant={engine.status === "active" ? "success" : "warning"}>
                  {engine.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-gray-600">{engine.description}</p>

              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Capabilities</p>
                <ul className="mt-2 space-y-1.5">
                  {engine.capabilities.map((cap) => (
                    <li key={cap} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className={`text-${engine.color}-500`}>&#10003;</span>
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 rounded-lg bg-gray-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Key Metrics</p>
                <div className="mt-2 flex flex-wrap gap-4">
                  {Object.entries(engine.metrics).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-lg font-bold text-gray-900">{value}</p>
                      <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>{engine.models} AI models</span>
                <Link href="/dashboard/marketplace" className="text-primary-600 hover:text-primary-700">
                  View models &rarr;
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
