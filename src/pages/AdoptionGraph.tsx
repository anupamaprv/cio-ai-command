import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { DataTable } from "@/components/dashboard/DataTable";
import { NetworkGraph } from "@/components/dashboard/NetworkGraph";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Network,
  Users,
  TrendingUp,
  Award,
  Zap,
  Search,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const skillNodes = [
  { id: "prompt", label: "Prompt Eng.", size: 16, x: 200, y: 80, color: "primary" as const },
  { id: "data", label: "Data Analysis", size: 14, x: 320, y: 120, color: "success" as const },
  { id: "code", label: "Code Gen", size: 18, x: 140, y: 160, color: "primary" as const },
  { id: "writing", label: "AI Writing", size: 12, x: 260, y: 200, color: "success" as const },
  { id: "research", label: "AI Research", size: 10, x: 80, y: 100, color: "warning" as const },
  { id: "automation", label: "Automation", size: 15, x: 350, y: 220, color: "primary" as const },
  { id: "agents", label: "AI Agents", size: 8, x: 180, y: 260, color: "warning" as const },
];

const skillEdges = [
  { from: "prompt", to: "code", strength: 2 },
  { from: "prompt", to: "writing", strength: 2 },
  { from: "prompt", to: "data", strength: 1.5 },
  { from: "data", to: "automation", strength: 1.5 },
  { from: "code", to: "agents", strength: 1 },
  { from: "code", to: "automation", strength: 2 },
  { from: "research", to: "prompt", strength: 1 },
  { from: "writing", to: "research", strength: 1 },
  { from: "agents", to: "automation", strength: 1.5 },
];

const skillRadarData = [
  { skill: "Prompt Engineering", company: 78, industry: 65, target: 85 },
  { skill: "Code Generation", company: 82, industry: 58, target: 90 },
  { skill: "Data Analysis", company: 71, industry: 62, target: 80 },
  { skill: "AI Writing", company: 68, industry: 55, target: 75 },
  { skill: "Automation", company: 65, industry: 48, target: 80 },
  { skill: "AI Agents", company: 45, industry: 32, target: 70 },
];

const adoptionByLevel = [
  { level: "C-Suite", adoption: 72, target: 85, gap: -13 },
  { level: "VPs", adoption: 84, target: 90, gap: -6 },
  { level: "Directors", adoption: 88, target: 90, gap: -2 },
  { level: "Managers", adoption: 79, target: 85, gap: -6 },
  { level: "Individual Contributors", adoption: 71, target: 80, gap: -9 },
];

const skillGaps = [
  { skill: "AI Agent Orchestration", currentLevel: 32, targetLevel: 70, priority: "critical" as const, employees: 8400 },
  { skill: "Advanced Prompt Engineering", currentLevel: 58, targetLevel: 85, priority: "warning" as const, employees: 24200 },
  { skill: "AI-Assisted Data Science", currentLevel: 62, targetLevel: 80, priority: "warning" as const, employees: 12800 },
  { skill: "LLM Fine-tuning", currentLevel: 28, targetLevel: 60, priority: "critical" as const, employees: 4200 },
  { skill: "AI Ethics & Governance", currentLevel: 45, targetLevel: 75, priority: "warning" as const, employees: 89000 },
];

const topLearners = [
  { name: "Maria Santos", dept: "Engineering", skills: 8, hours: 48, status: "active" as const },
  { name: "James Wilson", dept: "Data Science", skills: 7, hours: 42, status: "active" as const },
  { name: "Aisha Patel", dept: "Product", skills: 6, hours: 38, status: "active" as const },
  { name: "Robert Kim", dept: "Sales", skills: 5, hours: 34, status: "warning" as const },
  { name: "Emily Chen", dept: "Marketing", skills: 5, hours: 31, status: "active" as const },
];

const AdoptionGraph = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ExecSummary
          tone="opportunity"
          headline="Prompt Engineering & RAG skills exist in only 4% of the workforce — the #1 bottleneck to scaling AI beyond pilot teams."
          detail="EMEA adoption trails NA by 22 pts. A targeted 90-day upskilling cohort across Finance and Ops would close ~60% of the identified capability gap."
        />
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Adoption & Skills Graph</h1>
            <p className="text-sm text-muted-foreground">
              AI skill mapping, adoption rates, and capability gaps across the organization
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="w-4 h-4" />
              Find Skills
            </Button>
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              Training Programs
              <Zap className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="AI-Skilled Employees"
            value="89.4K"
            change={15.2}
            changeLabel="vs last quarter"
            icon={Users}
            variant="primary"
          />
          <MetricCard
            title="Avg Skills per Employee"
            value="4.2"
            change={0.8}
            changeLabel="vs last quarter"
            icon={Award}
            variant="success"
          />
          <MetricCard
            title="Learning Hours (MTD)"
            value="342K"
            change={28.5}
            changeLabel="vs last month"
            icon={TrendingUp}
            variant="primary"
          />
          <MetricCard
            title="Skill Coverage Index"
            value="76%"
            change={8.2}
            changeLabel="vs target"
            icon={Network}
            variant="warning"
          />
        </div>

        {/* Skills Network & Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Network Graph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SectionHeader title="AI Skills Network" subtitle="Relationship between skill clusters" />
            <NetworkGraph nodes={skillNodes} edges={skillEdges} width={400} height={320} />
          </motion.div>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-4"
          >
            <SectionHeader title="Skills Benchmark" subtitle="Company vs industry average" />
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillRadarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Radar name="Company" dataKey="company" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                  <Radar name="Industry Avg" dataKey="industry" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted-foreground))" fillOpacity={0.1} />
                  <Radar name="Target" dataKey="target" stroke="hsl(var(--success))" fill="none" strokeDasharray="5 5" />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Adoption by Level */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-4"
        >
          <SectionHeader title="Adoption by Organizational Level" subtitle="Current adoption vs target" />
          <div className="space-y-4">
            {adoptionByLevel.map((level) => (
              <div key={level.level} className="flex items-center gap-4">
                <div className="w-40 text-sm text-foreground">{level.level}</div>
                <div className="flex-1 relative">
                  <Progress value={level.adoption} className="h-3" />
                  <div
                    className="absolute top-0 h-3 w-0.5 bg-success"
                    style={{ left: `${level.target}%` }}
                  />
                </div>
                <div className="w-16 text-right">
                  <span className={cn(
                    "text-sm font-mono",
                    level.adoption >= level.target ? "text-success" : "text-foreground"
                  )}>
                    {level.adoption}%
                  </span>
                </div>
                <div className="w-20 text-right">
                  <span className={cn(
                    "text-xs",
                    level.gap >= 0 ? "text-success" : "text-warning"
                  )}>
                    {level.gap >= 0 ? "+" : ""}{level.gap}% gap
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Skill Gaps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SectionHeader
              title="Critical Skill Gaps"
              subtitle="Priority areas for training investment"
            />
            <DataTable
              columns={[
                { key: "skill", header: "Skill" },
                {
                  key: "gap",
                  header: "Gap",
                  render: (item) => (
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{item.currentLevel}%</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-mono text-sm text-success">{item.targetLevel}%</span>
                    </div>
                  ),
                },
                {
                  key: "priority",
                  header: "Priority",
                  render: (item) => <StatusBadge status={item.priority} />,
                },
                {
                  key: "employees",
                  header: "Affected",
                  render: (item) => <span className="text-muted-foreground">{(item.employees / 1000).toFixed(1)}K</span>,
                },
              ]}
              data={skillGaps}
            />
          </motion.div>

          {/* Top Learners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SectionHeader
              title="Top AI Learners"
              subtitle="Most active skill developers this month"
              action={
                <Button variant="ghost" size="sm" className="text-primary">
                  View all
                </Button>
              }
            />
            <DataTable
              columns={[
                { key: "name", header: "Name" },
                { key: "dept", header: "Department" },
                {
                  key: "skills",
                  header: "Skills",
                  render: (item) => <span className="font-mono text-primary">{item.skills}</span>,
                },
                {
                  key: "hours",
                  header: "Hours",
                  render: (item) => <span className="font-mono">{item.hours}h</span>,
                },
                {
                  key: "status",
                  header: "Status",
                  render: (item) => <StatusBadge status={item.status} />,
                },
              ]}
              data={topLearners}
            />
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdoptionGraph;
