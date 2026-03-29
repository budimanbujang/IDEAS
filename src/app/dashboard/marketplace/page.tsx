import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Button,
} from "@/components/ui";
import { MOCK_MODELS } from "@/config/mock-data";
import { GUILDS } from "@/config/guilds";
import { PageHeader } from "@/components/layout/page-header";
import Link from "next/link";
import { ModelStatus, TrustMarkLevel } from "@/types";

const STATUS_STYLES: Record<ModelStatus, { variant: "default" | "success" | "warning" | "info"; label: string }> = {
  draft: { variant: "default", label: "Draft" },
  testing: { variant: "warning", label: "Testing" },
  certified: { variant: "success", label: "Certified" },
  deployed: { variant: "info", label: "Deployed" },
};

const TRUST_MARK_STYLES: Record<TrustMarkLevel, string> = {
  bronze: "text-amber-700 bg-amber-50 border-amber-200",
  silver: "text-gray-600 bg-gray-50 border-gray-200",
  gold: "text-yellow-700 bg-yellow-50 border-yellow-300",
};

function MarketplaceSearch() {
  "use client";
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search models by name, category, or tag..."
          className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
      </div>
      <div className="flex gap-2">
        <select className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20">
          <option value="">All Guilds</option>
          <option value="healthcare">Healthcare</option>
          <option value="proptech">Proptech</option>
          <option value="agrifood">Agrifood</option>
          <option value="food-services">Food Services</option>
        </select>
        <select className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20">
          <option value="">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="testing">Testing</option>
          <option value="certified">Certified</option>
          <option value="deployed">Deployed</option>
        </select>
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Model Marketplace"
        description="Discover, evaluate, and deploy AI models across all JCorp guilds. Browse certified models with TrustMark verification for enterprise-grade reliability."
        badge={<Badge variant="info">Layer 2</Badge>}
      />

      <Card>
        <CardContent className="p-4">
          <MarketplaceSearch />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {MOCK_MODELS.map((model) => {
          const guild = GUILDS[model.guild];
          const statusStyle = STATUS_STYLES[model.status];

          return (
            <Card key={model.id} className="flex flex-col transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{model.name}</CardTitle>
                  <Badge variant={statusStyle.variant}>{statusStyle.label}</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <Badge variant="default">{model.category}</Badge>
                  {guild && (
                    <Badge variant="guild" guildColor={guild.color}>
                      {guild.name}
                    </Badge>
                  )}
                </div>
                <CardDescription className="pt-1.5">{model.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  {model.metrics.accuracy != null && (
                    <div className="rounded-lg bg-gray-50 px-3 py-2">
                      <p className="text-xs text-gray-500">Accuracy</p>
                      <p className="text-sm font-semibold text-gray-900">{model.metrics.accuracy}%</p>
                    </div>
                  )}
                  {model.metrics.latency != null && (
                    <div className="rounded-lg bg-gray-50 px-3 py-2">
                      <p className="text-xs text-gray-500">Latency</p>
                      <p className="text-sm font-semibold text-gray-900">{model.metrics.latency}ms</p>
                    </div>
                  )}
                  {model.metrics.throughput != null && (
                    <div className="rounded-lg bg-gray-50 px-3 py-2">
                      <p className="text-xs text-gray-500">Throughput</p>
                      <p className="text-sm font-semibold text-gray-900">{model.metrics.throughput}/s</p>
                    </div>
                  )}
                </div>

                {/* Trust Mark */}
                {model.trustMarkLevel && (
                  <div
                    className={cn(
                      "flex items-center gap-2 rounded-lg border px-3 py-2",
                      TRUST_MARK_STYLES[model.trustMarkLevel]
                    )}
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs font-medium capitalize">
                      TrustMark {model.trustMarkLevel}
                    </span>
                  </div>
                )}
              </CardContent>

              <CardFooter className="justify-between border-t border-gray-100 pt-4">
                <span className="text-xs text-gray-400">v{model.version} · {model.updatedAt}</span>
                <Link href={`/dashboard/marketplace/${model.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
