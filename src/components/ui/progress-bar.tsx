import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ProgressBar({
  value,
  max = 100,
  className,
  barClassName,
  showLabel = false,
  size = "md",
}: ProgressBarProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-1 flex justify-between text-sm">
          <span className="text-gray-600">{value} / {max}</span>
          <span className="font-medium text-gray-900">{percentage}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full rounded-full bg-gray-200",
          { "h-1.5": size === "sm", "h-2.5": size === "md", "h-4": size === "lg" }
        )}
      >
        <div
          className={cn(
            "rounded-full bg-primary-600 transition-all duration-500",
            { "h-1.5": size === "sm", "h-2.5": size === "md", "h-4": size === "lg" },
            barClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
