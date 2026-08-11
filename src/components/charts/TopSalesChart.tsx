import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

interface Sale {
  productId: string;
  productName: string;
  quantity: number;
  total: number;
  createdAt: string;
}

export default function BestSellingProducts() {
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

  // متابعة الـ dark mode
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

  // تجميع المبيعات حسب المنتج
  const productSales = sales.reduce<
    Record<string, { name: string; quantity: number }>
  >((acc, sale) => {
    if (!acc[sale.productName]) {
      acc[sale.productName] = {
        name: sale.productName,
        quantity: 0,
      };
    }

    acc[sale.productName].quantity += sale.quantity;

    return acc;
  }, {});

  // ترتيب المنتجات من الأكثر مبيعًا للأقل
  const chartData = Object.values(productSales)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const textColor = isDark ? "#CBD5E1" : "#475569";
  const gridColor = isDark ? "#334155" : "#CBD5E1";
  const barColor = isDark ? "#00A67D" : "#004532";

  return (
    <section className="card p-5 flex-1 basis-100">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        أفضل المنتجات مبيعًا
      </h2>

      {chartData.length === 0 ? (
        <p className="text-center py-10 text-slate-500 dark:text-slate-400">
          لا توجد مبيعات حتى الآن
        </p>
      ) : (
        <BarChart
          style={{
            width: "100%",
            height: "350px",
          }}
          responsive
          data={chartData}
          layout="vertical"
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid
            stroke={gridColor}
            strokeDasharray="3 3"
            horizontal={false}
          />

          {/* القيمة */}
          <XAxis
            type="number"
            tick={{ fill: textColor }}
            axisLine={{ stroke: gridColor }}
            tickLine={{ stroke: gridColor }}
            reversed
          />

          {/* أسماء المنتجات */}
          <YAxis
            type="category"
            dataKey="name"
            width={100}
            tick={{ fill: textColor }}
            axisLine={{ stroke: gridColor }}
            tickLine={false}
            orientation="right"
            tickMargin={100}
          />

          <Tooltip
            cursor={{
              fill: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
            }}
            contentStyle={{
              backgroundColor: isDark ? "#131B2E" : "#ffffff",
              border: `1px solid ${gridColor}`,
              borderRadius: "8px",
            }}
            labelStyle={{
              color: textColor,
              marginBottom: "5px",
            }}
            itemStyle={{
              color: barColor,
            }}
            formatter={(value) => [`${value} قطعة`, "المبيعات"]}
          />

          <Bar
            dataKey="quantity"
            fill={barColor}
            radius={[0, 6, 6, 0]}
            barSize={45}
          />
        </BarChart>
      )}
    </section>
  );
}
