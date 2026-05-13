import { ExecSummary } from "@/components/dashboard/ExecSummary";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { DataTable } from "@/components/dashboard/DataTable";
import { HeatmapGrid } from "@/components/dashboard/HeatmapGrid";
import { ProgressRing } from "@/components/dashboard/ProgressRing";
import { Button } from "@/components/ui/button";
import {
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  ArrowUpRight,
  Briefcase,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const departmentProductivity = [
  { name: "Engineering", hoursSaved: 42500, dollarValue: 4250000, employees: 18500, adoption: 94 },
  { name: "Sales", hoursSaved: 28300, dollarValue: 2830000, employees: 22000, adoption: 87 },
  { name: "Marketing", hoursSaved: 18700, dollarValue: 1870000, employees: 8500, adoption: 91 },
  { name: "Finance", hoursSaved: 12400, dollarValue: 1240000, employees: 6200, adoption: 78 },
  { name: "HR", hoursSaved: 8900, dollarValue: 890000, employees: 4800, adoption: 82 },
  { name: "Legal", hoursSaved: 6200, dollarValue: 620000, employees: 2400, adoption: 71 },
  { name: "Operations", hoursSaved: 9800, dollarValue: 980000, employees: 15000, adoption: 65 },
];

const weeklyTrend = [
  { week: "W1", engineering: 9200, sales: 6100, marketing: 4200, finance: 2800 },
  { week: "W2", engineering: 10100, sales: 6800, marketing: 4500, finance: 2900 },
  { week: "W3", engineering: 10800, sales: 7200, marketing: 4800, finance: 3100 },
  { week: "W4", engineering: 11400, sales: 7800, marketing: 5100, finance: 3400 },
];

const taskCategoryData = [
  { category: "Code Generation", hours: 24500 },
  { category: "Document Drafting", hours: 18200 },
  { category: "Data Analysis", hours: 15800 },
  { category: "Email Composition", hours: 12400 },
  { category: "Meeting Summaries", hours: 9800 },
  { category: "Research", hours: 8700 },
  { category: "Translation", hours: 5200 },
];

const productivityHeatmap = {
  rows: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  columns: ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM"],
  data: [
    [23, 78, 92, 88, 67, 34],
    [28, 82, 95, 91, 72, 38],
    [25, 79, 88, 85, 68, 32],
    [27, 84, 93, 89, 71, 35],
    [22, 76, 86, 82, 58, 28],
  ],
};

const topTeams = [
  { team: "Platform Engineering", manager: "Alex Rivera", hoursPerEmployee: 28.4, roi: "5.2x" },
  { team: "Enterprise Sales - West", manager: "Sarah Kim", hoursPerEmployee: 24.8, roi: "4.8x" },
  { team: "Content Marketing", manager: "Michael Chen", hoursPerEmployee: 22.1, roi: "4.5x" },
  { team: "M&A Finance", manager: "Jennifer Patel", hoursPerEmployee: 21.3, roi: "4.3x" },
  { team: "Talent Acquisition", manager: "David Okonkwo", hoursPerEmployee: 19.7, roi: "4.1x" },
];

const ProductivityIntelligence = () => {
  const totalHoursSaved = departmentProductivity.reduce((acc, d) => acc + d.hoursSaved, 0);
  const totalDollarValue = departmentProductivity.reduce((acc, d) => acc + d.dollarValue, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ExecSummary
          tone="insight"
          headline="Engineering & Customer Support deliver 71% of measured ROI ($14.2M); Finance & Legal lag at <8% — clear case for targeted enablement."
          detail="Avg. employee reclaims 6.4 hrs/week. Replicating Sales' AI-assisted workflow playbook across Marketing could add an estimated $3.1M / yr."
        />
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Productivity Intelligence</h1>
            <p className="text-sm text-muted-foreground">
              AI-driven productivity gains by function, team, and task type
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Briefcase className="w-4 h-4" />
              By Business Unit
            </Button>
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              Generate Report
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Hours Saved (MTD)"
            value={`${(totalHoursSaved / 1000).toFixed(0)}K`}
            change={18.5}
            changeLabel="vs last month"
            icon={Clock}
            variant="primary"
          />
          <MetricCard
            title="Dollar Value Generated"
            value={`$${(totalDollarValue / 1000000).toFixed(1)}M`}
            change={22.3}
            changeLabel="vs last month"
            icon={DollarSign}
            variant="success"
          />
          <MetricCard
            title="Avg Hours/Employee"
            value="12.4h"
            change={8.7}
            changeLabel="vs last month"
            icon={Users}
            variant="primary"
          />
          <MetricCard
            title="Enterprise ROI"
            value="4.7x"
            change={0.6}
            changeLabel="vs last quarter"
            icon={TrendingUp}
            variant="success"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Department Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 glass-panel p-4"
          >
            <SectionHeader title="Hours Saved by Department" subtitle="Monthly breakdown" />
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentProductivity} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis
                    type="number"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(v) => `${v / 1000}K`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    width={90}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value.toLocaleString()} hours`, "Hours Saved"]}
                  />
                  <Bar dataKey="hoursSaved" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* ROI Rings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-4"
          >
            <SectionHeader title="Department Adoption" subtitle="Percentage of employees using AI" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              {departmentProductivity.slice(0, 4).map((dept) => (
                <ProgressRing
                  key={dept.name}
                  value={dept.adoption}
                  max={100}
                  size={80}
                  strokeWidth={6}
                  label={dept.name}
                  variant={dept.adoption >= 85 ? "success" : dept.adoption >= 70 ? "primary" : "warning"}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Weekly Trend Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-4"
          >
            <SectionHeader title="Weekly Productivity Trend" subtitle="Hours saved per week by department" />
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="engineering" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="sales" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="marketing" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="finance" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Peak Usage Heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <HeatmapGrid
              title="Peak AI Usage Patterns"
              rows={productivityHeatmap.rows}
              columns={productivityHeatmap.columns}
              data={productivityHeatmap.data}
              valueLabel="Usage Index"
            />
          </motion.div>
        </div>

        {/* Task Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-4"
        >
          <SectionHeader title="Productivity by Task Category" subtitle="Where AI creates the most value" />
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taskCategoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={11} angle={-15} textAnchor="end" height={60} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v / 1000}K`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`${value.toLocaleString()} hours`, "Hours Saved"]}
                />
                <Bar dataKey="hours" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Teams Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <SectionHeader
            title="Top Performing Teams"
            subtitle="Highest productivity gains per employee"
            action={
              <Button variant="ghost" size="sm" className="text-primary">
                View all teams
              </Button>
            }
          />
          <DataTable
            columns={[
              { key: "team", header: "Team" },
              { key: "manager", header: "Manager" },
              {
                key: "hoursPerEmployee",
                header: "Hours/Employee",
                render: (item) => <span className="font-mono text-primary">{item.hoursPerEmployee}h</span>,
              },
              {
                key: "roi",
                header: "ROI",
                render: (item) => (
                  <span className={cn("font-mono text-success")}>{item.roi}</span>
                ),
              },
            ]}
            data={topTeams}
          />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ProductivityIntelligence;
