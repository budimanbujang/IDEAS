import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuild, GUILDS } from "@/config/guilds";
import { MOCK_MODELS, MOCK_CHALLENGES } from "@/config/mock-data";
import { Card, CardHeader, CardTitle, CardContent, Badge, ProgressBar } from "@/components/ui";
import { KPICard } from "@/components/dashboard/kpi-card";
import { formatNumber } from "@/lib/utils";
import type { GuildSlug } from "@/types";

const statusBadgeVariant: Record<string, "success" | "warning" | "info" | "default"> = {
  active: "success",
  planned: "warning",
  scaling: "info",
};

const modelStatusVariant: Record<string, "success" | "warning" | "info" | "default" | "danger"> = {
  deployed: "success",
  certified: "info",
  testing: "warning",
  draft: "default",
};

const challengeStatusVariant: Record<string, "success" | "warning" | "info" | "default"> = {
  open: "info",
  in_progress: "warning",
  completed: "success",
  closed: "default",
};

const challengeStatusLabel: Record<string, string> = {
  open: "Open",
  in_progress: "In Progress",
  completed: "Completed",
  closed: "Closed",
};

const barColorMap: Record<string, string> = {
  emerald: "bg-emerald-500",
  blue: "bg-blue-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
};

const bgAccentMap: Record<string, string> = {
  emerald: "bg-emerald-50",
  blue: "bg-blue-50",
  amber: "bg-amber-50",
  red: "bg-red-50",
};

const textColorMap: Record<string, string> = {
  emerald: "text-emerald-700",
  blue: "text-blue-700",
  amber: "text-amber-700",
  red: "text-red-700",
};

const borderColorMap: Record<string, string> = {
  emerald: "border-emerald-200",
  blue: "border-blue-200",
  amber: "border-amber-200",
  red: "border-red-200",
};

export function generateStaticParams() {
  return Object.keys(GUILDS).map((slug) => ({ slug }));
}

export default function GuildDetailPage({ params }: { params: { slug: string } }) {
  const guild = getGuild(params.slug);

  if (!guild) {
    notFound();
  }

  const guildModels = MOCK_MODELS.filter((m) => m.guild === (guild.slug as GuildSlug));
  const guildChallenges = MOCK_CHALLENGES.filter((c) => c.guild === (guild.slug as GuildSlug));

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/dashboard" className="hover:text-gray-700">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/dashboard/guilds" className="hover:text-gray-700">
          Guilds
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{guild.name}</span>
      </nav>

      {/* Guild Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{guild.name}</h1>
            <Badge variant={statusBadgeVariant[guild.status] ?? "default"}>
              {guild.status === "active" ? "Active" : guild.status === "planned" ? "Planned" : "Scaling"}
            </Badge>
            <Badge variant="default">Phase {guild.phase}</Badge>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {guild.entity} &mdash; {guild.sector}
          </p>
          <p className="mt-2 text-sm text-gray-600 max-w-2xl">{guild.description}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/guilds"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            &larr; All Guilds
          </Link>
        </div>
      </div>

      {/* KPI Grid */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Key Performance Indicators</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guild.kpis.map((kpi) => (
            <KPICard key={kpi.key} kpi={kpi} guildColor={guild.color} />
          ))}
        </div>
      </div>

      {/* Capabilities */}
      <Card>
        <CardHeader>
          <CardTitle>Capabilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {guild.capabilities.map((capability) => (
              <div
                key={capability}
                className={`flex items-center gap-2 rounded-lg border p-3 ${bgAccentMap[guild.color]} ${borderColorMap[guild.color]}`}
              >
                <svg
                  className={`h-4 w-4 flex-shrink-0 ${textColorMap[guild.color]}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-gray-700">{capability}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* AI Models */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>AI Models</CardTitle>
              <span className="text-sm text-gray-500">{guildModels.length} models</span>
            </div>
          </CardHeader>
          <CardContent>
            {guildModels.length === 0 ? (
              <p className="text-sm text-gray-400">No models registered yet.</p>
            ) : (
              <div className="space-y-4">
                {guildModels.map((model) => (
                  <div
                    key={model.id}
                    className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">{model.name}</h4>
                        <p className="mt-0.5 text-xs text-gray-500">{model.category} &middot; v{model.version}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {model.trustMarkLevel && (
                          <Badge variant="guild" guildColor={model.trustMarkLevel === "gold" ? "amber" : model.trustMarkLevel === "silver" ? "blue" : "emerald"}>
                            {model.trustMarkLevel.charAt(0).toUpperCase() + model.trustMarkLevel.slice(1)} TM
                          </Badge>
                        )}
                        <Badge variant={modelStatusVariant[model.status] ?? "default"}>
                          {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-gray-600 line-clamp-2">{model.description}</p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                      {model.metrics.accuracy != null && (
                        <span>Accuracy: {model.metrics.accuracy}%</span>
                      )}
                      {model.metrics.latency != null && (
                        <span>Latency: {model.metrics.latency}ms</span>
                      )}
                      {model.metrics.throughput != null && (
                        <span>Throughput: {formatNumber(model.metrics.throughput)}/s</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Challenges */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Challenges</CardTitle>
              <span className="text-sm text-gray-500">{guildChallenges.length} challenges</span>
            </div>
          </CardHeader>
          <CardContent>
            {guildChallenges.length === 0 ? (
              <p className="text-sm text-gray-400">No challenges posted yet.</p>
            ) : (
              <div className="space-y-4">
                {guildChallenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-semibold text-gray-900">{challenge.title}</h4>
                      <Badge variant={challengeStatusVariant[challenge.status] ?? "default"}>
                        {challengeStatusLabel[challenge.status] ?? challenge.status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-xs text-gray-600 line-clamp-2">{challenge.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>By {challenge.postedBy}</span>
                        <span>{challenge.submissions} submissions</span>
                      </div>
                      {challenge.deadline && (
                        <span className="text-xs text-gray-400">
                          Due: {new Date(challenge.deadline).toLocaleDateString("en-MY", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      )}
                    </div>
                    {challenge.matchScore != null && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-500">Match Score</span>
                          <span className="font-medium text-gray-700">{challenge.matchScore}%</span>
                        </div>
                        <ProgressBar
                          value={challenge.matchScore}
                          max={100}
                          size="sm"
                          barClassName={barColorMap[guild.color]}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
