import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Node {
  id: string;
  label: string;
  size: number;
  x: number;
  y: number;
  color?: "primary" | "success" | "warning" | "danger";
}

interface Edge {
  from: string;
  to: string;
  strength?: number;
}

interface NetworkGraphProps {
  nodes: Node[];
  edges: Edge[];
  width?: number;
  height?: number;
}

const colorClasses = {
  primary: "fill-primary stroke-primary",
  success: "fill-success stroke-success",
  warning: "fill-warning stroke-warning",
  danger: "fill-destructive stroke-destructive",
};

export function NetworkGraph({
  nodes,
  edges,
  width = 400,
  height = 300,
}: NetworkGraphProps) {
  const getNode = (id: string) => nodes.find((n) => n.id === id);

  return (
    <div className="glass-panel p-4 overflow-hidden">
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Edges */}
        {edges.map((edge, index) => {
          const fromNode = getNode(edge.from);
          const toNode = getNode(edge.to);
          if (!fromNode || !toNode) return null;

          return (
            <motion.line
              key={`edge-${index}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="hsl(var(--primary))"
              strokeWidth={edge.strength ?? 1}
              strokeOpacity={0.3}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, index) => (
          <motion.g
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {/* Glow effect */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size + 4}
              className={cn(
                "opacity-20",
                colorClasses[node.color ?? "primary"]
              )}
            />
            {/* Node circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              className={cn(
                "stroke-2 opacity-80",
                colorClasses[node.color ?? "primary"]
              )}
            />
            {/* Label */}
            <text
              x={node.x}
              y={node.y + node.size + 14}
              textAnchor="middle"
              className="fill-foreground text-[9px] font-medium"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
