import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Download,
  Filter,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const vendorSpendData = [
  { name: "Microsoft Copilot", value: 1450000, color: "hsl(var(--chart-1))", licenses: 45000, utilized: 38500, change: 12 },
  { name: "OpenAI Enterprise", value: 890000, color: "hsl(var(--chart-2))", licenses: 25000, utilized: 22100, change: 23 },
  { name: "Anthropic Claude", value: 560000, color: "hsl(var(--chart-3))", licenses: 15000, utilized: 12800, change: 45 },
  { name: "Google Gemini", value: 420000, color: "hsl(var(--chart-4))", licenses: 12000, utilized: 8900, change: -5 },
  { name: "Salesforce Einstein", value: 380000, color: "hsl(var(--chart-5))", licenses: 18000, utilized: 16200, change: 8 },
];

const spendTrend = [
  { month: "Jul", total: 3200000, forecasted: 3100000 },
  { month: "Aug", total: 3450000, forecasted: 3400000 },
  { month: "Sep", total: 3600000, forecasted: 3700000 },
  { month: "Oct", total: 3900000, forecasted: 3850000 },
  { month: "Nov", total: 4100000, forecasted: 4000000 },
  { month: "Dec", total: 4200000, forecasted: 4300000 },
];

const contractDetails = [
  {
    vendor: "Microsoft Copilot",
    contractValue: "$17.4M",
    startDate: "Jan 2024",
    endDate: "Dec 2026",
    status: "active" as const,
    nextRenewal: "90 days",
  },
  {
    vendor: "OpenAI Enterprise",
    contractValue: "$10.7M",
    startDate: "Mar 2024",
    endDate: "Mar 2025",
    status: "warning" as const,
    nextRenewal: "45 days",
  },
  {
    vendor: "Anthropic Claude",
    contractValue: "$6.7M",
    startDate: "Jun 2024",
    endDate: "Jun 2025",
    status: "active" as const,
    nextRenewal: "180 days",
  },
  {
    vendor: "Google Gemini",
    contractValue: "$5.0M",
    startDate: "Sep 2024",
    endDate: "Sep 2025",
    status: "critical" as const,
    nextRenewal: "15 days",
  },
];

const SpendIntelligence = () => {
  const totalSpend = vendorSpendData.reduce((acc, v) => acc + v.value, 0);
  const totalLicenses = vendorSpendData.reduce((acc, v) => acc + v.licenses, 0);
  const totalUtilized = vendorSpendData.reduce((acc, v) => acc + v.utilized, 0);
  const utilizationRate = Math.round((totalUtilized / totalLicenses) * 100);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ExecSummary
          tone="opportunity"
          headline="$1.4M in shelfware identified across 4 vendors — Legal & HR utilization below 40%, recoverable at next renewal."
          detail="Top action: consolidate 3 overlapping LLM contracts (OpenAI, Anthropic, Cohere) into tiered enterprise agreement to unlock ~18% blended discount."
        />
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">AI Spend & Vendor Intelligence</h1>
            <p className="text-sm text-muted-foreground">
              Complete visibility into AI vendor contracts, spend, and license utilization
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className="w-4 h-4" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Annual Spend"
            value="$48.2M"
            change={-3.2}
            changeLabel="vs budget"
            icon={DollarSign}
            variant="primary"
          />
          <MetricCard
            title="Active Vendors"
            value="12"
            icon={TrendingUp}
            variant="default"
          />
          <MetricCard
            title="License Utilization"
            value={`${utilizationRate}%`}
            change={5.2}
            changeLabel="vs last quarter"
            variant="success"
          />
          <MetricCard
            title="Potential Savings"
            value="$2.8M"
            icon={AlertTriangle}
            variant="warning"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Spend Distribution Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-4"
          >
            <SectionHeader title="Spend by Vendor" subtitle="Current allocation" />
            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vendorSpendData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {vendorSpendData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, "Spend"]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="text-2xl font-semibold font-mono">${(totalSpend / 1000000).toFixed(1)}M</div>
                  <div className="text-xs text-muted-foreground">MTD</div>
                </div>
              </div>
            </div>
            {/* Legend */}
            <div className="mt-4 space-y-2">
              {vendorSpendData.slice(0, 4).map((vendor) => (
                <div key={vendor.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: vendor.color }} />
                    <span className="text-muted-foreground truncate">{vendor.name}</span>
                  </div>
                  <span className="font-mono">${(vendor.value / 1000000).toFixed(2)}M</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Spend Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass-panel p-4"
          >
            <SectionHeader title="Spend Trend vs Forecast" subtitle="6-month view" />
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={spendTrend}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(v) => `$${v / 1000000}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`]}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                    name="Actual"
                  />
                  <Area
                    type="monotone"
                    dataKey="forecasted"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fillOpacity={0}
                    name="Forecasted"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* License Utilization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-4"
        >
          <SectionHeader
            title="License Utilization by Vendor"
            subtitle="Active licenses vs allocated"
          />
          <div className="space-y-4">
            {vendorSpendData.map((vendor) => {
              const utilization = Math.round((vendor.utilized / vendor.licenses) * 100);
              return (
                <div key={vendor.name} className="flex items-center gap-4">
                  <div className="w-40 text-sm text-foreground truncate">{vendor.name}</div>
                  <div className="flex-1">
                    <Progress value={utilization} className="h-2" />
                  </div>
                  <div className="w-20 text-right">
                    <span className={cn(
                      "text-sm font-mono",
                      utilization >= 80 ? "text-success" : utilization >= 60 ? "text-warning" : "text-destructive"
                    )}>
                      {utilization}%
                    </span>
                  </div>
                  <div className="w-32 text-right text-sm text-muted-foreground">
                    {vendor.utilized.toLocaleString()} / {vendor.licenses.toLocaleString()}
                  </div>
                  <div className="w-16">
                    <div className={cn(
                      "flex items-center gap-1 text-xs",
                      vendor.change >= 0 ? "text-success" : "text-destructive"
                    )}>
                      {vendor.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {vendor.change >= 0 ? "+" : ""}{vendor.change}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Contract Details Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SectionHeader
            title="Contract Overview"
            subtitle="Active vendor agreements"
            action={
              <Button variant="ghost" size="sm" className="text-primary">
                Manage contracts
              </Button>
            }
          />
          <DataTable
            columns={[
              { key: "vendor", header: "Vendor" },
              {
                key: "contractValue",
                header: "Contract Value",
                render: (item) => <span className="font-mono">{item.contractValue}</span>,
              },
              { key: "startDate", header: "Start Date" },
              { key: "endDate", header: "End Date" },
              {
                key: "status",
                header: "Status",
                render: (item) => <StatusBadge status={item.status} />,
              },
              {
                key: "nextRenewal",
                header: "Next Action",
                render: (item) => (
                  <span className={cn(
                    "text-sm",
                    item.status === "critical" ? "text-destructive font-medium" : "text-muted-foreground"
                  )}>
                    {item.nextRenewal}
                  </span>
                ),
              },
            ]}
            data={contractDetails}
          />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default SpendIntelligence;
