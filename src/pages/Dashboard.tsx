import type { Dispatch } from "react";
import Cards from "../components/Cards";
import { motion } from "motion/react";
import CategoryChart from "../components/charts/Donut";
// Icons
import { FaPlus } from "react-icons/fa6";
import { LuReceipt } from "react-icons/lu";
import Steps from "../components/charts/SalesChart";
import BestSellingProducts from "../components/charts/TopSalesChart";
import StockStatus from "../components/StockStatus";

interface Props {
  setShowForm: Dispatch<React.SetStateAction<boolean>>;
  setShowSaleForm: Dispatch<React.SetStateAction<boolean>>;
}
export default function Dashboard({ setShowForm, setShowSaleForm }: Props) {
  return (
    <motion.section
      className="pt-10 px-10 relative min-h-[90vh] dark:bg-[#000f16] "
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
    >
      <h1 className="text-5xl mb-10 font-semibold dark:text-white">
        لوحة التحكم
      </h1>
      <Cards />
      <section>
        <div className="flex mt-10 items-center gap-10 outline-none focus:outline-none flex-wrap">
          <Steps />
          <CategoryChart />
        </div>
        <div className="flex mt-10 items-center gap-10 outline-none focus:outline-none flex-wrap">
          <BestSellingProducts />
          <StockStatus />
        </div>
      </section>

      <div
        className="
    fixed bottom-10 my-10 right-5 flex w-fit items-center
    rounded-md border border-gray-300 bg-white p-5 shadow-md
    max-lg:static
    dark:border-[#1F2937]
    dark:bg-[#131B2E]
    dark:shadow-black/20
  "
      >
        <h3 className="text-[#0b1c30] dark:text-white">إجراءات سريعة</h3>

        <div className="mx-2 w-0.5 rounded-2xl bg-gray-200 py-3 dark:bg-gray-700"></div>

        <div className="flex gap-4">
          {/* إضافة منتج */}
          <button
            className="
        flex cursor-pointer items-center gap-2
        rounded-xl bg-[#004532] px-6 py-2
        font-semibold text-white
        transition-all hover:scale-102 hover:bg-[#065F46]

        dark:bg-[#006B50]
        dark:hover:bg-[#008060]
      "
            onClick={() => {
              setShowForm(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <FaPlus size={20} />
            إضافة منتج
          </button>

          {/* بيع جديد */}
          <button
            className="
        flex cursor-pointer items-center gap-2
        rounded-xl bg-[#D3E4FE] px-6 py-2
        font-semibold text-[#293e5d]
        transition-all hover:scale-102 hover:bg-[#C3D9FC]

        dark:bg-[#00668A]
        dark:text-white
        dark:hover:bg-[#007FA8]
      "
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setShowSaleForm(true);
            }}
          >
            <LuReceipt size={20} />
            بيع جديد
          </button>
        </div>
      </div>
    </motion.section>
  );
}
