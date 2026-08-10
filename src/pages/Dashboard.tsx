import type { Dispatch } from "react";
import { useProducts } from "../hooks/useProducts";

import ProductsTable from "../components/ProductsTable";
import { useEffect, useState } from "react";
import { type Product } from "../context/ProductsContext";
import { motion } from "motion/react";
// Icons
import { BiTask } from "react-icons/bi";
import { LuReceipt, LuShapes } from "react-icons/lu";
import { TbWallet } from "react-icons/tb";
import { LuCircleDollarSign } from "react-icons/lu";
import { IoWarningOutline } from "react-icons/io5";
import { FaBan } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import type { Sale } from "../components/SellProduct";

interface Props {
  setShowForm: Dispatch<React.SetStateAction<boolean>>;
  setProductInfo: Dispatch<React.SetStateAction<Product>>;
  id: string | undefined;
  setId: Dispatch<React.SetStateAction<string | undefined>>;
  setShowSaleForm: Dispatch<React.SetStateAction<boolean>>;
}
export default function Dashboard({
  id,
  setId,
  setProductInfo,
  setShowForm,
  setShowSaleForm,
}: Props) {
  const { products, setProducts } = useProducts();
  const [sales] = useState<Sale[]>(() => {
    const storageSales = localStorage.getItem("sales");
    if (storageSales) {
      return JSON.parse(storageSales);
    }
    return [];
  });
  const [totalMonthSales, setTotalMonthSales] = useState<number>();
  const [todaySales, setTodaySales] = useState<number>();
  useEffect(() => {
    const storageProducts: string | null = localStorage.getItem("products");
    if (storageProducts) {
      setProducts(JSON.parse(storageProducts));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const now = new Date();
    // Get Month`s Sales

    const monthSales = sales
      .filter((sale) => {
        const saleDate = new Date(sale.createdAt);
        if (
          saleDate.getFullYear() === now.getFullYear() &&
          saleDate.getMonth() === now.getMonth()
        ) {
          return sale;
        }
      })
      .map((sale) => sale.total)
      .reduce((a, c) => a + c, 0);

    // Get Today`s Sales
    const todaySales = sales
      .filter((sale) => {
        const saleDate = new Date(sale.createdAt);

        return (
          saleDate.getFullYear() === now.getFullYear() &&
          saleDate.getMonth() === now.getMonth() &&
          saleDate.getDate() === now.getDate()
        );
      })
      .map((sale) => sale.total)
      .reduce((a, c) => a + c, 0);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTotalMonthSales(monthSales);
    // Set Sales
    setTodaySales(todaySales);
  }, [sales]);
  // Categories Count
  const categories = [...new Set(products.map((product) => product.category))];
  // MinStock Categories Count
  const minStockProducts = products.filter((product) => {
    return product.quantity <= product.min_stock;
  });
  // OutOfStock Products Count
  const outOfStockProducts = products.filter((product) => {
    return product.quantity <= 0;
  });

  return (
    <motion.section
      className="pt-10 px-10 relative min-h-[90vh] dark:bg-[#000f16]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
    >
      <h1 className="text-5xl mb-10 font-semibold dark:text-white">
        لوحة التحكم
      </h1>
      <div className="flex gap-4 flex-wrap max-[920px]:ml-20 mx-20 ">
        <div className="flex-1 flex justify-between items-center basis-80 rounded-sm bg-white p-8 card dark:bg-[#131B2E] dark:text-white">
          <div>
            <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-300">
              جميع المنتجات
            </h2>
            <h3 className="text-3xl font-bold">{products.length}</h3>
          </div>
          <div className="p-3 rounded-xl bg-[#E5EEFF] text-[#003980] dark:bg-[#233143] dark:text-[#009BD1]">
            <BiTask size={30} />
          </div>
        </div>
        <div className="flex-1 flex justify-between items-center basis-80 rounded-sm bg-white p-8 card dark:bg-[#131B2E] dark:text-white">
          <div>
            <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-300">
              التصنيفات
            </h2>
            <h3 className="text-3xl font-bold">{categories.length}</h3>
          </div>
          <div className="p-3 rounded-xl bg-[#E5EEFF] text-[#003980] dark:bg-[#233143] dark:text-[#009BD1]">
            <LuShapes size={30} />
          </div>
        </div>

        <div className="flex-1 flex justify-between items-center basis-80 rounded-sm bg-white p-8 card dark:bg-[#131B2E] dark:text-white">
          <div>
            <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-300">
              اجمالي المبيعات
            </h2>
            <h3 className="text-3xl font-bold">{totalMonthSales} جنيه</h3>
            <span>هذا الشهر</span>
          </div>
          <div className="p-3 rounded-xl bg-[#E5EEFF] text-[#003980] dark:bg-[#233143] dark:text-[#009BD1]">
            <TbWallet size={30} />
          </div>
        </div>
        <div className="flex-1 flex justify-between items-center basis-80 rounded-sm bg-white p-8 card dark:bg-[#131B2E] dark:text-white">
          <div>
            <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-300">
              مبيعات اليوم
            </h2>
            <h3 className="text-3xl font-bold">{todaySales} حنيه</h3>
          </div>
          <div className="p-3 rounded-xl bg-[#E5EEFF] text-[#003980] dark:bg-[#233143] dark:text-[#009BD1]">
            <LuCircleDollarSign size={30} />
          </div>
        </div>
        <div className="flex-1 flex justify-between items-center basis-80 rounded-sm bg-white p-8 card dark:bg-[#131B2E] dark:text-white">
          <div>
            <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-300">
              المنتجات القليلة في المخزون
            </h2>
            <h3 className="text-3xl font-bold">{minStockProducts.length}</h3>
          </div>
          <div className="p-3 rounded-xl bg-[#ba1a1a1e] text-[#BA1A1A] ">
            <IoWarningOutline size={30} />
          </div>
        </div>
        <div className="flex-1 flex justify-between items-center basis-80 rounded-sm bg-white p-8 card dark:bg-[#131B2E] dark:text-white">
          <div>
            <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-300">
              المنتجات خارج المخزون
            </h2>
            <h3 className="text-3xl font-bold">{outOfStockProducts.length}</h3>
          </div>
          <div className="p-3 rounded-xl bg-[#ba1a1a1e] text-[#BA1A1A] ">
            <FaBan size={30} />
          </div>
        </div>
      </div>
      <ProductsTable
        id={id}
        position="dashboard"
        setId={setId}
        setProductInfo={setProductInfo}
        setShowForm={setShowForm}
        shownProducts={products}
        setShownProducts={setProducts}
      />
      <div
        className="
    fixed bottom-10 my-10 flex w-fit items-center
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
