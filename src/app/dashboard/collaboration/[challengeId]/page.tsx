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
import { notFound } from "next/navigation";
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

export default async function ChallengeDetailPage({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  const { challengeId } = await params;
  const challenge = MOCK_CHALLENGES.find((c) => c.id === challengeId);

  if (!challenge) {
    notFound();
  }

  const guild = GUILDS[challenge.guild];
  const status = STATUS_COLORS[challenge.status];
  const guildBadgeColor = guild
    ? GUILD_BADGE_COLORS[guild.color]
    : "bg-gray-100 text-gray-800";

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/dashboard/collaboration" className="hover:text-gray-700">
          Collaboration Hub
        </Link>
        <span>/</span>
        <span className="text-gray-900">{challenge.title}</span>
      </nav>

      <PageHeader
        title={challenge.title}
        description={challenge.description}
        badge={
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
              status.bg,
              status.text
            )}
          >
            {status.label}
          </span>
        }
        actions={
          challenge.status === "open" ? <Button>Submit Solution</Button> : undefined
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Challenge Details */}
          <Card>
            <CardHeader>
              <CardTitle>Challenge Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Description</h4>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                  {challenge.description}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Requirements</h4>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-gray-600">
                  <li>Solution must be deployable within the IDEAS Innovation Sandbox</li>
                  <li>All training data must comply with IDEAS data governance policies</li>
                  <li>Model must pass Trust Mark Bronze certification as minimum</li>
                  <li>Solution documentation and API specifications required</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Evaluation Criteria</h4>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-gray-600">
                  <li>Technical accuracy and performance benchmarks</li>
                  <li>Scalability and integration readiness</li>
                  <li>Innovation and approach uniqueness</li>
                  <li>Ethical AI compliance and bias mitigation</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Tags</h4>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {challenge.tags.map((tag) => (
                    <Badge key={tag} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submission Form */}
          <Card>
            <CardHeader>
              <CardTitle>Submit Your Solution</CardTitle>
              <CardDescription>
                Upload your model and documentation to submit a solution for this
                challenge.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Solution Title
                </label>
                <input
                  type="text"
                  placeholder="Enter a title for your solution"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  placeholder="Describe your approach, methodology, and key results..."
                  rows={4}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Model Repository URL
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Supporting Documents
                </label>
                <div className="mt-1 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-8">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-8 w-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      PDF, DOCX, .pkl, .h5, .onnx, .pt up to 500MB
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button disabled>Submit Solution</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Challenge Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Challenge Info</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Guild
                  </dt>
                  <dd className="mt-1">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        guildBadgeColor
                      )}
                    >
                      {guild?.name ?? challenge.guild}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Posted By
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-gray-900">
                    {challenge.postedBy}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Created
                  </dt>
                  <dd className="mt-1 text-sm text-gray-700">
                    {new Date(challenge.createdAt).toLocaleDateString("en-MY", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </dd>
                </div>
                {challenge.deadline && (
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Deadline
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-red-600">
                      {new Date(challenge.deadline).toLocaleDateString("en-MY", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Submissions
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-gray-900">
                    {challenge.submissions}
                  </dd>
                </div>
                {challenge.matchScore != null && (
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Match Score
                    </dt>
                    <dd className="mt-2">
                      <ProgressBar
                        value={challenge.matchScore}
                        showLabel
                        size="sm"
                        barClassName="bg-green-500"
                      />
                    </dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-4">
                <div className="absolute left-[7px] top-2 h-[calc(100%-16px)] w-0.5 bg-gray-200" />

                <div className="relative flex gap-3">
                  <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 border-green-500 bg-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Challenge Posted
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(challenge.createdAt).toLocaleDateString("en-MY", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {challenge.submissions > 0 && (
                  <div className="relative flex gap-3">
                    <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 border-blue-500 bg-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Submissions Received
                      </p>
                      <p className="text-xs text-gray-500">
                        {challenge.submissions} submission
                        {challenge.submissions > 1 ? "s" : ""} so far
                      </p>
                    </div>
                  </div>
                )}

                {challenge.status === "in_progress" && (
                  <div className="relative flex gap-3">
                    <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 border-blue-500 bg-white" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Review In Progress
                      </p>
                      <p className="text-xs text-gray-500">
                        Solutions are being evaluated
                      </p>
                    </div>
                  </div>
                )}

                {challenge.deadline && (
                  <div className="relative flex gap-3">
                    <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 border-gray-300 bg-white" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Submission Deadline
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(challenge.deadline).toLocaleDateString("en-MY", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                )}

                <div className="relative flex gap-3">
                  <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 border-gray-300 bg-white" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Winner Announced
                    </p>
                    <p className="text-xs text-gray-400">TBD</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
