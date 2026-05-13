import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Inbox,
  XCircle,
  FlaskConical,
  PauseCircle,
  Rocket,
  Clock,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ---- Funnel data ----
const funnelStages = [
  {
    key: "intake",
    label: "Intake",
    count: 1284,
    icon: Inbox,
    color: "hsl(var(--primary))",
    variant: "primary" as const,
    description: "AI use-case requests submitted",
  },
  {
    key: "rejected",
    label: "Rejected",
    count: 412,
    icon: XCircle,
    color: "hsl(var(--destructive))",
    variant: "danger" as const,
    description: "Funding, duplicates, scope, risk",
  },
  {
    key: "pilot",
    label: "In Pilot",
    count: 487,
    icon: FlaskConical,
    color: "hsl(var(--warning))",
    variant: "warning" as const,
    description: "Active POCs & evaluations",
  },
  {
    key: "paused",
    label: "Paused / Canceled",
    count: 213,
    icon: PauseCircle,
    color: "hsl(var(--muted-foreground))",
    variant: "default" as const,
    description: "Killed after pilot",
  },
  {
    key: "production",
    label: "In Production",
    count: 172,
    icon: Rocket,
    color: "hsl(var(--success))",
    variant: "success" as const,
    description: "Deployed & adopted",
  },
];

const intakeTotal = funnelStages[0].count;

// ---- Rejection reasons ----
const rejectionReasons = [
  { reason: "Insufficient funding", count: 142 },
  { reason: "Duplicate initiative", count: 98 },
  { reason: "Resource constraints", count: 71 },
  { reason: "Compliance / risk", count: 54 },
  { reason: "Low ROI projection", count: 32 },
  { reason: "Out of strategic scope", count: 15 },
];

// ---- Cancellation reasons ----
const cancelReasons = [
  { reason: "Failed accuracy threshold", count: 67 },
  { reason: "Cost-benefit unfavorable", count: 51 },
  { reason: "Vendor / model change", count: 38 },
  { reason: "Sponsor reorganization", count: 29 },
  { reason: "Security review failed", count: 18 },
  { reason: "User adoption too low", count: 10 },
];

// ---- Time to production by quarter ----
const ttpTrend = [
  { quarter: "Q1 '25", intake: 12, pilot: 38, production: 94 },
  { quarter: "Q2 '25", intake: 10, pilot: 34, production: 81 },
  { quarter: "Q3 '25", intake: 9, pilot: 31, production: 72 },
  { quarter: "Q4 '25", intake: 8, pilot: 27, production: 64 },
  { quarter: "Q1 '26", intake: 7, pilot: 24, production: 58 },
];

// ---- Initiative table ----
const initiatives = [
  {
    id: "AI-2041",
    name: "Contract Clause Extractor",
    owner: "Legal Ops",
    stage: "production",
    days: 47,
    status: "active" as const,
  },
  {
    id: "AI-2039",
    name: "Sales Call Summarizer",
    owner: "Revenue Ops",
    stage: "production",
    days: 52,
    status: "active" as const,
  },
  {
    id: "AI-2055",
    name: "Code Review Copilot",
    owner: "Engineering",
    stage: "pilot",
    days: 31,
    status: "active" as const,
  },
  {
    id: "AI-2061",
    name: "Vendor Risk Triage",
    owner: "Procurement",
    stage: "pilot",
    days: 24,
    status: "warning" as const,
  },
  {
    id: "AI-2034",
    name: "HR Policy Q&A Bot",
    owner: "People Ops",
    stage: "paused",
    days: 89,
    status: "warning" as const,
  },
  {
    id: "AI-2028",
    name: "Marketing Asset Generator",
    owner: "Brand",
    stage: "canceled",
    days: 102,
    status: "critical" as const,
  },
  {
    id: "AI-2070",
    name: "Forecast Variance Agent",
    owner: "FP&A",
    stage: "intake",
    days: 4,
    status: "active" as const,
  },
  {
    id: "AI-2018",
    name: "Customer Churn Predictor",
    owner: "Customer Success",
    stage: "rejected",
    days: 11,
    status: "critical" as const,
  },
];

const stageBadge: Record<string, { label: string; cls: string }> = {
  intake: { label: "Intake", cls: "bg-primary/10 text-primary border-primary/30" },
  rejected: { label: "Rejected", cls: "bg-destructive/10 text-destructive border-destructive/30" },
  pilot: { label: "Pilot", cls: "bg-warning/10 text-warning border-warning/30" },
  paused: { label: "Paused", cls: "bg-muted text-muted-foreground border-border" },
  canceled: { label: "Canceled", cls: "bg-destructive/10 text-destructive border-destructive/30" },
  production: { label: "Production", cls: "bg-success/10 text-success border-success/30" },
};

const InitiativePipeline = () => {
  const conversion = ((funnelStages[4].count / intakeTotal) * 100).toFixed(1);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ExecSummary
          tone="risk"
          headline="Pilot kill rate at 38% — 2x industry benchmark; root cause is intake under-scoping, not model performance."
          detail="Avg. time-to-production is 58 days (target: 45). Tightening intake review with mandatory ROI threshold would cut wasted spend ~$2.1M/yr and free 11 FTEs."
        />
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              AI Initiative Pipeline
            </h1>
            <p className="text-sm text-muted-foreground">
              Intake → Pilot → Production · Time-to-value tracking across all AI use cases
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              All business units
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Clock className="w-4 h-4" />
              Last 12 months
            </Button>
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              Export Pipeline
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Avg. Time to Production"
            value="58 days"
            change={-19.4}
            changeLabel="vs last year"
            icon={Rocket}
            variant="success"
          />
          <MetricCard
            title="Intake → Prod Conversion"
            value={`${conversion}%`}
            change={3.2}
            changeLabel="vs last quarter"
            icon={Inbox}
            variant="primary"
          />
          <MetricCard
            title="Pilot Kill Rate"
            value="30.4%"
            change={-4.1}
            changeLabel="vs last quarter"
            icon={PauseCircle}
            variant="warning"
          />
          <MetricCard
            title="Active Pilots"
            value="487"
            change={8.7}
            changeLabel="vs last month"
            icon={FlaskConical}
            variant="primary"
          />
        </div>

        {/* Funnel Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6"
        >
          <SectionHeader
            title="Initiative Funnel"
            subtitle="From intake to production · last 12 months"
          />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {funnelStages.map((stage, idx) => {
              const pct = ((stage.count / intakeTotal) * 100).toFixed(1);
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="relative"
                >
                  <div
                    className="glass-panel-hover p-4 h-full border"
                    style={{ borderColor: `${stage.color}40` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${stage.color}1A`, color: stage.color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Stage {idx + 1}
                      </span>
                    </div>
                    <div className="metric-label mb-1">{stage.label}</div>
                    <div className="metric-value" style={{ color: stage.color }}>
                      {stage.count.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {pct}% of intake
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-2 leading-snug">
                      {stage.description}
                    </p>

                    {/* Bar */}
                    <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.3 + idx * 0.08, duration: 0.6 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: stage.color }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Time to Production Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-4"
        >
          <SectionHeader
            title="Cycle Time by Stage"
            subtitle="Median days spent at each stage, by quarter"
          />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ttpTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(v) => `${v}d`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`${value} days`, ""]}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="intake"
                  name="Intake → Approval"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="pilot"
                  name="Pilot duration"
                  stroke="hsl(var(--warning))"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="production"
                  name="Total time to prod"
                  stroke="hsl(var(--success))"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Reasons row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-4"
          >
            <SectionHeader
              title="Why Requests Get Rejected"
              subtitle={`${funnelStages[1].count} rejected at intake`}
            />
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rejectionReasons} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis
                    type="category"
                    dataKey="reason"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    width={140}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--destructive))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-4"
          >
            <SectionHeader
              title="Why Pilots Get Paused / Canceled"
              subtitle={`${funnelStages[3].count} killed post-pilot`}
            />
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cancelReasons} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis
                    type="category"
                    dataKey="reason"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    width={140}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--warning))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Initiative table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SectionHeader
            title="Initiative Register"
            subtitle="Live status across all open & closed initiatives"
            action={
              <Button variant="ghost" size="sm" className="text-primary">
                View full register
              </Button>
            }
          />
          <DataTable
            columns={[
              {
                key: "id",
                header: "ID",
                render: (i) => <span className="font-mono text-xs text-muted-foreground">{i.id}</span>,
              },
              { key: "name", header: "Initiative" },
              { key: "owner", header: "Owner" },
              {
                key: "stage",
                header: "Stage",
                render: (i) => (
                  <span
                    className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
                      stageBadge[i.stage].cls
                    )}
                  >
                    {stageBadge[i.stage].label}
                  </span>
                ),
              },
              {
                key: "days",
                header: "Days in Pipeline",
                render: (i) => (
                  <span className="font-mono text-foreground">{i.days}d</span>
                ),
              },
              {
                key: "status",
                header: "Health",
                render: (i) => <StatusBadge status={i.status} />,
              },
            ]}
            data={initiatives}
          />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default InitiativePipeline;
