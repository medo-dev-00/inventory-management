import {
  PieChart,
  Pie,
  Sector,
  type PieSectorShapeProps,
  LabelList,
  type LabelProps,
} from "recharts";
import { useSales } from "../../hooks/useSales";

interface Cat {
  name: string;
  value: number;
}
const colors = [
  "#004532",
  "#006B50",
  "#009B78",
  "#3B82F6",
  "#8B5CF6",
  "#F59E0B",
];

const MyCustomPie = (props: PieSectorShapeProps) => (
  <Sector {...props} fill={colors[(props.index ?? 0) % colors.length]} />
);

const MyCustomLabel = (props: LabelProps) => (
  <text
    x={props.x}
    y={props.y}
    fill={colors[(props.index ?? 0) % colors.length]}
    textAnchor={props.textAnchor}
    dominantBaseline="central"
    fontSize={14}
    fontWeight={600}
  >
    {props.value}
  </text>
);

export default function CategoryChart() {
  const { sales } = useSales();
  const data: Cat[] = Object.entries(
    sales.reduce<Record<string, number>>((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {}),
  ).map(([name, value]) => ({
    name,
    value,
  }));
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <section className=" card p-4 h-fit flex-1 max-xl:mx-auto w-full">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        المنتجات حسب التصنيف
      </h2>
      {data.length === 0 ? (
        <p className="text-center py-10 text-slate-500 dark:text-slate-400">
          لا توجد مبيعات حتى الآن
        </p>
      ) : (
        <>
          <PieChart
            style={{
              width: "100%",
              maxWidth: "600px",
              maxHeight: "300px",
              aspectRatio: 1,
            }}
            data={data}
            responsive
          >
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="70%"
              isAnimationActive
              shape={MyCustomPie}
              stroke="none"
            >
              <LabelList content={MyCustomLabel} />
            </Pie>
          </PieChart>
          <div className="text-[#0b1c30] dark:text-white">
            {data.map((product, index) => {
              return (
                <div
                  key={product.name}
                  className="flex items-center justify-between mt-2"
                >
                  <div className="flex gap-2 items-center">
                    <div
                      style={{ backgroundColor: colors[index] }}
                      className="size-5 rounded-sm"
                    ></div>

                    <div className="text-gray-700 dark:text-gray-200">
                      {product.name}
                    </div>
                  </div>

                  <div className="font-bold text-[#0b1c30] dark:text-white">
                    {Math.ceil((product.value / total) * 100)}%
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
