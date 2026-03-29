import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  ProgressBar,
} from "@/components/ui";
import { ROADMAP_PHASES } from "@/config/roadmap";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import type { RoadmapPhase } from "@/types";

const PHASE_STYLES: Record<
  string,
  { border: string; bg: string; accent: string; dot: string; ring: string }
> = {
  completed: {
    border: "border-green-300",
    bg: "bg-green-50",
    accent: "text-green-700",
    dot: "bg-green-600",
    ring: "ring-green-100",
  },
  active: {
    border: "border-primary-300",
    bg: "bg-primary-50",
    accent: "text-primary-700",
    dot: "bg-primary-600",
    ring: "ring-primary-100",
  },
  upcoming: {
    border: "border-gray-200",
    bg: "bg-gray-50",
    accent: "text-gray-500",
    dot: "bg-gray-400",
    ring: "ring-gray-100",
  },
};

const STATUS_BADGE: Record<
  string,
  { variant: "success" | "info" | "default"; label: string }
> = {
  completed: { variant: "success", label: "Completed" },
  active: { variant: "info", label: "In Progress" },
  upcoming: { variant: "default", label: "Upcoming" },
};

function getPhaseProgress(phase: RoadmapPhase): number {
  if (phase.milestones.length === 0) return 0;
  const completed = phase.milestones.filter((m) => m.completed).length;
  return Math.round((completed / phase.milestones.length) * 100);
}

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            IDEAS Roadmap
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            A phased approach to building ASEAN&apos;s leading enterprise AI
            platform
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-gray-400">
            From foundation to commercialization, our three-phase roadmap ensures
            sustainable growth, responsible AI deployment, and measurable value
            creation across all guilds.
          </p>
        </div>
      </section>

      {/* Progress Summary */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {ROADMAP_PHASES.map((phase) => {
            const progress = getPhaseProgress(phase);
            const styles = PHASE_STYLES[phase.status];
            const badge = STATUS_BADGE[phase.status];
            const completedCount = phase.milestones.filter(
              (m) => m.completed
            ).length;

            return (
              <Card key={phase.phase} className={cn("border-2", styles.border)}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white",
                          styles.dot
                        )}
                      >
                        {phase.phase}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {phase.title}
                        </p>
                        <p className="text-xs text-gray-500">{phase.year}</p>
                      </div>
                    </div>
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                  </div>
                  <div className="mt-4">
                    <div className="mb-1 flex justify-between text-xs text-gray-500">
                      <span>
                        {completedCount}/{phase.milestones.length} milestones
                      </span>
                      <span className="font-medium text-gray-900">
                        {progress}%
                      </span>
                    </div>
                    <ProgressBar
                      value={progress}
                      size="sm"
                      barClassName={cn(
                        phase.status === "completed"
                          ? "bg-green-500"
                          : phase.status === "active"
                            ? "bg-primary-500"
                            : "bg-gray-300"
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-2xl font-bold text-gray-900">
          Detailed Timeline
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gray-200 md:block" />

          <div className="space-y-12">
            {ROADMAP_PHASES.map((phase) => {
              const styles = PHASE_STYLES[phase.status];
              const badge = STATUS_BADGE[phase.status];
              const progress = getPhaseProgress(phase);
              const completedCount = phase.milestones.filter(
                (m) => m.completed
              ).length;

              return (
                <div key={phase.phase} className="relative">
                  {/* Phase marker */}
                  <div className="flex items-start gap-6">
                    <div className="relative z-10 hidden md:block">
                      <div
                        className={cn(
                          "flex h-16 w-16 items-center justify-center rounded-full border-4 border-white shadow-md",
                          styles.dot,
                          phase.status === "active" && "ring-4",
                          phase.status === "active" && styles.ring
                        )}
                      >
                        <span className="text-xl font-bold text-white">
                          {phase.phase}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <Card
                        className={cn("overflow-hidden border-l-4", styles.border)}
                      >
                        <CardHeader className={cn(styles.bg)}>
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-3">
                                <span
                                  className={cn(
                                    "text-sm font-bold uppercase tracking-wider",
                                    styles.accent
                                  )}
                                >
                                  Phase {phase.phase}
                                </span>
                                <Badge variant={badge.variant}>
                                  {badge.label}
                                </Badge>
                              </div>
                              <CardTitle className="mt-1 text-xl">
                                {phase.title}
                              </CardTitle>
                              <CardDescription className="mt-1">
                                {phase.year}
                              </CardDescription>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                {progress}%
                              </div>
                              <div className="text-xs text-gray-500">
                                {completedCount}/{phase.milestones.length}{" "}
                                milestones
                              </div>
                            </div>
                          </div>
                          <p className="mt-3 text-sm text-gray-600">
                            {phase.description}
                          </p>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="mb-4">
                            <ProgressBar
                              value={progress}
                              size="md"
                              barClassName={cn(
                                phase.status === "completed"
                                  ? "bg-green-500"
                                  : phase.status === "active"
                                    ? "bg-primary-500"
                                    : "bg-gray-300"
                              )}
                            />
                          </div>
                          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {phase.milestones.map((milestone, mIndex) => (
                              <li
                                key={mIndex}
                                className={cn(
                                  "flex items-start gap-3 rounded-lg border p-3",
                                  milestone.completed
                                    ? "border-green-200 bg-green-50"
                                    : "border-gray-100 bg-gray-50"
                                )}
                              >
                                {milestone.completed ? (
                                  <svg
                                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                  >
                                    <circle cx="12" cy="12" r="9" />
                                  </svg>
                                )}
                                <span
                                  className={cn(
                                    "text-sm",
                                    milestone.completed
                                      ? "font-medium text-gray-900"
                                      : "text-gray-500"
                                  )}
                                >
                                  {milestone.label}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
          >
            Explore the Platform &rarr;
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
