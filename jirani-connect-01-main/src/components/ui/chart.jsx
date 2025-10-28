import React, { createContext, useContext } from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

const ChartContext = createContext({ config: {} });

function useChart() {
  return useContext(ChartContext);
}

// Chart container
const ChartContainer = React.forwardRef(
  ({ className, config = {}, id, children, ...props }, ref) => {
    const uniqueId = React.useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          data-chart={chartId}
          ref={ref}
          className={cn(
            "flex aspect-video justify-center text-xs",
            className
          )}
          {...props}
        >
          <ChartStyle id={chartId} config={config} />
          <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    );
  }
);

ChartContainer.displayName = "ChartContainer";

// ChartStyle component
const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config || {}).filter(
    ([_, cfg]) => cfg.theme || cfg.color
  );

  if (!colorConfig.length) return null;

  const styleString = colorConfig
    .map(([key, itemConfig]) => {
      const color = itemConfig.color || (itemConfig.theme && itemConfig.theme.light);
      return color ? `--color-${key}: ${color};` : "";
    })
    .join("\n");

  return <style>{`[data-chart=${id}] { ${styleString} }`}</style>;
};

// Tooltip wrapper
const ChartTooltipContent = React.forwardRef(
  ({ active, payload, className, hideLabel = false, indicator = "dot", labelKey, nameKey }, ref) => {
    const { config } = useChart();

    if (!active || !payload?.length) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {payload.map((item, idx) => {
          const key = nameKey || item.name || item.dataKey || "value";
          const value = item.value;
          const color = item.color || item.payload?.fill;

          return (
            <div key={idx} className="flex justify-between items-center gap-2">
              {!hideLabel && <span>{key}</span>}
              {value !== undefined && (
                <span className="font-mono font-medium tabular-nums">{value}</span>
              )}
              {indicator === "dot" && (
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

ChartTooltipContent.displayName = "ChartTooltipContent";

const ChartLegendContent = React.forwardRef(
  ({ payload, className, hideIcon = false, verticalAlign = "bottom", nameKey }, ref) => {
    const { config } = useChart();
    if (!payload?.length) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item, idx) => {
          const key = nameKey || item.dataKey || "value";
          const color = item.color || "#000";

          return (
            <div key={idx} className="flex items-center gap-1.5">
              {!hideIcon && <div className="h-2 w-2 rounded" style={{ backgroundColor: color }} />}
              <span>{key}</span>
            </div>
          );
        })}
      </div>
    );
  }
);

ChartLegendContent.displayName = "ChartLegendContent";

const ChartTooltip = RechartsPrimitive.Tooltip;
const ChartLegend = RechartsPrimitive.Legend;

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
