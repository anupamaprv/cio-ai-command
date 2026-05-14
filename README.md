# AICommand

One-shot central dashboard for C-suite executives (CEO, CIO, CFO, Chief AI/Risk Officer, CLO) to view AI initiatives, licensing costs and ROI, training programs, governance/intake, and productivity gains from projects launched into production. For individual employees, it doubles as a way to benchmark against peers and accelerate AI fluency and build efforts.

## Tabs

- **Command Center** — Executive overview: spend, active users, hours saved, ROI, vendor mix, and adoption heatmap by department × tool.
- **Spend Intelligence** — AI vendor spend, license utilization, shelfware detection, and renewal/rebalancing signals.
- **Productivity Intelligence** — Hours and dollars saved by function, with ROI multipliers and trendlines.
- **Initiative Pipeline** — End-to-end view from intake → pilot → production, including rejections, cancellations, and stage velocity.
- **Governance** — Risk-tiered classification (high/medium/low), approvals queue, legal review, and auditability.
- **Adoption & Skills Graph** — Skill mapping, adoption hotspots, and capability gaps across the org.
- **Peer Learning** — Peer-to-peer learning hub, top contributors, and time-to-competency benchmarks.

Every tab leads with a one-line **Executive Summary** highlighting the single most important signal a C-level should register and action.

## Tech Stack

- **Frontend**: React 18 + TypeScript 5, Vite 5
- **Styling**: Tailwind CSS v3 with semantic HSL design tokens, glassmorphism panels, IBM Plex Sans typography
- **UI primitives**: shadcn/ui (Radix), lucide-react icons
- **Animation**: Framer Motion
- **Charts/Viz**: Recharts (area, bar, radial), custom heatmaps, network graphs, progress rings
- **Routing**: React Router
- **State/Data**: TanStack Query (ready for live data), currently driven by structured mock data
- **Backend (optional)**: Lovable Cloud (Supabase under the hood) for auth, Postgres, storage, and edge functions
- **SEO/AI-readiness**: `sitemap.xml`, `robots.txt`, `llms.txt`, preconnect + preloaded fonts, semantic HTML

## Decision Tradeoffs

- **Dark, dense, "Palantir/Datadog" aesthetic over friendly SaaS pastels** — target persona is the boardroom; credibility and information density beat playfulness.
- **Single-page tabs vs. drill-down apps** — chose flat top-level navigation so a CEO never gets lost more than one click deep. Drill-downs live inside each tab.
- **Exec Summary banner on every tab** — execs complained "too many KPIs"; the 1-liner forces editorial judgment about the single most actionable item.
- **Mock data first, Cloud optional** — ships a fully interactive demo without forcing schema decisions. Lovable Cloud can be enabled when a customer brings real vendor/HRIS/SSO feeds.
- **Recharts over D3** — faster to ship, good enough for exec-grade visuals; D3 reserved for the network/skills graph where layout control matters.
- **Roles in a separate `user_roles` table** (when Cloud is enabled) — avoids the classic privilege-escalation trap of storing roles on the profile row.
- **Client-side only by default** — no server runtime in the sandbox; anything stateful is delegated to Cloud edge functions.

## Models & AI Usage

The product is *about* AI usage in the enterprise; the app itself is intentionally light on inline AI inference. When AI features are enabled, they route through the **Lovable AI Gateway**, with these defaults:

- **Summarization & exec-narrative generation** — `google/gemini-2.5-flash` (fast, cheap, strong reasoning for short structured output).
- **Deep analysis / multi-document synthesis** — `google/gemini-2.5-pro` (longer context, better for cross-vendor reconciliation).
- **Classification & governance triage** (risk tiering, intake routing) — `google/gemini-2.5-flash-lite` (cheapest, deterministic-enough for tagged outputs).
- **Embeddings for the skills graph & peer-match** — pluggable; default to a hosted small embedding model via the gateway.

Model selection is centralized so it can be swapped per-tenant without touching component code. Vendor spend data shown in the Command Center (OpenAI, Anthropic, Microsoft, Google AI, Cohere) reflects what the *customer* spends on AI — not what AICommand itself runs on.

## Getting Started

```sh
npm i
npm run dev
```

Built with [Lovable](https://lovable.dev). Changes pushed to this repo sync back to the Lovable editor and vice versa.
