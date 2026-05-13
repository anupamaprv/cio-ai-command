import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  DollarSign,
  TrendingUp,
  Network,
  Users,
  Settings,
  Command,
  GitBranch,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  {
    title: "Command Center",
    href: "/",
    icon: LayoutDashboard,
    description: "Executive overview",
  },
  {
    title: "Spend Intelligence",
    href: "/spend",
    icon: DollarSign,
    description: "AI vendor analytics",
  },
  {
    title: "Productivity",
    href: "/productivity",
    icon: TrendingUp,
    description: "ROI by function",
  },
  {
    title: "Initiative Pipeline",
    href: "/pipeline",
    icon: GitBranch,
    description: "Intake → Production",
  },
  {
    title: "Adoption Graph",
    href: "/adoption",
    icon: Network,
    description: "Skills & adoption",
  },
  {
    title: "Peer Learning",
    href: "/learning",
    icon: Users,
    description: "Knowledge network",
  },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="h-screen bg-sidebar border-r border-sidebar-border flex flex-col sticky top-0"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center glow-primary">
            <Command className="w-4 h-4 text-primary" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col"
            >
              <span className="text-sm font-semibold text-foreground">AICommand</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Enterprise</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                isActive
                  ? "bg-primary/10 text-primary border-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary")} />
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col min-w-0"
                >
                  <span className="text-sm font-medium truncate">{item.title}</span>
                  <span className="text-[10px] text-muted-foreground truncate">{item.description}</span>
                </motion.div>
              )}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-full"
                />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
