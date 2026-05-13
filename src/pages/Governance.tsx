import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  ShieldAlert,
  ShieldCheck,
  Shield,
  FileCheck2,
  Scale,
  ClipboardList,
  ArrowUpRight,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ---- Risk tier definitions ----
const riskTiers = [
  {
    tier: "high",
    label: "High Risk",
    count: 47,
    icon: ShieldAlert,
    color: "hsl(var(--destructive))",
    description: "Customer-facing, regulated data, autonomous decisions",
    requirements: [
      "Executive sponsor sign-off",
      "Legal & Privacy review",
      "Model risk committee",
      "Quarterly bias audit",
      "Incident response plan",
    ],
  },
  {
    tier: "medium",
    label: "Medium Risk",
    count: 184,
    icon: Shield,
    color: "hsl(var(--warning))",
    description: "Internal workflows, sensitive data, human-in-the-loop",
    requirements: [
      "Department head approval",
      "Security review",
      "DPIA (if PII)",
      "Annual audit",
    ],
  },
  {
    tier: "low",
    label: "Low Risk",
    count: 612,
    icon: ShieldCheck,
    color: "hsl(var(--success))",
    description: "Productivity tools, public data, fully reversible",
    requirements: [
      "Manager approval",
      "Standard SSO + logging",
      "Self-attestation",
    ],
  },
];

const totalGoverned = riskTiers.reduce((s, t) => s + t.count, 0);

// ---- Compliance posture ----
const complianceStatus = [
  { name: "Approved", value: 78, fill: "hsl(var(--success))" },
  { name: "Pending Review", value: 14, fill: "hsl(var(--warning))" },
  { name: "Out of Policy", value: 8, fill: "hsl(var(--destructive))" },
];

// ---- Approvals by tier ----
const approvalsByTier = [
  { tier: "High", legal: 47, security: 47, privacy: 41, exec: 47 },
  { tier: "Medium", legal: 62, security: 184, privacy: 88, exec: 0 },
  { tier: "Low", legal: 0, security: 612, privacy: 0, exec: 0 },
];

// ---- Audit events ----
const auditEvents = [
  {
    id: "EVT-9821",
    project: "Contract Clause Extractor",
    tier: "high",
    event: "Quarterly bias audit completed",
    actor: "Legal Ops",
    status: "active" as const,
    date: "2 days ago",
  },
  {
    id: "EVT-9817",
    project: "Sales Call Summarizer",
    tier: "medium",
    event: "DPIA filed for EU rollout",
    actor: "Privacy Office",
    status: "active" as const,
    date: "4 days ago",
  },
  {
    id: "EVT-9810",
    project: "HR Policy Q&A Bot",
    tier: "high",
    event: "Re-classified high → medium",
    actor: "Risk Committee",
    status: "warning" as const,
    date: "1 wk ago",
  },
  {
    id: "EVT-9803",
    project: "Marketing Asset Generator",
    tier: "medium",
    event: "Policy violation: training data source",
    actor: "Auto-scanner",
    status: "critical" as const,
    date: "1 wk ago",
  },
  {
    id: "EVT-9799",
    project: "Code Review Copilot",
    tier: "low",
    event: "Annual self-attestation renewed",
    actor: "Engineering",
    status: "active" as const,
    date: "2 wks ago",
  },
];

// ---- Initiatives with governance ----
const governedInitiatives = [
  {
    id: "AI-2041",
    name: "Contract Clause Extractor",
    owner: "Legal Ops",
    tier: "high",
    approvals: "5 / 5",
    nextReview: "Apr 14",
    status: "active" as const,
  },
  {
    id: "AI-2018",
    name: "Customer Churn Predictor",
    owner: "Customer Success",
    tier: "high",
    approvals: "3 / 5",
    nextReview: "Mar 02",
    status: "warning" as const,
  },
  {
    id: "AI-2090",
    name: "Loan Default Scoring v2",
    owner: "Risk & Lending",
    tier: "high",
    approvals: "5 / 5",
    nextReview: "May 30",
    status: "active" as const,
  },
  {
    id: "AI-2039",
    name: "Sales Call Summarizer",
    owner: "Revenue Ops",
    tier: "medium",
    approvals: "3 / 3",
    nextReview: "Aug 12",
    status: "active" as const,
  },
  {
    id: "AI-2061",
    name: "Vendor Risk Triage",
    owner: "Procurement",
    tier: "medium",
    approvals: "2 / 3",
    nextReview: "Mar 18",
    status: "warning" as const,
  },
  {
    id: "AI-2028",
    name: "Marketing Asset Generator",
    owner: "Brand",
    tier: "medium",
    approvals: "1 / 3",
    nextReview: "Overdue",
    status: "critical" as const,
  },
  {
    id: "AI-2055",
    name: "Code Review Copilot",
    owner: "Engineering",
    tier: "low",
    approvals: "1 / 1",
    nextReview: "Jan '27",
    status: "active" as const,
  },
  {
    id: "AI-2070",
    name: "Forecast Variance Agent",
    owner: "FP&A",
    tier: "low",
    approvals: "1 / 1",
    nextReview: "Jan '27",
    status: "active" as const,
  },
];

const tierBadge: Record<string, { label: string; cls: string }> = {
  high: { label: "High", cls: "bg-destructive/10 text-destructive border-destructive/30" },
  medium: { label: "Medium", cls: "bg-warning/10 text-warning border-warning/30" },
  low: { label: "Low", cls: "bg-success/10 text-success border-success/30" },
};

const Governance = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ExecSummary
          tone="risk"
          headline="14 high-risk initiatives are out-of-policy and 38 approvals are overdue — board-reportable exposure if unresolved this quarter."
          detail="Two High-tier projects (customer-facing GenAI) lack required Legal + Model Risk sign-off. Escalate to AI Risk Committee within 5 business days."
        />
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              AI Governance & Risk
            </h1>
            <p className="text-sm text-muted-foreground">
              Risk tiering · Approval workflows · Auditability across {totalGoverned.toLocaleString()} initiatives
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              All policies
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <ClipboardList className="w-4 h-4" />
              Audit log
            </Button>
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              Export Audit Pack
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Policy Compliance"
            value="92%"
            change={2.1}
            changeLabel="vs last quarter"
            icon={ShieldCheck}
            variant="success"
          />
          <MetricCard
            title="Pending Approvals"
            value="38"
            change={-12.4}
            changeLabel="vs last week"
            icon={Clock}
            variant="warning"
          />
          <MetricCard
            title="Out-of-Policy Items"
            value="14"
            change={-3}
            changeLabel="open exceptions"
            icon={AlertTriangle}
            variant="danger"
          />
          <MetricCard
            title="Audits This Quarter"
            value="47"
            change={9.0}
            changeLabel="completed"
            icon={FileCheck2}
            variant="primary"
          />
        </div>

        {/* Risk tier cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6"
        >
          <SectionHeader
            title="Risk Tiering Framework"
            subtitle="Each project is classified into a tier that drives required approvals and ongoing controls"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {riskTiers.map((tier, idx) => {
              const Icon = tier.icon;
              const pct = ((tier.count / totalGoverned) * 100).toFixed(0);
              return (
                <motion.div
                  key={tier.tier}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="glass-panel-hover p-5 border"
                  style={{ borderColor: `${tier.color}40` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="p-2.5 rounded-lg"
                      style={{ backgroundColor: `${tier.color}1A`, color: tier.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border"
                      style={{
                        color: tier.color,
                        borderColor: `${tier.color}40`,
                        backgroundColor: `${tier.color}1A`,
                      }}
                    >
                      Tier {idx + 1}
                    </span>
                  </div>
                  <div className="metric-label mb-1">{tier.label}</div>
                  <div className="flex items-baseline gap-2">
                    <span className="metric-value" style={{ color: tier.color }}>
                      {tier.count}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {pct}% of portfolio
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 mb-4 leading-snug">
                    {tier.description}
                  </p>

                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                    Required Controls
                  </div>
                  <ul className="space-y-1.5">
                    {tier.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-2 text-xs text-foreground">
                        <CheckCircle2
                          className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                          style={{ color: tier.color }}
                        />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Compliance + Approvals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-4"
          >
            <SectionHeader
              title="Policy Posture"
              subtitle="Portfolio-wide"
            />
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="30%"
                  outerRadius="100%"
                  data={complianceStatus}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar background dataKey="value" cornerRadius={6} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(v: number) => [`${v}%`, ""]}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {complianceStatus.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.fill }} />
                    <span className="text-muted-foreground">{s.name}</span>
                  </div>
                  <span className="font-mono text-foreground">{s.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-4 lg:col-span-2"
          >
            <SectionHeader
              title="Approvals Required by Tier"
              subtitle="Number of projects needing each review type"
            />
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={approvalsByTier}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="tier" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="legal" name="Legal" stackId="a" fill="hsl(var(--destructive))" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="privacy" name="Privacy / DPIA" stackId="a" fill="hsl(var(--warning))" />
                  <Bar dataKey="security" name="Security" stackId="a" fill="hsl(var(--primary))" />
                  <Bar dataKey="exec" name="Executive" stackId="a" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Governed Initiatives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SectionHeader
            title="Governed Initiatives"
            subtitle="Risk classification, approval status & next scheduled review"
            action={
              <Button variant="ghost" size="sm" className="text-primary">
                Open register
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
                key: "tier",
                header: "Risk Tier",
                render: (i) => (
                  <span
                    className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
                      tierBadge[i.tier].cls
                    )}
                  >
                    {tierBadge[i.tier].label}
                  </span>
                ),
              },
              {
                key: "approvals",
                header: "Approvals",
                render: (i) => <span className="font-mono text-foreground">{i.approvals}</span>,
              },
              {
                key: "nextReview",
                header: "Next Review",
                render: (i) => (
                  <span
                    className={cn(
                      "text-sm",
                      i.nextReview === "Overdue" ? "text-destructive font-medium" : "text-muted-foreground"
                    )}
                  >
                    {i.nextReview}
                  </span>
                ),
              },
              {
                key: "status",
                header: "Compliance",
                render: (i) => <StatusBadge status={i.status} />,
              },
            ]}
            data={governedInitiatives}
          />
        </motion.div>

        {/* Audit log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-4"
        >
          <SectionHeader
            title="Recent Audit Trail"
            subtitle="Immutable governance events · exportable for regulators"
            action={
              <Button variant="ghost" size="sm" className="gap-1.5 text-primary">
                <Scale className="w-3.5 h-3.5" />
                Full audit log
              </Button>
            }
          />
          <div className="space-y-2">
            {auditEvents.map((evt) => (
              <div
                key={evt.id}
                className="flex items-center gap-4 p-3 rounded-lg border border-border/40 hover:bg-muted/20 transition-colors"
              >
                <span className="font-mono text-xs text-muted-foreground w-20">{evt.id}</span>
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border w-20 justify-center",
                    tierBadge[evt.tier].cls
                  )}
                >
                  {tierBadge[evt.tier].label}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-foreground truncate">{evt.event}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {evt.project} · {evt.actor}
                  </div>
                </div>
                <StatusBadge status={evt.status} />
                <span className="text-xs text-muted-foreground w-20 text-right">{evt.date}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Governance;
