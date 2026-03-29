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
import { MOCK_SANDBOXES } from "@/config/mock-data";
import { GUILDS } from "@/config/guilds";
import { PageHeader } from "@/components/layout/page-header";
import { SandboxStatus } from "@/types";

const STATUS_CONFIG: Record<SandboxStatus, { variant: "default" | "success" | "warning" | "danger"; label: string }> = {
  provisioning: { variant: "warning", label: "Provisioning" },
  running: { variant: "success", label: "Running" },
  paused: { variant: "default", label: "Paused" },
  terminated: { variant: "danger", label: "Terminated" },
};

const STATUS_DOT_COLORS: Record<SandboxStatus, string> = {
  provisioning: "bg-yellow-400",
  running: "bg-green-400",
  paused: "bg-gray-400",
  terminated: "bg-red-400",
};

export default function SandboxPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Innovation Sandboxes"
        description="Safe, isolated environments for rapid AI experimentation. Each sandbox provides dedicated compute resources with built-in governance guardrails."
        badge={<Badge variant="default">Layer 1</Badge>}
        actions={
          <Button variant="primary">
            Create New Sandbox
          </Button>
        }
      />

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Sandboxes</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {MOCK_SANDBOXES.filter((s) => s.status === "running").length}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Sandboxes</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{MOCK_SANDBOXES.length}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total GPUs Allocated</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {MOCK_SANDBOXES.reduce((sum, s) => sum + (s.resources.gpu ?? 0), 0)}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <div className="h-3 w-3 rounded-full bg-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sandbox Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {MOCK_SANDBOXES.map((sandbox) => {
          const guild = GUILDS[sandbox.guild];
          const statusConfig = STATUS_CONFIG[sandbox.status];

          return (
            <Card key={sandbox.id} className="flex flex-col transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{sandbox.name}</CardTitle>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "inline-block h-2 w-2 rounded-full",
                        STATUS_DOT_COLORS[sandbox.status]
                      )}
                    />
                    <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  {guild && (
                    <Badge variant="guild" guildColor={guild.color}>
                      {guild.name}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                {/* Owner */}
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                    {sandbox.owner
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <span className="text-sm text-gray-700">{sandbox.owner}</span>
                </div>

                {/* Resource Allocation */}
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                    Resource Allocation
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-gray-50 px-3 py-2">
                      <p className="text-xs text-gray-500">CPU</p>
                      <p className="text-sm font-semibold text-gray-900">{sandbox.resources.cpu} cores</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 px-3 py-2">
                      <p className="text-xs text-gray-500">Memory</p>
                      <p className="text-sm font-semibold text-gray-900">{sandbox.resources.memory} GB</p>
                    </div>
                    {sandbox.resources.gpu != null && (
                      <div className="rounded-lg bg-gray-50 px-3 py-2">
                        <p className="text-xs text-gray-500">GPU</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {sandbox.resources.gpu} {sandbox.resources.gpu === 1 ? "unit" : "units"}
                        </p>
                      </div>
                    )}
                    <div className="rounded-lg bg-gray-50 px-3 py-2">
                      <p className="text-xs text-gray-500">Storage</p>
                      <p className="text-sm font-semibold text-gray-900">{sandbox.resources.storage} GB</p>
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Created</span>
                    <span className="font-medium text-gray-700">{sandbox.createdAt}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Expires</span>
                    <span className="font-medium text-gray-700">{sandbox.expiresAt}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="gap-2 border-t border-gray-100 pt-4">
                {sandbox.status === "running" ? (
                  <>
                    <Button variant="outline" size="sm" className="flex-1">
                      Open Terminal
                    </Button>
                    <Button variant="ghost" size="sm">
                      Pause
                    </Button>
                  </>
                ) : sandbox.status === "provisioning" ? (
                  <Button variant="outline" size="sm" className="flex-1" disabled>
                    Provisioning...
                  </Button>
                ) : sandbox.status === "paused" ? (
                  <Button variant="primary" size="sm" className="flex-1">
                    Resume
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="flex-1" disabled>
                    Terminated
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
