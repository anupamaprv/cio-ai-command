import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { ExecSummary } from "@/components/dashboard/ExecSummary";
import { DataTable } from "@/components/dashboard/DataTable";
import { HeatmapGrid } from "@/components/dashboard/HeatmapGrid";
import { ProgressRing } from "@/components/dashboard/ProgressRing";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Users,
  Zap,
  Target,
  ArrowUpRight,
  Clock,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { motion } from "framer-motion";

const productivityData = [
  { month: "Jul", hours: 45000, savings: 2.1 },
  { month: "Aug", hours: 52000, savings: 2.4 },
  { month: "Sep", hours: 58000, savings: 2.7 },
  { month: "Oct", hours: 71000, savings: 3.3 },
  { month: "Nov", hours: 89000, savings: 4.1 },
  { month: "Dec", hours: 112000, savings: 5.2 },
];

const vendorData = [
  { name: "OpenAI", spend: 890000, change: 12 },
  { name: "Anthropic", spend: 450000, change: 45 },
  { name: "Microsoft", spend: 1200000, change: -3 },
  { name: "Google AI", spend: 340000, change: 28 },
  { name: "Cohere", spend: 120000, change: 67 },
];

const departmentHeatmap = {
  rows: ["Engineering", "Sales", "Marketing", "Finance", "HR", "Legal"],
  columns: ["GPT-4", "Claude", "Copilot", "Gemini", "Custom"],
  data: [
    [92, 78, 95, 45, 88],
    [67, 89, 34, 78, 23],
    [78, 92, 45, 89, 67],
    [45, 34, 23, 56, 78],
    [34, 45, 56, 34, 45],
    [23, 56, 34, 67, 34],
  ],
};

const topUsers = [
  { name: "Sarah Chen", dept: "Engineering", hours: 342, status: "active" as const },
  { name: "Michael Ross", dept: "Sales", hours: 287, status: "active" as const },
  { name: "Elena Vance", dept: "Marketing", hours: 256, status: "active" as const },
  { name: "David Park", dept: "Product", hours: 234, status: "warning" as const },
  { name: "Jennifer Liu", dept: "Finance", hours: 198, status: "active" as const },
];

const CommandCenter = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ExecSummary
          tone="action"
          headline="Anthropic spend up 45% MoM while 23% of Microsoft Copilot seats sit idle — rebalance now to fund Q1 expansion."
          detail="Productivity gains hit 112K hours / $5.2M this month, but adoption is concentrated in Eng & Sales. Reallocate ~$280K of dormant licenses before next renewal cycle."
        />
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Enterprise AI Command Center</h1>
            <p className="text-sm text-muted-foreground">
              Real-time intelligence across 127,450 employees • 12 AI vendors • 94 countries
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Clock className="w-4 h-4" />
              Last 30 days
            </Button>
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              Export Report
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total AI Spend (MTD)"
            value="$4.2M"
            change={8.3}
            changeLabel="vs last month"
            icon={DollarSign}
            variant="primary"
          />
          <MetricCard
            title="Active AI Users"
            value="89,432"
            change={12.5}
            changeLabel="vs last month"
            icon={Users}
            variant="success"
          />
          <MetricCard
            title="Productivity Hours Saved"
            value="112K"
            change={23.1}
            changeLabel="vs last month"
            icon={Zap}
            variant="primary"
          />
          <MetricCard
            title="ROI Multiplier"
            value="4.7x"
            change={0.8}
            changeLabel="vs last quarter"
            icon={Target}
            variant="success"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Productivity Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 glass-panel p-4"
          >
            <SectionHeader
              title="Productivity Trend"
              subtitle="Hours saved per month"
            />
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={productivityData}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(v) => `${v / 1000}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="hours"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorHours)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* ROI Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-4 flex flex-col items-center justify-center"
          >
            <SectionHeader title="AI ROI Score" subtitle="Enterprise-wide" />
            <ProgressRing
              value={87}
              max={100}
              size={160}
              strokeWidth={10}
              variant="success"
            />
            <div className="mt-4 text-center">
              <div className="text-sm text-muted-foreground">
                $19.7M value generated
              </div>
              <div className="text-xs text-success flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +12% vs target
              </div>
            </div>
          </motion.div>
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Vendor Spend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-4"
          >
            <SectionHeader title="Vendor Spend Distribution" subtitle="Monthly allocation" />
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vendorData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis
                    type="number"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(v) => `$${v / 1000}K`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, "Spend"]}
                  />
                  <Bar dataKey="spend" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Department Heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <HeatmapGrid
              title="AI Adoption by Department × Tool"
              rows={departmentHeatmap.rows}
              columns={departmentHeatmap.columns}
              data={departmentHeatmap.data}
              valueLabel="Adoption %"
            />
          </motion.div>
        </div>

        {/* Bottom Row - Top Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SectionHeader
            title="Top AI Power Users"
            subtitle="This month's highest productivity gains"
            action={
              <Button variant="ghost" size="sm" className="text-primary">
                View all users
              </Button>
            }
          />
          <DataTable
            columns={[
              { key: "name", header: "Name" },
              { key: "dept", header: "Department" },
              {
                key: "hours",
                header: "Hours Saved",
                render: (item) => (
                  <span className="font-mono text-primary">{item.hours}h</span>
                ),
              },
              {
                key: "status",
                header: "Status",
                render: (item) => <StatusBadge status={item.status} />,
              },
            ]}
            data={topUsers}
          />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default CommandCenter;
