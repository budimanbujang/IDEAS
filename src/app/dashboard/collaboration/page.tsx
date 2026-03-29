import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  ProgressBar,
  Button,
} from "@/components/ui";
import { MOCK_CHALLENGES } from "@/config/mock-data";
import { GUILDS } from "@/config/guilds";
import { PageHeader } from "@/components/layout/page-header";
import Link from "next/link";
import type { ChallengeStatus } from "@/types";

const STATUS_COLORS: Record<ChallengeStatus, { bg: string; text: string; label: string }> = {
  open: { bg: "bg-green-100", text: "text-green-800", label: "Open" },
  in_progress: { bg: "bg-blue-100", text: "text-blue-800", label: "In Progress" },
  completed: { bg: "bg-gray-100", text: "text-gray-800", label: "Completed" },
  closed: { bg: "bg-red-100", text: "text-red-800", label: "Closed" },
};

const GUILD_BADGE_COLORS: Record<string, string> = {
  emerald: "bg-emerald-100 text-emerald-800",
  blue: "bg-blue-100 text-blue-800",
  amber: "bg-amber-100 text-amber-800",
  red: "bg-red-100 text-red-800",
};

function getMatchScoreColor(score: number): string {
  if (score >= 90) return "bg-green-500";
  if (score >= 75) return "bg-blue-500";
  if (score >= 50) return "bg-yellow-500";
  return "bg-gray-400";
}

export default function CollaborationPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Collaboration Hub"
        description="Discover and respond to cross-guild challenges. Our AI-powered matching engine connects you with the most relevant opportunities based on your skills, guild, and domain expertise."
        badge={<Badge variant="info">Layer 3</Badge>}
        actions={
          <Button>
            <span className="mr-2">+</span>
            Post New Challenge
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {MOCK_CHALLENGES.map((challenge) => {
          const guild = GUILDS[challenge.guild];
          const status = STATUS_COLORS[challenge.status];
          const guildBadgeColor = guild
            ? GUILD_BADGE_COLORS[guild.color]
            : "bg-gray-100 text-gray-800";

          return (
            <Link
              key={challenge.id}
              href={`/dashboard/collaboration/${challenge.id}`}
              className="block"
            >
              <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                            guildBadgeColor
                          )}
                        >
                          {guild?.name ?? challenge.guild}
                        </span>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                            status.bg,
                            status.text
                          )}
                        >
                          {status.label}
                        </span>
                      </div>
                      <CardTitle className="text-base">{challenge.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="mt-1.5 line-clamp-2">
                    {challenge.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  {/* Posted by & submissions */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-gray-50 px-3 py-2">
                      <p className="text-xs text-gray-500">Posted by</p>
                      <p className="text-sm font-medium text-gray-900">
                        {challenge.postedBy}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 px-3 py-2">
                      <p className="text-xs text-gray-500">Submissions</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {challenge.submissions}
                      </p>
                    </div>
                  </div>

                  {/* Match Score */}
                  {challenge.matchScore != null && (
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="text-gray-500">Match Score</span>
                        <span
                          className={cn(
                            "font-semibold",
                            challenge.matchScore >= 90
                              ? "text-green-600"
                              : challenge.matchScore >= 80
                                ? "text-blue-600"
                                : "text-gray-600"
                          )}
                        >
                          {challenge.matchScore}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className={cn(
                            "h-2 rounded-full transition-all",
                            getMatchScoreColor(challenge.matchScore)
                          )}
                          style={{ width: `${challenge.matchScore}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {challenge.tags.map((tag) => (
                      <Badge key={tag} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Deadline */}
                  {challenge.deadline && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        Deadline:{" "}
                        {new Date(challenge.deadline).toLocaleDateString("en-MY", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="border-t border-gray-100 pt-4">
                  <span className="text-xs text-gray-400">
                    Posted{" "}
                    {new Date(challenge.createdAt).toLocaleDateString("en-MY", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
