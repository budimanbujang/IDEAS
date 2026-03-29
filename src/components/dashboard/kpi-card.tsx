import { cn, formatNumber } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui";
import { ProgressBar } from "@/components/ui";
import type { KPIDefinition } from "@/types";

interface KPICardProps {
  kpi: KPIDefinition;
  guildColor?: string;
  className?: string;
}

const colorMap: Record<string, string> = {
  emerald: "text-emerald-600",
  blue: "text-blue-600",
  amber: "text-amber-600",
  red: "text-red-600",
};

const barColorMap: Record<string, string> = {
  emerald: "bg-emerald-500",
  blue: "bg-blue-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
};

function TrendIndicator({ trend }: { trend?: "up" | "down" | "stable" }) {
  if (!trend) return null;
  if (trend === "up") {
    return (
      <span className="inline-flex items-center text-xs font-medium text-green-600">
        <svg className="mr-0.5 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
        Up
      </span>
    );
  }
  if (trend === "down") {
    return (
      <span className="inline-flex items-center text-xs font-medium text-red-600">
        <svg className="mr-0.5 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        Down
      </span>
    );
  }
  return (
    <span className="inline-flex items-center text-xs font-medium text-gray-500">
      <svg className="mr-0.5 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
      </svg>
      Stable
    </span>
  );
}

export function KPICard({ kpi, guildColor, className }: KPICardProps) {
  const percentage = Math.round((kpi.value / kpi.target) * 100);
  const displayValue = kpi.unit
    ? `${kpi.value}${kpi.unit}`
    : formatNumber(kpi.value);
  const displayTarget = kpi.unit
    ? `${kpi.target}${kpi.unit}`
    : formatNumber(kpi.target);

  return (
    <Card className={cn("transition-shadow hover:shadow-md", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium text-gray-500">{kpi.label}</p>
          <TrendIndicator trend={kpi.trend} />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <p className={cn("text-2xl font-bold text-gray-900", guildColor && colorMap[guildColor])}>
            {displayValue}
          </p>
          <p className="text-sm text-gray-400">/ {displayTarget}</p>
        </div>
        <div className="mt-3">
          <ProgressBar
            value={kpi.value}
            max={kpi.target}
            size="sm"
            barClassName={guildColor ? barColorMap[guildColor] : undefined}
          />
        </div>
        <p className="mt-1.5 text-xs text-gray-400">{percentage}% of target</p>
      </CardContent>
    </Card>
  );
}
