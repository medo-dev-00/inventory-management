import { useState } from "react";
import { LuReceipt } from "react-icons/lu";
import { type Sale } from "../context/SalesContext";
import { motion } from "motion/react";

export default function SalesTable() {
  const [sales] = useState<Sale[]>(() => {
    const storageSales = localStorage.getItem("sales");

    if (storageSales) {
      return JSON.parse(storageSales);
    }
    return [];
  });

  return (
    <motion.section
      className="relative px-10 pt-10 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b border-b-gray-200 pb-4 dark:border-b-cyan-950">
        <div>
          <h2 className="text-4xl font-bold text-[#0b1c30] dark:text-white">
            سجل المبيعات
          </h2>

          <p className="text-xl text-[#3F4944] dark:text-[#9DACC2]">
            جميع عمليات البيع المسجلة
          </p>
        </div>

        <div className="rounded-lg bg-[#dceaff] p-3 text-[#065F46] dark:bg-[#065f4699] dark:text-[#befaaf]">
          <LuReceipt size={25} />
        </div>
      </div>

      {/* Empty State */}
      {sales.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="rounded-full bg-[#EFF4FF] p-5">
            <LuReceipt size={40} className="text-[#065F46]" />
          </div>

          <h3 className="mt-5 text-xl font-bold text-gray-800">
            لا توجد عمليات بيع
          </h3>

          <p className="mt-2 text-gray-500">
            لم يتم تسجيل أي عملية بيع حتى الآن
          </p>
        </div>
      ) : (
        /* Table */
        <div className="mx-auto mt-10 max-w-400 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
          <table className="w-full min-w-200 text-right">
            <thead>
              <tr className="bg-[#f7f9fd] text-[#3F4944] dark:bg-[#111827] dark:text-gray-300">
                <th className="px-6 py-4 font-semibold">المنتج</th>

                <th className="px-6 py-4 font-semibold">الكمية</th>

                <th className="px-6 py-4 font-semibold">سعر الوحدة</th>

                <th className="px-6 py-4 font-semibold">الإجمالي</th>

                <th className="px-6 py-4 font-semibold">تاريخ البيع</th>
              </tr>
            </thead>

            <tbody>
              {sales.map((sale) => (
                <tr
                  key={sale.id}
                  className="border-t border-gray-100 transition-colors hover:bg-[#f8fbff] dark:border-gray-800 dark:hover:bg-[#172033]"
                >
                  {/* Product */}
                  <td className="px-6 py-6">
                    <span className="font-semibold text-[#0b1c30] dark:text-white">
                      {sale.productName}
                    </span>
                  </td>

                  {/* Quantity */}
                  <td className="px-6 py-6">
                    <span className="rounded-md bg-[#EFF4FF] px-3 py-1 font-medium text-[#164e80] dark:bg-[#001E2C] dark:text-blue-300">
                      {sale.quantity}
                    </span>
                  </td>

                  {/* Unit Price */}
                  <td className="px-6 py-6 font-medium text-[#0b1c30] dark:text-gray-200">
                    {sale.price} جنيه
                  </td>

                  {/* Total */}
                  <td className="px-6 py-6">
                    <span className="font-bold text-[#065F46] dark:text-[#8BD6B7]">
                      {sale.total} جنيه
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-6 text-gray-600 dark:text-gray-300">
                    {new Intl.DateTimeFormat("ar-EG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }).format(new Date(sale.createdAt))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.section>
  );
}
