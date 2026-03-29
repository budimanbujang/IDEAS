import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  ProgressBar,
  Button,
} from "@/components/ui";
import { MOCK_MODELS, MOCK_CERTIFICATIONS } from "@/config/mock-data";
import { GUILDS } from "@/config/guilds";
import { PageHeader } from "@/components/layout/page-header";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ModelStatus, TrustMarkLevel } from "@/types";

const STATUS_CONFIG: Record<ModelStatus, { variant: "default" | "success" | "warning" | "info"; label: string }> = {
  draft: { variant: "default", label: "Draft" },
  testing: { variant: "warning", label: "Testing" },
  certified: { variant: "success", label: "Certified" },
  deployed: { variant: "info", label: "Deployed" },
};

const TRUST_MARK_COLORS: Record<TrustMarkLevel, string> = {
  bronze: "border-amber-300 bg-amber-50 text-amber-800",
  silver: "border-gray-300 bg-gray-50 text-gray-700",
  gold: "border-yellow-400 bg-yellow-50 text-yellow-800",
};

export function generateStaticParams() {
  return MOCK_MODELS.map((m) => ({ modelId: m.id }));
}

export default function ModelDetailPage({ params }: { params: { modelId: string } }) {
  const { modelId } = params;
  const model = MOCK_MODELS.find((m) => m.id === modelId);

  if (!model) {
    notFound();
  }

  const guild = GUILDS[model.guild];
  const statusConfig = STATUS_CONFIG[model.status];
  const certification = MOCK_CERTIFICATIONS.find((c) => c.modelId === model.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/dashboard/marketplace" className="hover:text-primary-600">
          Marketplace
        </Link>
        <span>/</span>
        <span className="text-gray-900">{model.name}</span>
      </div>

      <PageHeader
        title={model.name}
        description={model.description}
        badge={<Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>}
        actions={
          <div className="flex gap-2">
            {model.status === "certified" || model.status === "deployed" ? (
              <Button variant="primary">Deploy Model</Button>
            ) : (
              <Button variant="outline" disabled>
                Not Available for Deployment
              </Button>
            )}
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Overview Card */}
          <Card>
            <CardHeader>
              <CardTitle>Model Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <p className="text-xs font-medium text-gray-500">Category</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">{model.category}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Guild</p>
                  <div className="mt-1">
                    {guild && (
                      <Badge variant="guild" guildColor={guild.color}>
                        {guild.name}
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Version</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">v{model.version}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Last Updated</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">{model.updatedAt}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">Tags</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {model.tags.map((tag) => (
                    <Badge key={tag} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key model performance indicators from evaluation benchmarks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-3">
                {model.metrics.accuracy != null && (
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Accuracy</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{model.metrics.accuracy}%</p>
                    <div className="mt-2">
                      <ProgressBar value={model.metrics.accuracy} max={100} />
                    </div>
                  </div>
                )}
                {model.metrics.latency != null && (
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Latency</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                      {model.metrics.latency}
                      <span className="ml-1 text-base font-normal text-gray-500">ms</span>
                    </p>
                    <p className="mt-2 text-xs text-gray-500">Average response time</p>
                  </div>
                )}
                {model.metrics.throughput != null && (
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Throughput</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                      {model.metrics.throughput}
                      <span className="ml-1 text-base font-normal text-gray-500">/sec</span>
                    </p>
                    <p className="mt-2 text-xs text-gray-500">Requests per second</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* TrustMark Certification */}
          {certification && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>TrustMark Certification</CardTitle>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold capitalize",
                      TRUST_MARK_COLORS[certification.level]
                    )}
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {certification.level} Certified
                  </span>
                </div>
                <CardDescription>
                  Issued {certification.issuedAt} · Expires {certification.expiresAt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {certification.criteria.map((criterion) => (
                    <div key={criterion.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "flex h-5 w-5 items-center justify-center rounded-full text-xs",
                            criterion.passed
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          )}
                        >
                          {criterion.passed ? "\u2713" : "\u2717"}
                        </span>
                        <span className="text-sm text-gray-700">{criterion.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24">
                          <ProgressBar value={criterion.score} max={100} />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{criterion.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Deployment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Deployment Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Version</span>
                <span className="text-sm font-medium text-gray-900">v{model.version}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Guild</span>
                <span className="text-sm font-medium text-gray-900">{guild?.name}</span>
              </div>
              {model.trustMarkLevel && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">TrustMark</span>
                  <span className="text-sm font-medium capitalize text-gray-900">
                    {model.trustMarkLevel}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Updated</span>
                <span className="text-sm font-medium text-gray-900">{model.updatedAt}</span>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-100 pt-4">
              {model.status === "deployed" ? (
                <Badge variant="info" className="w-full justify-center py-1.5">
                  Currently Deployed
                </Badge>
              ) : model.status === "certified" ? (
                <Button variant="primary" className="w-full">
                  Deploy to Production
                </Button>
              ) : (
                <Button variant="outline" className="w-full" disabled>
                  Pending Certification
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {model.metrics.accuracy != null && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Accuracy</span>
                  <span className="text-sm font-semibold text-gray-900">{model.metrics.accuracy}%</span>
                </div>
              )}
              {model.metrics.latency != null && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Latency</span>
                  <span className="text-sm font-semibold text-gray-900">{model.metrics.latency}ms</span>
                </div>
              )}
              {model.metrics.throughput != null && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Throughput</span>
                  <span className="text-sm font-semibold text-gray-900">{model.metrics.throughput}/s</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Related Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                View API Documentation
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Download Model Card
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Request Access
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
