import { useState } from "react";
import { LuReceipt } from "react-icons/lu";
import type { Sale } from "../components/SellProduct";
import { motion } from "motion/react";

export default function SalesTable() {
  const [sales] = useState<Sale[]>(() => {
    const storageSales = localStorage.getItem("sales");

    return storageSales ? JSON.parse(storageSales) : [];
  });

  return (
    <motion.section
      className="relative px-10 pt-10 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b border-b-gray-200 pb-4">
        <div>
          <h2 className="text-4xl font-bold text-[#0b1c30]">سجل المبيعات</h2>

          <p className="text-xl text-[#3F4944]">جميع عمليات البيع المسجلة</p>
        </div>

        <div className="rounded-lg bg-[#dceaff] p-3 text-[#065F46]">
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
        <div className="overflow-x-auto max-w-400 mx-auto mt-10 border border-gray-200">
          <table className="w-full text-rights min-w-200 overflow-x-auto">
            <thead>
              <tr className="bg-[#f7f9fd] text-[#3F4944]">
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
                  className="border-t border-gray-100 transition hover:bg-[#f8fbff]"
                >
                  {/* Product */}
                  <td className="px-6 py-4">
                    <span className="font-semibold text-[#0b1c30]">
                      {sale.productName}
                    </span>
                  </td>

                  {/* Quantity */}
                  <td className="px-6 py-4">
                    <span className="rounded-md bg-[#EFF4FF] px-3 py-1 font-medium text-[#164e80]">
                      {sale.quantity}
                    </span>
                  </td>

                  {/* Unit Price */}
                  <td className="px-6 py-4 font-medium">{sale.price} جنيه</td>

                  {/* Total */}
                  <td className="px-6 py-4">
                    <span className="font-bold text-[#065F46]">
                      {sale.total} جنيه
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-gray-600">
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
