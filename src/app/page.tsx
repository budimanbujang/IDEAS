import Link from "next/link";
import { GUILD_LIST } from "@/config/guilds";
import { ROADMAP_PHASES } from "@/config/roadmap";
import { Footer } from "@/components/layout/footer";

const GUILD_COLORS: Record<string, string> = {
  emerald: "from-emerald-500 to-teal-600 border-emerald-200",
  blue: "from-blue-500 to-indigo-600 border-blue-200",
  amber: "from-amber-500 to-orange-600 border-amber-200",
  red: "from-red-500 to-rose-600 border-red-200",
};

const GUILD_BG: Record<string, string> = {
  emerald: "bg-emerald-50",
  blue: "bg-blue-50",
  amber: "bg-amber-50",
  red: "bg-red-50",
};

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-blue-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6TTAgMzR2MmgydjItMlYzNEgwem0wLTJ2MmgyVjMySDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm text-blue-200 backdrop-blur">
              Phase 1: Foundation &mdash; 2026
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Orchestrating the Future
              <br />
              <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                of AI Innovation
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-200">
              IDEAS is JCorp&apos;s Integrated Discovery, Engagement &amp; Acceleration System &mdash;
              a strategic framework transforming JCorp from a consumer to a producer of the regional
              AI innovation ecosystem.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/dashboard"
                className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-lg transition hover:bg-blue-50"
              >
                Enter Platform
              </Link>
              <Link
                href="/roadmap"
                className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                View Roadmap
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Shift Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">The Strategic Shift</h2>
          <p className="mt-3 text-lg text-gray-500">From horizontal consumer to vertical producer</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <span className="text-2xl">&#127758;</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Singapore&apos;s Horizontal Breadth</h3>
            <p className="mt-2 text-sm text-gray-500">
              Sector-agnostic and broad NAIS 2.0 ecosystem offering S$150M in compute credits &amp; grants.
            </p>
          </div>
          <div className="rounded-xl border-2 border-primary-200 bg-primary-50 p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-100">
              <span className="text-2xl">&#128161;</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-primary-900">JCorp&apos;s Vertical Depth</h3>
            <p className="mt-2 text-sm text-primary-700">
              IDEAS embeds AI directly into owned operations across healthcare, agrifood, and real
              estate via the &ldquo;One JCorp&rdquo; framework.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <span className="text-2xl">&#128273;</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">The Ownership Advantage</h3>
            <p className="mt-2 text-sm text-gray-500">
              Organic data access and top-down innovation mandates through the &ldquo;One JCorp&rdquo;
              framework, unlike investment firms without operational control.
            </p>
          </div>
        </div>
      </section>

      {/* Three-Layer Architecture */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Three-Layer Platform Architecture</h2>
            <p className="mt-3 text-lg text-gray-500">Built for scale, designed for trust</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Layer 1 */}
            <div className="relative rounded-xl border border-orange-200 bg-white p-8 shadow-sm">
              <div className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                Layer 1
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Infrastructure</h3>
              <p className="mt-1 text-sm font-medium text-orange-600">The Backbone</p>
              <p className="mt-3 text-sm text-gray-500">
                JCorp Data Fabric, shared cloud compute, and secure &ldquo;Innovation Sandboxes&rdquo;
                for safe experimentation.
              </p>
              <ul className="mt-4 space-y-2">
                {["Data Fabric", "Cloud Compute", "Innovation Sandboxes", "Security Layer"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-orange-500">&#10003;</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Layer 2 */}
            <div className="relative rounded-xl border border-purple-200 bg-white p-8 shadow-sm">
              <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                Layer 2
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Intelligence</h3>
              <p className="mt-1 text-sm font-medium text-purple-600">The Brain</p>
              <p className="mt-3 text-sm text-gray-500">
                A curated AI Model Marketplace and specialized analytics engines for genomics, real-world
                evidence, and more.
              </p>
              <ul className="mt-4 space-y-2">
                {["AI Model Marketplace", "Genomics Engine", "Real-World Evidence", "Analytics Studio"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-purple-500">&#10003;</span> {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Layer 3 */}
            <div className="relative rounded-xl border border-teal-200 bg-white p-8 shadow-sm">
              <div className="inline-flex items-center rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
                Layer 3
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Engagement</h3>
              <p className="mt-1 text-sm font-medium text-teal-600">The Interface</p>
              <p className="mt-3 text-sm text-gray-500">
                The IDEAS Digital Platform where stakeholders collaborate, match challenges to solutions,
                and earn the &ldquo;IDEAS Trust Mark.&rdquo;
              </p>
              <ul className="mt-4 space-y-2">
                {["Collaboration Hub", "Challenge Matching", "Trust Mark", "Guild Dashboards"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-teal-500">&#10003;</span> {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Four Guilds */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">The Four Vertical Innovation Guilds</h2>
          <p className="mt-3 text-lg text-gray-500">
            Domain-specific innovation engines powered by JCorp&apos;s operational assets
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GUILD_LIST.map((guild) => (
            <Link
              key={guild.slug}
              href={`/dashboard/guilds/${guild.slug}`}
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${GUILD_COLORS[guild.color]}`}
              >
                <span className="text-xl text-white">
                  {guild.slug === "healthcare" && "\u2764"}
                  {guild.slug === "proptech" && "\u2302"}
                  {guild.slug === "agrifood" && "\u2618"}
                  {guild.slug === "food-services" && "\u2616"}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                {guild.name}
              </h3>
              <p className="mt-1 text-xs font-medium text-gray-400">{guild.entity}</p>
              <p className="mt-2 text-sm text-gray-500 line-clamp-3">{guild.description}</p>
              <div className="mt-4 flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${GUILD_BG[guild.color]} ${
                    guild.color === "emerald"
                      ? "text-emerald-700"
                      : guild.color === "blue"
                      ? "text-blue-700"
                      : guild.color === "amber"
                      ? "text-amber-700"
                      : "text-red-700"
                  }`}
                >
                  Phase {guild.phase}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    guild.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {guild.status === "active" ? "Active" : "Planned"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Roadmap Preview */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Three-Phase Roadmap (2026&ndash;2028)</h2>
            <p className="mt-3 text-lg text-gray-500">From foundation to commercialization</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {ROADMAP_PHASES.map((phase) => (
              <div
                key={phase.phase}
                className={`rounded-xl border p-8 ${
                  phase.status === "active"
                    ? "border-primary-300 bg-white ring-2 ring-primary-100 shadow-md"
                    : "border-gray-200 bg-white shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                      phase.status === "active"
                        ? "bg-primary-600 text-white"
                        : phase.status === "completed"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {phase.phase}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{phase.title}</h3>
                    <p className="text-sm text-gray-500">{phase.year}</p>
                  </div>
                  {phase.status === "active" && (
                    <span className="ml-auto inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                      Current
                    </span>
                  )}
                </div>
                <p className="mt-4 text-sm text-gray-600">{phase.description}</p>
                <ul className="mt-4 space-y-2">
                  {phase.milestones.slice(0, 4).map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span
                        className={`mt-0.5 ${m.completed ? "text-green-500" : "text-gray-300"}`}
                      >
                        {m.completed ? "\u2713" : "\u25CB"}
                      </span>
                      <span className={m.completed ? "text-gray-700" : "text-gray-500"}>
                        {m.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              View full roadmap &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Singapore Strategic Response */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Strategic Response to Singapore&apos;s Pillars</h2>
          <p className="mt-3 text-lg text-gray-500">
            Aligning JCorp&apos;s innovation with national AI strategy
          </p>
        </div>
        <div className="mt-12 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Singapore Pillar</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Singapore Offering</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">IDEAS Strategic Response</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Pro-Business Scaling</td>
                <td className="px-6 py-4 text-sm text-gray-500">S$150M Compute credits &amp; grants</td>
                <td className="px-6 py-4 text-sm text-gray-700">JCorp Innovation Capital + Group-scale procurement</td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Digitally Fluent Leaders</td>
                <td className="px-6 py-4 text-sm text-gray-500">National training (2,000 firms)</td>
                <td className="px-6 py-4 text-sm text-gray-700">C-Suite Immersion &amp; AI Fellows Rotation Program</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Expanded Infrastructure</td>
                <td className="px-6 py-4 text-sm text-gray-500">70+ Data Centres (land-constrained)</td>
                <td className="px-6 py-4 text-sm text-gray-700">IBTEC: 7,290-acre physical-digital sandbox in JB-SEZ</td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Trusted Environment</td>
                <td className="px-6 py-4 text-sm text-gray-500">AI Verify &amp; Project Moonshot</td>
                <td className="px-6 py-4 text-sm text-gray-700">&ldquo;IDEAS Trust Mark&rdquo; adding Halal &amp; Clinical safety layers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary-700 to-blue-800 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            Ready to Join the Innovation Ecosystem?
          </h2>
          <p className="mt-4 text-lg text-blue-200">
            Explore the IDEAS platform, collaborate across guilds, and accelerate your AI journey.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-lg transition hover:bg-blue-50"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
