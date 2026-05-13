import { AlertTriangle, Sparkles, TrendingUp, ShieldAlert, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tone = "action" | "risk" | "opportunity" | "insight";

interface ExecSummaryProps {
  headline: string;
  detail: string;
  tone?: Tone;
  audience?: string;
}

const toneConfig: Record<Tone, { icon: typeof Sparkles; ring: string; text: string; bg: string; label: string }> = {
  action: {
    icon: TrendingUp,
    ring: "border-primary/40",
    text: "text-primary",
    bg: "bg-primary/10",
    label: "Action",
  },
  risk: {
    icon: ShieldAlert,
    ring: "border-destructive/40",
    text: "text-destructive",
    bg: "bg-destructive/10",
    label: "Risk",
  },
  opportunity: {
    icon: Lightbulb,
    ring: "border-warning/40",
    text: "text-warning",
    bg: "bg-warning/10",
    label: "Opportunity",
  },
  insight: {
    icon: Sparkles,
    ring: "border-accent/40",
    text: "text-accent",
    bg: "bg-accent/10",
    label: "Insight",
  },
};

export function ExecSummary({ headline, detail, tone = "insight", audience = "CEO · CIO · Chief AI/Risk Officer" }: ExecSummaryProps) {
  const cfg = toneConfig[tone];
  const Icon = cfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "glass-panel border rounded-xl px-4 py-3 mb-6 flex items-start gap-3",
        cfg.ring
      )}
    >
      <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0", cfg.bg)}>
        <Icon className={cn("w-4 h-4", cfg.text)} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={cn("text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded", cfg.bg, cfg.text)}>
            Exec Brief · {cfg.label}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">For {audience}</span>
        </div>
        <p className="text-sm font-semibold text-foreground leading-snug">{headline}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{detail}</p>
      </div>
      <div className="hidden md:flex items-center gap-1.5 text-[10px] text-muted-foreground flex-shrink-0">
        <AlertTriangle className="w-3 h-3" />
        <span>Auto-generated · {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
      </div>
    </motion.div>
  );
}
