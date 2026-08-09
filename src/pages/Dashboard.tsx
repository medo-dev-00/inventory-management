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
      .reduce((a, c) => a + c);

    // Get Today`s Sales
    const todaySales = sales
      .filter((sale) => {
        const saleDate = new Date(sale.createdAt);
        if (
          saleDate.getFullYear() === now.getFullYear() &&
          saleDate.getMonth() === now.getMonth() &&
          saleDate.getDay() === now.getDay()
        ) {
          return sale;
        }
      })
      .map((sale) => sale.total)
      .reduce((a, c) => a + c);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTotalMonthSales(monthSales);
    // Set Sales
    setTodaySales(todaySales);
  }, [sales]);
  // Categories Count
  const categories = [...new Set(products.map((product) => product.category))];
  // MinStock Categories Count
  const minStockProducts = products.filter((product) => {
    return product.quantity <= product.minStock;
  });
  // OutOfStock Products Count
  const outOfStockProducts = products.filter((product) => {
    return product.quantity <= 0;
  });

  return (
    <motion.section
      className="flex-1 pt-10 px-10 relative min-h-[90vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
    >
      <h1 className="text-7xl mb-10">لوحة التحكم</h1>
      <div className="flex gap-4 flex-wrap max-[920px]:ml-20">
        <div className="flex-1 flex justify-between items-center basis-80 rounded-sm bg-white p-8 card">
          <div>
            <h2 className="text-xl font-semibold text-gray-500">
              جميع المنتجات
            </h2>
            <h3 className="text-3xl font-bold">{products.length}</h3>
          </div>
          <div className="p-3 rounded-xl bg-[#E5EEFF] text-[#003980]">
            <BiTask size={30} />
          </div>
        </div>
        <div className="flex-1 flex justify-between items-center basis-80 rounded-sm bg-white p-8 card">
          <div>
            <h2 className="text-xl font-semibold text-gray-500">التصنيفات</h2>
            <h3 className="text-3xl font-bold">{categories.length}</h3>
          </div>
          <div className="p-3 rounded-xl bg-[#E5EEFF] text-[#003980]">
            <LuShapes size={30} />
          </div>
        </div>

        <div className="flex-1 flex justify-between items-center basis-80 rounded-sm bg-white p-8 card">
          <div>
            <h2 className="text-xl font-semibold text-gray-500">
              اجمالي الميعات
            </h2>
            <h3 className="text-3xl font-bold">{totalMonthSales} جنيه</h3>
            <span>هذا الشهر</span>
          </div>
          <div className="p-3 rounded-xl bg-[#E5EEFF] text-[#003980]">
            <TbWallet size={30} />
          </div>
        </div>
        <div className="flex-1 flex justify-between items-center basis-80 rounded-sm bg-white p-8 card">
          <div>
            <h2 className="text-xl font-semibold text-gray-500">
              مبيعات اليوم
            </h2>
            <h3 className="text-3xl font-bold">{todaySales} حنيه</h3>
          </div>
          <div className="p-3 rounded-xl bg-[#E5EEFF] text-[#003980]">
            <LuCircleDollarSign size={30} />
          </div>
        </div>
        <div className="flex-1 flex justify-between items-center basis-80 rounded-sm bg-white p-8 card">
          <div>
            <h2 className="text-xl font-semibold text-gray-500">
              المنتجات قليلة الكمية
            </h2>
            <h3 className="text-3xl font-bold">{minStockProducts.length}</h3>
          </div>
          <div className="p-3 rounded-xl bg-[#ba1a1a1e] text-[#BA1A1A]">
            <IoWarningOutline size={30} />
          </div>
        </div>
        <div className="flex-1 flex justify-between items-center basis-80 rounded-sm bg-white p-8 card">
          <div>
            <h2 className="text-xl font-semibold text-gray-500">
              المنتجات غير المتوفرة
            </h2>
            <h3 className="text-3xl font-bold">{outOfStockProducts.length}</h3>
          </div>
          <div className="p-3 rounded-xl bg-[#ba1a1a1e] text-[#BA1A1A]">
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
      />
      <div className="absolute bottom-10 flex items-center bg-white shadow-md p-5 rounded-md border border-gray-300 max-md:static max-md:my-5 max-md:w-fit">
        <h3>اجراءات سريعة</h3>
        <div className="w-0.5 py-3 bg-gray-200 mx-2 rounded-2xl"></div>
        <div className="flex gap-4">
          <button
            className="bg-[#004532] text-white rounded-xl px-6 py-2 font-semibold flex gap-2 items-center cursor-pointer hover:scale-102 transition-all"
            onClick={() => setShowForm(true)}
          >
            <FaPlus size={20} />
            اضافة منتج
          </button>
          <button
            className="bg-[#D3E4FE] rounded-xl px-6 py-2 flex gap-2 font-semibold items-center cursor-pointer hover:scale-102 transition-all"
            onClick={() => setShowSaleForm(true)}
          >
            <LuReceipt size={20} className="text-[#293e5d]" />
            بيع جديد
          </button>
        </div>
      </div>
    </motion.section>
  );
}
