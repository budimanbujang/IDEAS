import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";
import { ProgressBar } from "@/components/ui";
import { GUILD_LIST } from "@/config/guilds";
import { MOCK_MODELS, MOCK_CHALLENGES } from "@/config/mock-data";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import type { GuildConfig } from "@/types";

const borderColorMap: Record<string, string> = {
  emerald: "border-l-emerald-500",
  blue: "border-l-blue-500",
  amber: "border-l-amber-500",
  red: "border-l-red-500",
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

const barColorMap: Record<string, string> = {
  emerald: "bg-emerald-500",
  blue: "bg-blue-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
};

function getGuildStats(guild: GuildConfig) {
  const models = MOCK_MODELS.filter((m) => m.guild === guild.slug);
  const challenges = MOCK_CHALLENGES.filter((c) => c.guild === guild.slug);
  return { modelCount: models.length, challengeCount: challenges.length };
}

export default function GuildsIndexPage() {
  const activeGuilds = GUILD_LIST.filter((g) => g.status === "active");
  const plannedGuilds = GUILD_LIST.filter((g) => g.status === "planned");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Guilds</h1>
        <p className="mt-1 text-sm text-gray-500">
          Explore all IDEAS guilds, compare their progress, and drill into individual dashboards.
        </p>
      </div>

      {/* Comparison Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Guild Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-left font-medium text-gray-500">Guild</th>
                  <th className="pb-3 text-left font-medium text-gray-500">Entity</th>
                  <th className="pb-3 text-center font-medium text-gray-500">Phase</th>
                  <th className="pb-3 text-center font-medium text-gray-500">Status</th>
                  <th className="pb-3 text-center font-medium text-gray-500">Models</th>
                  <th className="pb-3 text-center font-medium text-gray-500">Challenges</th>
                  <th className="pb-3 text-left font-medium text-gray-500">Top KPI Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {GUILD_LIST.map((guild) => {
                  const stats = getGuildStats(guild);
                  const topKpi = guild.kpis[0];
                  const kpiPct = Math.round((topKpi.value / topKpi.target) * 100);

                  return (
                    <tr key={guild.slug} className="hover:bg-gray-50">
                      <td className="py-3 pr-4">
                        <Link
                          href={`/dashboard/guilds/${guild.slug}`}
                          className={`font-medium hover:underline ${textColorMap[guild.color]}`}
                        >
                          {guild.name}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-gray-600">{guild.entity}</td>
                      <td className="py-3 text-center">
                        <Badge variant="default">Phase {guild.phase}</Badge>
                      </td>
                      <td className="py-3 text-center">
                        <Badge variant={guild.status === "active" ? "success" : "warning"}>
                          {guild.status === "active" ? "Active" : "Planned"}
                        </Badge>
                      </td>
                      <td className="py-3 text-center font-medium text-gray-900">{stats.modelCount}</td>
                      <td className="py-3 text-center font-medium text-gray-900">{stats.challengeCount}</td>
                      <td className="py-3 pl-4" style={{ minWidth: 180 }}>
                        <div className="flex items-center gap-2">
                          <ProgressBar
                            value={topKpi.value}
                            max={topKpi.target}
                            size="sm"
                            barClassName={barColorMap[guild.color]}
                            className="flex-1"
                          />
                          <span className="text-xs text-gray-500 whitespace-nowrap">{kpiPct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Active Guilds */}
      {activeGuilds.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Active Guilds</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {activeGuilds.map((guild) => {
              const stats = getGuildStats(guild);
              return (
                <Link key={guild.slug} href={`/dashboard/guilds/${guild.slug}`} className="block">
                  <Card
                    className={`border-l-4 transition-all hover:shadow-md hover:-translate-y-0.5 ${borderColorMap[guild.color]}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle>{guild.name}</CardTitle>
                        <Badge variant="success">Active</Badge>
                      </div>
                      <p className="text-sm text-gray-500">{guild.entity} &mdash; {guild.sector}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{guild.description}</p>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {guild.kpis.map((kpi) => {
                          const displayValue = kpi.unit
                            ? `${kpi.value}${kpi.unit}`
                            : formatNumber(kpi.value);
                          return (
                            <div key={kpi.key} className={`rounded-lg p-3 ${bgAccentMap[guild.color]}`}>
                              <p className="text-xs text-gray-500">{kpi.label}</p>
                              <p className={`text-lg font-bold ${textColorMap[guild.color]}`}>{displayValue}</p>
                              <ProgressBar
                                value={kpi.value}
                                max={kpi.target}
                                size="sm"
                                barClassName={barColorMap[guild.color]}
                                className="mt-1"
                              />
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
                        <span>{stats.modelCount} AI models</span>
                        <span>{stats.challengeCount} challenges</span>
                        <span>{guild.capabilities.length} capabilities</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Planned Guilds */}
      {plannedGuilds.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Planned Guilds (Phase 2)</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {plannedGuilds.map((guild) => {
              const stats = getGuildStats(guild);
              return (
                <Link key={guild.slug} href={`/dashboard/guilds/${guild.slug}`} className="block">
                  <Card
                    className={`border-l-4 transition-all hover:shadow-md hover:-translate-y-0.5 ${borderColorMap[guild.color]}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle>{guild.name}</CardTitle>
                        <Badge variant="warning">Planned</Badge>
                      </div>
                      <p className="text-sm text-gray-500">{guild.entity} &mdash; {guild.sector}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{guild.description}</p>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {guild.kpis.map((kpi) => {
                          const displayValue = kpi.unit
                            ? `${kpi.value}${kpi.unit}`
                            : formatNumber(kpi.value);
                          return (
                            <div key={kpi.key} className={`rounded-lg p-3 ${bgAccentMap[guild.color]}`}>
                              <p className="text-xs text-gray-500">{kpi.label}</p>
                              <p className={`text-lg font-bold ${textColorMap[guild.color]}`}>{displayValue}</p>
                              <ProgressBar
                                value={kpi.value}
                                max={kpi.target}
                                size="sm"
                                barClassName={barColorMap[guild.color]}
                                className="mt-1"
                              />
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
                        <span>{stats.modelCount} AI models</span>
                        <span>{stats.challengeCount} challenges</span>
                        <span>{guild.capabilities.length} capabilities</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
