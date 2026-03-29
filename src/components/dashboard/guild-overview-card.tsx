import { cn, formatNumber } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";
import { ProgressBar } from "@/components/ui";
import Link from "next/link";
import type { GuildConfig } from "@/types";

interface GuildOverviewCardProps {
  guild: GuildConfig;
  className?: string;
}

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

const barColorMap: Record<string, string> = {
  emerald: "bg-emerald-500",
  blue: "bg-blue-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
};

export function GuildOverviewCard({ guild, className }: GuildOverviewCardProps) {
  const topKpis = guild.kpis.slice(0, 2);
  const statusVariant = guild.status === "active" ? "success" : "warning";
  const statusLabel = guild.status === "active" ? "Active" : "Planned";

  return (
    <Link href={`/dashboard/guilds/${guild.slug}`} className="block">
      <Card
        className={cn(
          "border-l-4 transition-all hover:shadow-md hover:-translate-y-0.5",
          borderColorMap[guild.color],
          className
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{guild.name}</CardTitle>
            <Badge variant={statusVariant}>{statusLabel}</Badge>
          </div>
          <p className="text-sm text-gray-500">{guild.entity}</p>
        </CardHeader>
        <CardContent>
          <div className={cn("rounded-lg p-3 mb-3", bgAccentMap[guild.color])}>
            <p className="text-xs font-medium text-gray-600 mb-1">Phase {guild.phase}</p>
            <p className="text-xs text-gray-500 line-clamp-2">{guild.description}</p>
          </div>

          <div className="space-y-3">
            {topKpis.map((kpi) => {
              const displayValue = kpi.unit
                ? `${kpi.value}${kpi.unit}`
                : formatNumber(kpi.value);
              return (
                <div key={kpi.key}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 truncate mr-2">{kpi.label}</span>
                    <span className="font-medium text-gray-900 whitespace-nowrap">{displayValue}</span>
                  </div>
                  <ProgressBar
                    value={kpi.value}
                    max={kpi.target}
                    size="sm"
                    barClassName={barColorMap[guild.color]}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">{guild.capabilities.length} capabilities</span>
            <span className="text-xs font-medium text-primary-600">View details &rarr;</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
