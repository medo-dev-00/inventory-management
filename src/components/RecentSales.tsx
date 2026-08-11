import { useSales } from "../hooks/useSales";

interface Sale {
  id: string;
  productName: string;
  quantity: number;
  total: number;
  createdAt: string;
}

interface RecentSalesProps {
  sales: Sale[];
}

export default function RecentSales() {
  const { sales }: RecentSalesProps = useSales();
  const recentSales = sales.slice(sales.length - 4).reverse();
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("ar-EG", {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(dateString));
  };

  return (
    <section className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#050e1d] scrollbar-thumb-blue-950">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-7 dark:border-slate-800">
        <h2 className="text-right text-2xl font-bold text-slate-900 dark:text-white">
          آخر عمليات البيع
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {/* Empty state */}
        {sales.length === 0 ? (
          <div className="py-14 text-center text-slate-500 dark:text-slate-400">
            لا توجد عمليات بيع حتى الآن
          </div>
        ) : (
          <table className="w-full min-w-175 text-right ">
            <thead>
              <tr className="bg-slate-100 dark:bg-[#111a2d]">
                <th className="px-6 py-6 text-lg font-bold text-slate-700 dark:text-slate-300">
                  المنتج
                </th>

                <th className="px-6 py-6 text-lg font-bold text-slate-700 dark:text-slate-300">
                  الكمية
                </th>

                <th className="px-6 py-6 text-lg font-bold text-slate-700 dark:text-slate-300">
                  الإجمالي
                </th>

                <th className="px-6 py-6 text-lg font-bold text-slate-700 dark:text-slate-300">
                  التاريخ
                </th>
              </tr>
            </thead>

            <tbody>
              {recentSales.map((sale) => (
                <tr
                  key={sale.id}
                  className="border-t border-slate-200 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-[#0b1526]"
                >
                  {/* Product */}
                  <td className="px-6 py-7 font-medium text-slate-800 dark:text-slate-200">
                    {sale.productName}
                  </td>

                  {/* Quantity */}
                  <td className="px-6 py-7 text-lg font-medium text-slate-700 dark:text-slate-300">
                    {sale.quantity}
                  </td>

                  {/* Total */}
                  <td className="px-6 py-7 text-lg font-semibold text-slate-800 dark:text-slate-200">
                    {sale.total.toLocaleString("ar-EG")} ج.م
                  </td>

                  {/* Date */}
                  <td className="px-6 py-7 text-slate-600 dark:text-slate-300">
                    {formatDate(sale.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
