import { Bell, Search, User, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TopBar() {
  return (
    <header className="h-14 border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search across all modules..."
            className="w-80 pl-10 bg-muted/50 border-border/50 focus:border-primary/50 h-9 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Live Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
          <Activity className="w-3.5 h-3.5 text-success animate-pulse" />
          <span className="text-xs font-medium text-success">All Systems Online</span>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
        </Button>

        {/* User */}
        <Button variant="ghost" size="icon" className="rounded-full">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
        </Button>
      </div>
    </header>
  );
}
