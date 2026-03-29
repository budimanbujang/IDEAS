import { ROADMAP_PHASES } from "@/config/roadmap";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";

export default function RoadmapPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 to-blue-900 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">IDEAS Roadmap</h1>
          <p className="mt-4 text-lg text-blue-200">
            Three-phase journey from foundation to commercialization (2026&ndash;2028)
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Phase progress overview */}
        <div className="mb-12 grid grid-cols-3 gap-4">
          {ROADMAP_PHASES.map((phase) => {
            const completed = phase.milestones.filter((m) => m.completed).length;
            const total = phase.milestones.length;
            const pct = Math.round((completed / total) * 100);
            return (
              <div
                key={phase.phase}
                className={`rounded-lg border p-4 text-center ${
                  phase.status === "active"
                    ? "border-primary-300 bg-primary-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <p className="text-sm font-medium text-gray-500">Phase {phase.phase}</p>
                <p className="text-2xl font-bold text-gray-900">{pct}%</p>
                <p className="text-xs text-gray-500">{completed}/{total} milestones</p>
                <div className="mt-2 h-2 rounded-full bg-gray-200">
                  <div
                    className={`h-2 rounded-full ${
                      phase.status === "active" ? "bg-primary-600" : phase.status === "completed" ? "bg-green-600" : "bg-gray-300"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed phases */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="space-y-12">
            {ROADMAP_PHASES.map((phase) => (
              <div key={phase.phase} className="relative pl-20">
                {/* Timeline node */}
                <div
                  className={`absolute left-5 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${
                    phase.status === "active"
                      ? "bg-primary-600 ring-4 ring-primary-100"
                      : phase.status === "completed"
                      ? "bg-green-600"
                      : "bg-gray-400"
                  }`}
                >
                  {phase.phase}
                </div>

                <div
                  className={`rounded-xl border p-8 ${
                    phase.status === "active"
                      ? "border-primary-200 bg-white shadow-md"
                      : "border-gray-200 bg-white shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Phase {phase.phase}: {phase.title}
                    </h2>
                    <span className="text-lg text-gray-400">({phase.year})</span>
                    {phase.status === "active" && (
                      <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                        Current Phase
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-gray-600">{phase.description}</p>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {phase.milestones.map((milestone, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-3 rounded-lg border p-3 ${
                          milestone.completed
                            ? "border-green-200 bg-green-50"
                            : "border-gray-100 bg-gray-50"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs ${
                            milestone.completed
                              ? "bg-green-600 text-white"
                              : "border-2 border-gray-300 text-gray-300"
                          }`}
                        >
                          {milestone.completed ? "\u2713" : ""}
                        </span>
                        <span
                          className={`text-sm ${
                            milestone.completed ? "font-medium text-green-800" : "text-gray-600"
                          }`}
                        >
                          {milestone.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
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
