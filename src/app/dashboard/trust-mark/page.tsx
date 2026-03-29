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
import type { TrustMarkLevel } from "@/types";

const LEVEL_CONFIG: Record<TrustMarkLevel, { bg: string; text: string; border: string; icon: string }> = {
  bronze: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300", icon: "B" },
  silver: { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300", icon: "S" },
  gold: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-400", icon: "G" },
};

const LEVEL_TIERS = [
  {
    level: "Bronze" as const,
    color: "border-orange-400 bg-orange-50",
    badgeColor: "bg-orange-100 text-orange-800",
    criteria: [
      "Bias assessment completed",
      "Basic security audit passed",
      "Data privacy compliance verified",
    ],
  },
  {
    level: "Silver" as const,
    color: "border-gray-400 bg-gray-50",
    badgeColor: "bg-gray-200 text-gray-700",
    criteria: [
      "All Bronze criteria met",
      "Explainability documentation provided",
      "Performance benchmarks validated",
      "Third-party security review completed",
    ],
  },
  {
    level: "Gold" as const,
    color: "border-yellow-400 bg-yellow-50",
    badgeColor: "bg-yellow-100 text-yellow-800",
    criteria: [
      "All Silver criteria met",
      "Clinical/domain validation completed",
      "Ethical and Halal compliance certified",
      "Continuous monitoring framework in place",
      "Full audit trail and lineage tracking",
    ],
  },
];

export default function TrustMarkPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="IDEAS Trust Mark"
        description="The IDEAS Trust Mark is a tiered certification framework that ensures AI models deployed within the platform meet rigorous standards for safety, fairness, transparency, and ethical compliance."
        actions={
          <Button>Apply for Certification</Button>
        }
      />

      {/* Certification Levels Overview */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Certification Levels</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {LEVEL_TIERS.map((tier) => (
            <Card key={tier.level} className={cn("border-2", tier.color)}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold", tier.badgeColor)}>
                    {tier.level}
                  </span>
                </div>
                <CardDescription className="mt-2">
                  {tier.level === "Bronze" && "Entry-level certification for basic compliance and safety."}
                  {tier.level === "Silver" && "Intermediate certification with enhanced transparency requirements."}
                  {tier.level === "Gold" && "Highest certification with full ethical and domain validation."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tier.criteria.map((criterion) => (
                    <li key={criterion} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {criterion}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Certified Models Registry */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Certified Models Registry</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {MOCK_CERTIFICATIONS.map((cert) => {
            const levelConfig = LEVEL_CONFIG[cert.level];
            const avgScore = Math.round(
              cert.criteria.reduce((sum, c) => sum + c.score, 0) / cert.criteria.length
            );

            return (
              <Link key={cert.id} href={`/dashboard/trust-mark/${cert.id}`}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{cert.modelName}</CardTitle>
                      <span className={cn("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold uppercase", levelConfig.bg, levelConfig.text)}>
                        {levelConfig.icon} {cert.level}
                      </span>
                    </div>
                    <CardDescription>
                      Overall Score: <span className="font-semibold text-gray-900">{avgScore}%</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {/* Criteria Checklist */}
                      {cert.criteria.map((criterion) => (
                        <div key={criterion.name} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            {criterion.passed ? (
                              <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                            <span className="text-gray-700">{criterion.name}</span>
                          </div>
                          <span className={cn("font-medium", criterion.score >= 90 ? "text-green-600" : criterion.score >= 75 ? "text-blue-600" : "text-yellow-600")}>
                            {criterion.score}%
                          </span>
                        </div>
                      ))}

                      {/* Dates */}
                      <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-3 text-xs text-gray-500">
                        {cert.issuedAt && (
                          <span>
                            Issued: {new Date(cert.issuedAt).toLocaleDateString("en-MY", { year: "numeric", month: "short", day: "numeric" })}
                          </span>
                        )}
                        {cert.expiresAt && (
                          <span>
                            Expires: {new Date(cert.expiresAt).toLocaleDateString("en-MY", { year: "numeric", month: "short", day: "numeric" })}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
