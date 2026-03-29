import { Footer } from "@/components/layout/footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 to-blue-900 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">About IDEAS</h1>
          <p className="mt-4 text-lg text-blue-200">
            Integrated Discovery, Engagement &amp; Acceleration System
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          IDEAS is JCorp&apos;s strategic framework for vertical AI innovation, transforming the
          corporation from a consumer to a producer of the regional AI ecosystem. By embedding AI
          directly into owned operations across healthcare, real estate, agrifood, and food
          services, IDEAS creates a unique &ldquo;Ownership Advantage&rdquo; that investment firms
          without operational control cannot replicate.
        </p>

        <h2 className="mt-12 text-2xl font-bold text-gray-900">The Ownership Advantage</h2>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          Through the &ldquo;One JCorp&rdquo; framework, IDEAS leverages organic data access and
          top-down innovation mandates across JCorp&apos;s portfolio companies. This provides:
        </p>
        <ul className="mt-4 space-y-3">
          {[
            "Direct access to operational data from 30+ hospitals, 48+ buildings, 50,000+ hectares of plantations, and 500+ food outlets",
            "Top-down mandate for AI adoption across all portfolio companies",
            "Cross-sector data fusion opportunities unavailable to standalone companies",
            "IBTEC's 7,290-acre physical-digital sandbox in JB-SEZ for real-world experimentation",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-600">
              <span className="mt-1 text-primary-600">&#10003;</span>
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-2xl font-bold text-gray-900">The Four Innovation Guilds</h2>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          IDEAS operates through four vertical guilds, each anchored by a JCorp portfolio company:
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { name: "Healthcare Guild", entity: "KPJ Health System", color: "emerald", desc: "Clinical AI, genomics, and value-based care" },
            { name: "Proptech Guild", entity: "JLand Group", color: "blue", desc: "Digital twins, smart buildings, and predictive maintenance" },
            { name: "Agrifood Guild", entity: "JPO/Kulim", color: "amber", desc: "Precision agriculture and ESG reporting" },
            { name: "Food Services Guild", entity: "QSR Brands", color: "red", desc: "Demand forecasting and Halal traceability" },
          ].map((guild) => (
            <div key={guild.name} className={`rounded-lg border p-4 bg-${guild.color}-50 border-${guild.color}-200`}>
              <h3 className="font-semibold text-gray-900">{guild.name}</h3>
              <p className="text-sm text-gray-500">{guild.entity}</p>
              <p className="mt-1 text-sm text-gray-600">{guild.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold text-gray-900">Leadership</h2>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          IDEAS is governed by JCorp&apos;s senior leadership with dedicated guild leads from each
          portfolio company. The platform operates as a distinct innovation entity within the JCorp
          group, with its own technology team and strategic mandate.
        </p>

        <div className="mt-8">
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
