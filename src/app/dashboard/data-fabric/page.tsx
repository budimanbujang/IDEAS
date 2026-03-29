import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, ProgressBar } from "@/components/ui";
import { formatNumber } from "@/lib/utils";

const DATA_SOURCES = [
  {
    name: "KPJ Hospital Systems",
    description: "Clinical records, imaging data, lab results, and patient management systems across the hospital network.",
    stat: "24 connected",
    statDetail: "hospitals",
    icon: "H",
    color: "emerald",
    pipelines: { active: 18, total: 24 },
    dataVolume: "2.4M records/day",
    latency: "< 5 min",
    status: "healthy" as const,
  },
  {
    name: "JLand Building IoT",
    description: "Smart building sensors, energy meters, HVAC systems, and occupancy detection across managed properties.",
    stat: "48 buildings",
    statDetail: "monitored",
    icon: "B",
    color: "blue",
    pipelines: { active: 42, total: 48 },
    dataVolume: "850K events/day",
    latency: "< 1 min",
    status: "healthy" as const,
  },
  {
    name: "JPO Plantation Sensors",
    description: "Soil sensors, weather stations, satellite imagery feeds, and yield measurement systems across plantation estates.",
    stat: "2,400 sensors",
    statDetail: "deployed",
    icon: "P",
    color: "amber",
    pipelines: { active: 1800, total: 2400 },
    dataVolume: "120K readings/day",
    latency: "< 15 min",
    status: "degraded" as const,
  },
  {
    name: "QSR POS Systems",
    description: "Point-of-sale transactions, inventory management, supply chain logistics, and customer analytics data.",
    stat: "120 outlets",
    statDetail: "connected",
    icon: "Q",
    color: "red",
    pipelines: { active: 110, total: 120 },
    dataVolume: "350K transactions/day",
    latency: "< 2 min",
    status: "healthy" as const,
  },
];

const PIPELINE_HEALTH = {
  total: 4392,
  active: 3970,
  healthy: 3850,
  degraded: 120,
  failed: 22,
};

const COLOR_MAP: Record<string, { bg: string; text: string; icon: string }> = {
  emerald: { bg: "bg-emerald-100", text: "text-emerald-700", icon: "bg-emerald-600" },
  blue: { bg: "bg-blue-100", text: "text-blue-700", icon: "bg-blue-600" },
  amber: { bg: "bg-amber-100", text: "text-amber-700", icon: "bg-amber-600" },
  red: { bg: "bg-red-100", text: "text-red-700", icon: "bg-red-600" },
};

const STATUS_STYLES: Record<string, string> = {
  healthy: "bg-green-100 text-green-800",
  degraded: "bg-yellow-100 text-yellow-800",
  down: "bg-red-100 text-red-800",
};

export default function DataFabricPage() {
  const healthPercent = Math.round((PIPELINE_HEALTH.healthy / PIPELINE_HEALTH.total) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="JCorp Data Fabric"
        description="Unified data integration layer connecting all guild data sources through standardized pipelines. Real-time ingestion, transformation, and governance across the entire JCorp ecosystem."
        badge={<Badge variant="success">Operational</Badge>}
      />

      {/* Pipeline Health Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="text-center">
          <CardContent className="pt-6">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Total Pipelines</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">{formatNumber(PIPELINE_HEALTH.total)}</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Active</p>
            <p className="mt-1 text-3xl font-bold text-blue-600">{formatNumber(PIPELINE_HEALTH.active)}</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Healthy</p>
            <p className="mt-1 text-3xl font-bold text-green-600">{formatNumber(PIPELINE_HEALTH.healthy)}</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Degraded</p>
            <p className="mt-1 text-3xl font-bold text-yellow-600">{PIPELINE_HEALTH.degraded}</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Failed</p>
            <p className="mt-1 text-3xl font-bold text-red-600">{PIPELINE_HEALTH.failed}</p>
          </CardContent>
        </Card>
      </div>

      {/* Overall Health Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Overall Pipeline Health</p>
              <p className="text-xs text-gray-400">Percentage of pipelines operating within normal parameters</p>
            </div>
            <span className="text-2xl font-bold text-green-600">{healthPercent}%</span>
          </div>
          <ProgressBar value={healthPercent} max={100} className="mt-3" barClassName="bg-green-500" size="md" />
        </CardContent>
      </Card>

      {/* Data Sources */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Data Sources</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {DATA_SOURCES.map((source) => {
            const colors = COLOR_MAP[source.color];
            return (
              <Card key={source.name} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-white ${colors.icon}`}>
                      <span className="text-lg font-bold">{source.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{source.name}</CardTitle>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[source.status]}`}>
                          {source.status}
                        </span>
                      </div>
                      <CardDescription className="mt-1">{source.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Connected</span>
                      <span className="font-semibold text-gray-900">{source.stat}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Pipelines Active</span>
                      <span className="font-semibold text-gray-900">{source.pipelines.active} / {source.pipelines.total}</span>
                    </div>
                    <ProgressBar
                      value={source.pipelines.active}
                      max={source.pipelines.total}
                      size="sm"
                      barClassName={source.status === "healthy" ? "bg-green-500" : "bg-yellow-500"}
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Data Volume</span>
                      <span className="font-semibold text-gray-900">{source.dataVolume}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Ingestion Latency</span>
                      <span className="font-semibold text-gray-900">{source.latency}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Data Flow Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Data Flow Architecture</CardTitle>
          <CardDescription>Simplified view of data movement through the JCorp Data Fabric</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="flex min-w-[700px] items-center justify-between gap-4 py-4">
              {/* Sources */}
              <div className="flex flex-col gap-2">
                <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">Sources</p>
                {["KPJ Hospitals", "JLand IoT", "JPO Sensors", "QSR POS"].map((src, i) => (
                  <div
                    key={src}
                    className={`rounded-lg px-3 py-2 text-center text-xs font-medium ${
                      [
                        "bg-emerald-100 text-emerald-800",
                        "bg-blue-100 text-blue-800",
                        "bg-amber-100 text-amber-800",
                        "bg-red-100 text-red-800",
                      ][i]
                    }`}
                  >
                    {src}
                  </div>
                ))}
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center">
                <div className="h-px w-16 bg-gray-300" />
                <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Ingestion */}
              <div className="flex flex-col items-center gap-2">
                <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">Ingestion</p>
                <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-center">
                  <p className="text-xs font-semibold text-gray-700">Stream Processing</p>
                  <p className="mt-0.5 text-[10px] text-gray-400">Kafka + Flink</p>
                </div>
                <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-center">
                  <p className="text-xs font-semibold text-gray-700">Batch ETL</p>
                  <p className="mt-0.5 text-[10px] text-gray-400">Airflow + Spark</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center">
                <div className="h-px w-16 bg-gray-300" />
                <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Data Lake */}
              <div className="flex flex-col items-center gap-2">
                <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">Storage</p>
                <div className="rounded-xl border-2 border-primary-200 bg-primary-50 px-6 py-4 text-center">
                  <p className="text-sm font-bold text-primary-800">Data Lakehouse</p>
                  <p className="mt-0.5 text-[10px] text-primary-500">Delta Lake + Unity Catalog</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center">
                <div className="h-px w-16 bg-gray-300" />
                <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Consumers */}
              <div className="flex flex-col gap-2">
                <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">Consumers</p>
                {["AI Models", "Analytics", "Dashboards", "APIs"].map((consumer) => (
                  <div
                    key={consumer}
                    className="rounded-lg bg-primary-100 px-3 py-2 text-center text-xs font-medium text-primary-800"
                  >
                    {consumer}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
