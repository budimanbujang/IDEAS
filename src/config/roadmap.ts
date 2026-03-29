import { RoadmapPhase } from "@/types";

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phase: 1,
    title: "Foundation",
    year: "2026",
    description:
      "Establish the IDEAS entity, launch Healthcare and Proptech guilds, and deploy the first Data Fabric prototype.",
    milestones: [
      { label: "Establish IDEAS legal entity", completed: true },
      { label: "Launch Healthcare Guild with KPJ", completed: true },
      { label: "Launch Proptech Guild with JLand", completed: true },
      { label: "Deploy Data Fabric v1 prototype", completed: false },
      { label: "Set up IBTEC Innovation Sandbox", completed: false },
      { label: "Onboard first 5 AI models to marketplace", completed: false },
    ],
    status: "active",
  },
  {
    phase: 2,
    title: "Scale",
    year: "2027",
    description:
      "Activate Agrifood and Food Services guilds, launch the AI Fellows program, and scale the AI Studio for internal solutions.",
    milestones: [
      { label: "Activate Agrifood Guild with JPO/Kulim", completed: false },
      { label: "Activate Food Services Guild with QSR Brands", completed: false },
      { label: "Launch AI Fellows rotation program", completed: false },
      { label: "Scale AI Studio for cross-guild solutions", completed: false },
      { label: "Deploy Trust Mark certification v1", completed: false },
      { label: "Reach 50+ AI models in marketplace", completed: false },
    ],
    status: "upcoming",
  },
  {
    phase: 3,
    title: "Commercialize",
    year: "2028",
    description:
      "Open platform access to external IBTEC tenants and begin generating standalone revenue from AI services and the Trust Mark.",
    milestones: [
      { label: "Open platform to external IBTEC tenants", completed: false },
      { label: "Launch commercial AI-as-a-Service offerings", completed: false },
      { label: "Monetize Trust Mark certification", completed: false },
      { label: "Achieve standalone revenue target", completed: false },
      { label: "Regional expansion to ASEAN partners", completed: false },
      { label: "100+ models & 1000+ platform users", completed: false },
    ],
    status: "upcoming",
  },
];
