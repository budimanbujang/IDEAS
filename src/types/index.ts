export type GuildSlug = "healthcare" | "proptech" | "agrifood" | "food-services";
export type GuildStatus = "planned" | "active" | "scaling";
export type Phase = 1 | 2 | 3;
export type TrustMarkLevel = "bronze" | "silver" | "gold";
export type ModelStatus = "draft" | "testing" | "certified" | "deployed";
export type ChallengeStatus = "open" | "in_progress" | "completed" | "closed";
export type SandboxStatus = "provisioning" | "running" | "paused" | "terminated";

export interface GuildConfig {
  slug: GuildSlug;
  name: string;
  entity: string;
  description: string;
  sector: string;
  icon: string;
  color: string;
  gradientClass: string;
  phase: Phase;
  status: GuildStatus;
  kpis: KPIDefinition[];
  capabilities: string[];
}

export interface KPIDefinition {
  key: string;
  label: string;
  value: number;
  target: number;
  unit?: string;
  trend?: "up" | "down" | "stable";
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
  category: string;
  guild: GuildSlug;
  version: string;
  status: ModelStatus;
  trustMarkLevel?: TrustMarkLevel;
  metrics: {
    accuracy?: number;
    latency?: number;
    throughput?: number;
  };
  tags: string[];
  updatedAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  guild: GuildSlug;
  status: ChallengeStatus;
  postedBy: string;
  submissions: number;
  matchScore?: number;
  tags: string[];
  createdAt: string;
  deadline?: string;
}

export interface Sandbox {
  id: string;
  name: string;
  guild: GuildSlug;
  owner: string;
  status: SandboxStatus;
  resources: {
    cpu: number;
    memory: number;
    gpu?: number;
    storage: number;
  };
  createdAt: string;
  expiresAt: string;
}

export interface TrustMarkCertification {
  id: string;
  modelId: string;
  modelName: string;
  level: TrustMarkLevel;
  status: "pending" | "review" | "certified" | "expired";
  criteria: {
    name: string;
    passed: boolean;
    score: number;
  }[];
  issuedAt?: string;
  expiresAt?: string;
}

export interface RoadmapPhase {
  phase: Phase;
  title: string;
  year: string;
  description: string;
  milestones: { label: string; completed: boolean }[];
  status: "completed" | "active" | "upcoming";
}

export interface NavigationItem {
  label: string;
  href: string;
  icon: string;
  layer?: 1 | 2 | 3;
  children?: NavigationItem[];
}
