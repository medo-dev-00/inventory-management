import {
  CartesianGrid,
  Line,
  LineChart,
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

        const key = `${date.getFullYear()}-${String(
          date.getMonth() + 1,
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

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

  const textColor = isDark ? "#CBD5E1" : "#475569";
  const gridColor = isDark ? "#334155" : "#CBD5E1";
  const lineColor = isDark ? "#00A67D" : "#004532";

  return (
    <LineChart
      tabIndex={-1}
      style={{
        flex: 1,
        aspectRatio: 1.618,
        outline: "none",
      }}
      responsive
      data={chartData}
      margin={{
        top: 10,
        right: 30,
        left: 10,
        bottom: 10,
      }}
    >
      <CartesianGrid stroke={gridColor} strokeDasharray="4 5" />

      <XAxis
        dataKey="name"
        tickMargin={10}
        tick={{ fill: textColor }}
        axisLine={{ stroke: gridColor }}
        tickLine={{ stroke: gridColor }}
      />

      <YAxis
        tick={{ fill: textColor }}
        axisLine={{ stroke: gridColor }}
        tickLine={{ stroke: gridColor }}
        tickMargin={10}
        label={{
          value: "جنيه",
          fill: textColor,
          angle: -90,
        }}
      />

      <Tooltip
        contentStyle={{
          backgroundColor: isDark ? "#131B2E" : "#FFFFFF",
          border: `1px solid ${gridColor}`,
          borderRadius: "8px",
          color: textColor,
        }}
        labelStyle={{
          color: textColor,
          marginBottom: "5px",
        }}
        itemStyle={{
          color: lineColor,
        }}
        formatter={(value) => [`${value} جنيه`, "المبيعات"]}
      />

      <Line
        type="monotone"
        dataKey="sales"
        name="المبيعات"
        stroke={lineColor}
        strokeWidth={3}
        dot={false}
        activeDot={{
          r: 6,
        }}
        animationDuration={800}
        animationEasing="ease-out"
      />
    </LineChart>
  );
}
