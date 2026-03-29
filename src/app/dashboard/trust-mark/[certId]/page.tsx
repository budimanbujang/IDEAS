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
import { MOCK_CERTIFICATIONS } from "@/config/mock-data";
import { PageHeader } from "@/components/layout/page-header";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { TrustMarkLevel } from "@/types";

const LEVEL_CONFIG: Record<TrustMarkLevel, { bg: string; text: string; ring: string; label: string }> = {
  bronze: { bg: "bg-orange-100", text: "text-orange-800", ring: "ring-orange-300", label: "Bronze" },
  silver: { bg: "bg-gray-100", text: "text-gray-700", ring: "ring-gray-300", label: "Silver" },
  gold: { bg: "bg-yellow-100", text: "text-yellow-800", ring: "ring-yellow-400", label: "Gold" },
};

const STATUS_MAP: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending" },
  review: { bg: "bg-blue-100", text: "text-blue-800", label: "Under Review" },
  certified: { bg: "bg-green-100", text: "text-green-800", label: "Certified" },
  expired: { bg: "bg-red-100", text: "text-red-800", label: "Expired" },
};

interface PageProps {
  params: Promise<{ certId: string }>;
}

export default async function CertificationDetailPage({ params }: PageProps) {
  const { certId } = await params;
  const cert = MOCK_CERTIFICATIONS.find((c) => c.id === certId);

  if (!cert) {
    notFound();
  }

  const levelConfig = LEVEL_CONFIG[cert.level];
  const statusConfig = STATUS_MAP[cert.status] ?? STATUS_MAP.pending;
  const avgScore = Math.round(
    cert.criteria.reduce((sum, c) => sum + c.score, 0) / cert.criteria.length
  );
  const allPassed = cert.criteria.every((c) => c.passed);

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/dashboard/trust-mark" className="hover:text-gray-700">
          Trust Mark
        </Link>
        <span>/</span>
        <span className="text-gray-900">{cert.modelName}</span>
      </nav>

      <PageHeader
        title={cert.modelName}
        badge={
          <div className="flex items-center gap-2">
            <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase", levelConfig.bg, levelConfig.text)}>
              {levelConfig.label}
            </span>
            <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", statusConfig.bg, statusConfig.text)}>
              {statusConfig.label}
            </span>
          </div>
        }
        description={`Trust Mark certification details for model ${cert.modelId}`}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Assessment</CardTitle>
              <CardDescription>
                Aggregate score across all certification criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8">
                <div className="flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full border-4 border-gray-200 bg-white">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{avgScore}%</div>
                    <div className="text-xs text-gray-500">Overall</div>
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-32 text-gray-500">Criteria Passed</span>
                    <span className="font-medium text-gray-900">
                      {cert.criteria.filter((c) => c.passed).length} / {cert.criteria.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-32 text-gray-500">All Passed</span>
                    <span className={cn("font-medium", allPassed ? "text-green-600" : "text-yellow-600")}>
                      {allPassed ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-32 text-gray-500">Certification Level</span>
                    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase", levelConfig.bg, levelConfig.text)}>
                      {levelConfig.label}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Criteria */}
          <Card>
            <CardHeader>
              <CardTitle>Criteria Breakdown</CardTitle>
              <CardDescription>
                Detailed scores for each certification criterion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {cert.criteria.map((criterion) => (
                  <div key={criterion.name}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {criterion.passed ? (
                          <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        <span className="text-sm font-medium text-gray-900">{criterion.name}</span>
                      </div>
                      <span className={cn(
                        "text-sm font-semibold",
                        criterion.score >= 90 ? "text-green-600" : criterion.score >= 75 ? "text-blue-600" : "text-yellow-600"
                      )}>
                        {criterion.score}%
                      </span>
                    </div>
                    <ProgressBar
                      value={criterion.score}
                      size="sm"
                      barClassName={cn(
                        criterion.score >= 90 ? "bg-green-500" : criterion.score >= 75 ? "bg-blue-500" : "bg-yellow-500"
                      )}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Certification Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Certification Info</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Certification ID</dt>
                  <dd className="mt-1 text-sm font-mono text-gray-900">{cert.id}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Model ID</dt>
                  <dd className="mt-1 text-sm font-mono text-gray-900">{cert.modelId}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", statusConfig.bg, statusConfig.text)}>
                      {statusConfig.label}
                    </span>
                  </dd>
                </div>
                {cert.issuedAt && (
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Issued Date</dt>
                    <dd className="mt-1 text-sm text-gray-700">
                      {new Date(cert.issuedAt).toLocaleDateString("en-MY", { year: "numeric", month: "long", day: "numeric" })}
                    </dd>
                  </div>
                )}
                {cert.expiresAt && (
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Expiry Date</dt>
                    <dd className="mt-1 text-sm font-medium text-red-600">
                      {new Date(cert.expiresAt).toLocaleDateString("en-MY", { year: "numeric", month: "long", day: "numeric" })}
                    </dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-center" disabled>
                  Download Certificate
                </Button>
                <Button variant="outline" className="w-full justify-center" disabled>
                  Request Re-evaluation
                </Button>
                <Button variant="outline" className="w-full justify-center" disabled>
                  View Audit Trail
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
