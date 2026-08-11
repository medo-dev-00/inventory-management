import { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProducts";

interface Stock {
  label: string;
  value: number;
  color: string;
  border?: boolean;
}
export default function StockStatus() {
  const { products } = useProducts();
  const [stockStatus, setStockStats] = useState<Stock[]>([]);
  useEffect(() => {
    let low = 0;
    let more = 0;
    let out = 0;
    products.map((product): number | void => {
      if (product.quantity <= 0) {
        out++;
      } else if (product.quantity <= product.min_stock) {
        low++;
      } else if (product.quantity > product.min_stock) {
        more++;
      }
    });
    const stock = [
      {
        label: "وفرة بكرة",
        value: more,
        color: "bg-green-500",
      },
      {
        label: "كمية محدودة",
        value: low,
        color: "bg-yellow-500",
      },
      {
        label: "نفد من المخزون",
        value: out,
        color: "bg-red-300",
        border: true,
      },
    ];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStockStats(stock);
  }, [products]);

  return (
    <section className="card p-5 flex-1 basis-100">
      <h2 className="mb-10 text-2xl font-bold text-slate-900 dark:text-white">
        حالة المخزون
      </h2>

      <div className="space-y-6">
        {stockStatus.map((status) => (
          <div
            key={status.label}
            className={`
              flex items-center justify-between
              rounded-lg px-7 py-7
              bg-slate-100 dark:bg-[#182136]
              ${status.border ? "border border-red-500" : ""}
            `}
          >
            {/* القيمة */}
            <span
              className={`
                text-3xl font-bold
                ${
                  status.border
                    ? "text-red-300"
                    : "text-slate-800 dark:text-white"
                }
              `}
            >
              {status.value}
            </span>

            {/* الاسم + النقطة */}
            <div className="flex items-center gap-4">
              <span className="text-xl text-slate-700 dark:text-white">
                {status.label}
              </span>

              <span className={`size-5 rounded-full ${status.color}`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
