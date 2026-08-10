import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";

interface Sale {
  createdAt: string;
  total: number;
}

export default function SalesChart() {
  const [sales] = useState<Sale[]>(() => {
    const storageSales = localStorage.getItem("sales");

    if (storageSales) {
      return JSON.parse(storageSales);
    }

    return [];
  });

  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const chartData = Object.values(
    sales.reduce<Record<string, { name: string; sales: number }>>(
      (acc, sale) => {
        const date = new Date(sale.createdAt);

        const key = date.toISOString().split("T")[0];

        if (!acc[key]) {
          acc[key] = {
            name: date.toLocaleDateString("ar-EG", {
              day: "numeric",
              month: "short",
            }),
            sales: 0,
          };
        }

        acc[key].sales += sale.total;

        return acc;
      },
      {},
    ),
  );

  const textColor = isDark ? "white" : "#004532";
  const gridColor = isDark ? "#334155" : "#CBD5E1";
  const areaColor = isDark ? "#00A67D" : "#004532";

  return (
    <AreaChart
      tabIndex={-99}
      style={{
        width: "100%",
        aspectRatio: 1.618,
        maxWidth: 1200,
        maxHeight: 600,
        outline: "none",
        padding: 10,
      }}
      responsive
      data={chartData}
      margin={{
        top: 20,
        right: 20,
        bottom: 5,
        left: 10,
      }}
    >
      <CartesianGrid stroke={gridColor} strokeDasharray="4 4" tabIndex={-99} />

      <XAxis
        tabIndex={-99}
        dataKey="name"
        tickMargin={10}
        tick={{ fill: textColor }}
        axisLine={{ stroke: gridColor }}
        tickLine={{ stroke: gridColor }}
      />

      <YAxis
        tabIndex={-99}
        width="auto"
        tickMargin={30}
        tick={{ fill: textColor }}
        axisLine={{ stroke: gridColor }}
        tickLine={{ stroke: gridColor }}
        label={{
          value: "جنيه",
          fill: textColor,
        }}
      />

      <Tooltip
        contentStyle={{
          backgroundColor: isDark ? "#FFFFFF" : "#eee",
          border: `1px solid ${gridColor}`,
          borderRadius: "8px",
          color: textColor,
          boxShadow: isDark
            ? "0 4px 15px rgba(0, 0, 0, 0.3)"
            : "0 4px 15px rgba(0, 0, 0, 0.1)",
        }}
        labelStyle={{
          color: "black",
          marginBottom: "5px",
        }}
        itemStyle={{
          color: isDark ? "#00A67D" : "#004532",
        }}
        formatter={(value) => [`${value} جنيه`, "المبيعات"]}
      />

      <Area
        type="monotone"
        dataKey="sales"
        stroke={areaColor}
        fill={areaColor}
        fillOpacity={isDark ? 0.3 : 0.2}
        strokeWidth={3}
      />
    </AreaChart>
  );
}
