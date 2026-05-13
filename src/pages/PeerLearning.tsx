import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  MessageSquare,
  BookOpen,
  Award,
  Star,
  ArrowUpRight,
  Play,
  ThumbsUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const engagementData = [
  { week: "W1", sessions: 8400, shares: 1200, completions: 3400 },
  { week: "W2", sessions: 9200, shares: 1450, completions: 3800 },
  { week: "W3", sessions: 10100, shares: 1680, completions: 4200 },
  { week: "W4", sessions: 11800, shares: 1920, completions: 4800 },
];

const topContent = [
  {
    title: "Advanced Prompt Engineering for Enterprise",
    author: "Sarah Chen",
    dept: "Engineering",
    views: 12400,
    rating: 4.9,
    type: "Course",
  },
  {
    title: "AI-Powered Sales Outreach Playbook",
    author: "Michael Ross",
    dept: "Sales",
    views: 8900,
    rating: 4.8,
    type: "Playbook",
  },
  {
    title: "Building Custom GPTs for Finance Teams",
    author: "Jennifer Liu",
    dept: "Finance",
    views: 7200,
    rating: 4.7,
    type: "Workshop",
  },
  {
    title: "Legal Contract Analysis with Claude",
    author: "David Park",
    dept: "Legal",
    views: 5400,
    rating: 4.6,
    type: "Guide",
  },
  {
    title: "Marketing Copy Generation Best Practices",
    author: "Elena Vance",
    dept: "Marketing",
    views: 4800,
    rating: 4.5,
    type: "Playbook",
  },
];

const topMentors = [
  { name: "Alex Rivera", dept: "Platform Engineering", mentees: 42, sessions: 128, rating: 4.9 },
  { name: "Priya Sharma", dept: "Data Science", mentees: 38, sessions: 112, rating: 4.8 },
  { name: "Marcus Johnson", dept: "Product", mentees: 35, sessions: 98, rating: 4.8 },
  { name: "Lisa Wong", dept: "Engineering", mentees: 31, sessions: 89, rating: 4.7 },
];

const learningPaths = [
  { name: "AI Fundamentals", enrolled: 45200, completed: 38400, avgTime: "4h" },
  { name: "Prompt Engineering Mastery", enrolled: 28900, completed: 18200, avgTime: "8h" },
  { name: "AI for Business Leaders", enrolled: 12400, completed: 9800, avgTime: "3h" },
  { name: "Advanced AI Automation", enrolled: 8900, completed: 4200, avgTime: "12h" },
  { name: "AI Ethics & Governance", enrolled: 32100, completed: 28400, avgTime: "2h" },
];

const communityHighlights = [
  {
    type: "Discussion",
    title: "Best practices for code review with AI assistants",
    author: "Engineering Guild",
    engagement: 234,
    time: "2h ago",
  },
  {
    type: "Question",
    title: "How to integrate Claude with Salesforce workflows?",
    author: "Sales Ops",
    engagement: 89,
    time: "4h ago",
  },
  {
    type: "Resource",
    title: "AI prompt library for financial modeling",
    author: "Finance Center of Excellence",
    engagement: 156,
    time: "6h ago",
  },
  {
    type: "Event",
    title: "Live: AI Agents Workshop with Platform Team",
    author: "AI Academy",
    engagement: 342,
    time: "Starting in 1h",
  },
];

const PeerLearning = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ExecSummary
          tone="insight"
          headline="Peer-led learning drives 3.2x faster time-to-competency than vendor training — but top 12 contributors are at burnout risk."
          detail="Formalize a Champions program with comp recognition for the top 50 contributors to sustain the network and unlock org-wide knowledge multiplier."
        />
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Peer Learning Hub</h1>
            <p className="text-sm text-muted-foreground">
              Knowledge sharing, mentorship, and community-driven AI learning
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Browse Content
            </Button>
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              Create Content
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Active Learners"
            value="67.2K"
            change={18.4}
            changeLabel="vs last month"
            icon={Users}
            variant="primary"
          />
          <MetricCard
            title="Content Pieces"
            value="2,847"
            change={24.2}
            changeLabel="vs last month"
            icon={BookOpen}
            variant="success"
          />
          <MetricCard
            title="Mentorship Sessions"
            value="1,245"
            change={32.1}
            changeLabel="vs last month"
            icon={MessageSquare}
            variant="primary"
          />
          <MetricCard
            title="Certifications Earned"
            value="8,932"
            change={41.5}
            changeLabel="vs last month"
            icon={Award}
            variant="success"
          />
        </div>

        {/* Engagement Chart & Community Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Engagement Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 glass-panel p-4"
          >
            <SectionHeader title="Learning Engagement Trend" subtitle="Weekly active participation" />
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData}>
                  <defs>
                    <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCompletions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                  <Area
                    type="monotone"
                    dataKey="sessions"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSessions)"
                    name="Sessions"
                  />
                  <Area
                    type="monotone"
                    dataKey="completions"
                    stroke="hsl(var(--success))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorCompletions)"
                    name="Completions"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Community Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-4"
          >
            <SectionHeader title="Community Activity" subtitle="Latest discussions" />
            <div className="space-y-3">
              {communityHighlights.map((item, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      {item.type}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground line-clamp-2">{item.title}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">{item.author}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ThumbsUp className="w-3 h-3" />
                      {item.engagement}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SectionHeader
            title="Top Rated Content"
            subtitle="Most popular learning resources this month"
            action={
              <Button variant="ghost" size="sm" className="text-primary">
                View all
              </Button>
            }
          />
          <DataTable
            columns={[
              {
                key: "title",
                header: "Title",
                render: (item) => (
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4 text-primary" />
                    <span className="font-medium">{item.title}</span>
                  </div>
                ),
              },
              { key: "author", header: "Author" },
              { key: "dept", header: "Department" },
              {
                key: "type",
                header: "Type",
                render: (item) => <Badge variant="outline">{item.type}</Badge>,
              },
              {
                key: "views",
                header: "Views",
                render: (item) => <span className="font-mono">{item.views.toLocaleString()}</span>,
              },
              {
                key: "rating",
                header: "Rating",
                render: (item) => (
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                    <span className="font-mono">{item.rating}</span>
                  </div>
                ),
              },
            ]}
            data={topContent}
          />
        </motion.div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Learning Paths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-4"
          >
            <SectionHeader title="Learning Paths" subtitle="Structured skill development tracks" />
            <div className="space-y-3">
              {learningPaths.map((path) => (
                <div key={path.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{path.name}</div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {(path.enrolled / 1000).toFixed(1)}K enrolled
                      </span>
                      <span className="text-xs text-success">
                        {Math.round((path.completed / path.enrolled) * 100)}% completion
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono text-primary">{path.avgTime}</div>
                    <div className="text-[10px] text-muted-foreground">avg time</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Mentors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SectionHeader
              title="Top AI Mentors"
              subtitle="Highest-rated knowledge sharers"
              action={
                <Button variant="ghost" size="sm" className="text-primary">
                  Become a mentor
                </Button>
              }
            />
            <DataTable
              columns={[
                { key: "name", header: "Name" },
                { key: "dept", header: "Department" },
                {
                  key: "mentees",
                  header: "Mentees",
                  render: (item) => <span className="font-mono text-primary">{item.mentees}</span>,
                },
                {
                  key: "sessions",
                  header: "Sessions",
                  render: (item) => <span className="font-mono">{item.sessions}</span>,
                },
                {
                  key: "rating",
                  header: "Rating",
                  render: (item) => (
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                      <span className="font-mono">{item.rating}</span>
                    </div>
                  ),
                },
              ]}
              data={topMentors}
            />
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PeerLearning;
