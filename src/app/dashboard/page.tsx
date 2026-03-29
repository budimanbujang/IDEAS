import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";
import { ProgressBar } from "@/components/ui";
import { GUILD_LIST } from "@/config/guilds";
import { MOCK_MODELS, MOCK_CHALLENGES } from "@/config/mock-data";
import { ROADMAP_PHASES } from "@/config/roadmap";
import { GuildOverviewCard } from "@/components/dashboard/guild-overview-card";
import Link from "next/link";

const summaryKpis = [
  {
    label: "Total AI Models",
    value: "8",
    description: "Across all guilds",
    icon: (
      <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 01-1.591.659H9.061a2.25 2.25 0 01-1.591-.659L5 14.5m14 0V17a2 2 0 01-2 2H7a2 2 0 01-2-2v-2.5" />
      </svg>
    ),
    bgColor: "bg-purple-50",
  },
  {
    label: "Active Guilds",
    value: "2/4",
    description: "Healthcare & Proptech",
    icon: (
      <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    bgColor: "bg-blue-50",
  },
  {
    label: "Challenges",
    value: "4",
    description: "1 in progress, 3 open",
    icon: (
      <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    bgColor: "bg-amber-50",
  },
  {
    label: "Trust Mark Certifications",
    value: "2",
    description: "Both Gold level",
    icon: (
      <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    bgColor: "bg-emerald-50",
  },
];

const recentActivity = [
  {
    id: 1,
    text: "ClinicalDX Radiology model achieved Gold Trust Mark certification",
    guild: "Healthcare",
    time: "2 weeks ago",
    type: "certification" as const,
  },
  {
    id: 2,
    text: "Smart HVAC Optimization challenge received 5 submissions",
    guild: "Proptech",
    time: "3 weeks ago",
    type: "challenge" as const,
  },
  {
    id: 3,
    text: "Plantortion Intelligence model entered testing phase",
    guild: "Agrifood",
    time: "1 week ago",
    type: "model" as const,
  },
  {
    id: 4,
    text: "DemandCast QSR model updated to v1.2.0 with improved accuracy",
    guild: "Food Services",
    time: "1 week ago",
    type: "model" as const,
  },
  {
    id: 5,
    text: "New challenge posted: Food Waste Reduction Dashboard",
    guild: "Food Services",
    time: "3 weeks ago",
    type: "challenge" as const,
  },
];

const activityIcons: Record<string, string> = {
  certification: "text-emerald-500",
  challenge: "text-amber-500",
  model: "text-purple-500",
};

export default function DashboardPage() {
  const activePhase = ROADMAP_PHASES.find((p) => p.status === "active");

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">IDEAS Platform Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Johor Corporation AI Innovation Ecosystem &mdash; Executive Overview
          </p>
        </div>
        {activePhase && (
          <Badge variant="info" className="self-start px-3 py-1 text-sm">
            Phase {activePhase.phase}: {activePhase.title} ({activePhase.year})
          </Badge>
        )}
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryKpis.map((kpi) => (
          <Card key={kpi.label} className="transition-shadow hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${kpi.bgColor}`}>
                  {kpi.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{kpi.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-400">{kpi.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Guild Overview Grid */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Guild Overview</h2>
          <Link
            href="/dashboard/guilds"
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            View all guilds &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {GUILD_LIST.map((guild) => (
            <GuildOverviewCard key={guild.slug} guild={guild} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          item.type === "certification"
                            ? "bg-emerald-500"
                            : item.type === "challenge"
                            ? "bg-amber-500"
                            : "bg-purple-500"
                        }`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-700">{item.text}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs text-gray-400">{item.guild}</span>
                        <span className="text-xs text-gray-300">&middot;</span>
                        <span className="text-xs text-gray-400">{item.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Phase Progress */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Roadmap Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {ROADMAP_PHASES.map((phase) => {
                  const completedCount = phase.milestones.filter((m) => m.completed).length;
                  const totalCount = phase.milestones.length;
                  const percentage = Math.round((completedCount / totalCount) * 100);

                  return (
                    <div key={phase.phase}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">
                            Phase {phase.phase}: {phase.title}
                          </span>
                          {phase.status === "active" && (
                            <Badge variant="success" className="text-[10px]">
                              Active
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{phase.year}</span>
                      </div>
                      <ProgressBar
                        value={completedCount}
                        max={totalCount}
                        size="sm"
                        barClassName={
                          phase.status === "active"
                            ? "bg-blue-500"
                            : phase.status === "completed"
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }
                      />
                      <p className="mt-1 text-xs text-gray-400">
                        {completedCount}/{totalCount} milestones ({percentage}%)
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
