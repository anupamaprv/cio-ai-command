import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface HeatmapCell {
  label: string;
  value: number;
  maxValue: number;
}

interface HeatmapGridProps {
  rows: string[];
  columns: string[];
  data: number[][];
  title?: string;
  valueLabel?: string;
}

function getIntensityClass(value: number, max: number): string {
  const ratio = value / max;
  if (ratio >= 0.8) return "bg-primary text-primary-foreground";
  if (ratio >= 0.6) return "bg-primary/70 text-primary-foreground";
  if (ratio >= 0.4) return "bg-primary/50 text-foreground";
  if (ratio >= 0.2) return "bg-primary/30 text-foreground";
  return "bg-primary/10 text-muted-foreground";
}

export function HeatmapGrid({
  rows,
  columns,
  data,
  title,
  valueLabel = "Value",
}: HeatmapGridProps) {
  const maxValue = Math.max(...data.flat());

  return (
    <div className="glass-panel p-4">
      {title && (
        <h3 className="text-sm font-medium text-foreground mb-4">{title}</h3>
      )}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Column headers */}
          <div className="flex">
            <div className="w-24 flex-shrink-0" />
            {columns.map((col) => (
              <div
                key={col}
                className="flex-1 min-w-[60px] text-[10px] font-medium text-muted-foreground text-center pb-2 truncate px-1"
              >
                {col}
              </div>
            ))}
          </div>

          {/* Grid rows */}
          {rows.map((row, rowIndex) => (
            <div key={row} className="flex items-center">
              <div className="w-24 flex-shrink-0 text-xs text-muted-foreground truncate pr-2">
                {row}
              </div>
              {columns.map((col, colIndex) => (
                <Tooltip key={`${row}-${col}`}>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "flex-1 min-w-[60px] h-10 m-0.5 rounded flex items-center justify-center text-xs font-medium cursor-pointer transition-transform hover:scale-105",
                        getIntensityClass(data[rowIndex][colIndex], maxValue)
                      )}
                    >
                      {data[rowIndex][colIndex]}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-medium">{row} × {col}</p>
                    <p className="text-muted-foreground">{valueLabel}: {data[rowIndex][colIndex]}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-4">
        <span className="text-[10px] text-muted-foreground">Low</span>
        <div className="flex gap-0.5">
          {[10, 30, 50, 70, 100].map((intensity) => (
            <div
              key={intensity}
              className={cn(
                "w-4 h-3 rounded-sm",
                getIntensityClass(intensity, 100)
              )}
            />
          ))}
        </div>
        <span className="text-[10px] text-muted-foreground">High</span>
      </div>
    </div>
  );
}
