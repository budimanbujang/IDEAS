import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";

const LEADERSHIP = [
  {
    name: "Chief Executive Officer",
    role: "IDEAS Platform Lead",
    description:
      "Oversees strategic direction and stakeholder relationships across all guilds.",
  },
  {
    name: "Chief Technology Officer",
    role: "Platform Architecture",
    description:
      "Leads the Data Fabric, AI Studio, and Innovation Sandbox technical infrastructure.",
  },
  {
    name: "Chief AI Officer",
    role: "AI Strategy & Trust Mark",
    description:
      "Drives responsible AI governance, Trust Mark certification, and model quality standards.",
  },
  {
    name: "Head of Guild Operations",
    role: "Guild Coordination",
    description:
      "Manages cross-guild collaboration, challenge matching, and operational excellence.",
  },
];

const ADVANTAGES = [
  {
    title: "Data Sovereignty",
    description:
      "Each guild retains full ownership and governance of its data. The Data Fabric enables secure, permissioned sharing without relinquishing control.",
  },
  {
    title: "IP Retention",
    description:
      "AI models and solutions developed within IDEAS remain the intellectual property of the contributing guild entity, protected by clear contractual frameworks.",
  },
  {
    title: "Value Capture",
    description:
      "Revenue generated from commercialized AI solutions is distributed back to contributing guilds, creating a sustainable incentive for innovation.",
  },
  {
    title: "Collective Intelligence",
    description:
      "Cross-guild collaboration amplifies each entity's capabilities. A healthcare AI insight can enhance proptech solutions, and vice versa.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            About IDEAS
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Integrated Discovery, Engagement &amp; Acceleration System
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-gray-400">
            IDEAS is JCorp&apos;s multi-sector innovation aggregator platform,
            designed to harness the collective AI capabilities of its portfolio
            companies through a guild-based model of ownership and collaboration.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              To accelerate AI adoption across JCorp&apos;s portfolio companies by
              providing a shared platform for discovery, development, and deployment
              of responsible AI solutions -- while ensuring each entity retains
              ownership and captures value from their contributions.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              To become ASEAN&apos;s leading enterprise AI platform, demonstrating
              that conglomerate-level AI collaboration -- built on trust, ownership,
              and shared infrastructure -- can create exponential value beyond what
              any single entity could achieve alone.
            </p>
          </div>
        </div>
      </section>

      {/* The Ownership Advantage */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              The Ownership Advantage
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-500">
              Unlike traditional centralized AI platforms, IDEAS is built on a
              fundamental principle: the entities that generate data and build models
              retain ownership of their contributions.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((advantage) => (
              <Card key={advantage.title}>
                <CardHeader>
                  <CardTitle className="text-base">{advantage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          How IDEAS Works
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-500">
          A three-layer architecture designed to serve all stakeholders in the JCorp
          ecosystem.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-700">
              1
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              JCorp Oversight
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Strategic dashboard for leadership with portfolio-wide AI health
              metrics, investment tracking, and cross-guild synergy insights.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-700">
              2
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              Guild Operations
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Dedicated workspaces for each guild with KPI dashboards, model
              registries, sandbox environments, and team management tools.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-700">
              3
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              Shared Services
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Cross-guild platform services including the AI Marketplace,
              Collaboration Hub, Trust Mark certification, and Innovation Sandbox.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Leadership Team
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-gray-500">
            The IDEAS platform is led by a cross-functional team with expertise in
            AI, enterprise technology, and domain-specific operations.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LEADERSHIP.map((member) => (
              <Card key={member.role}>
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                    <svg
                      className="h-8 w-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-xs font-medium text-primary-600">
                    {member.role}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
        >
          Explore the Platform &rarr;
        </Link>
      </section>

      <Footer />
    </main>
  );
}
