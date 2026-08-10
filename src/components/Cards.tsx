// Custom Hooks
import { useProducts } from "../hooks/useProducts";

// Icons
import { BiTask } from "react-icons/bi";
import { LuShapes } from "react-icons/lu";
import { TbWallet } from "react-icons/tb";
import { LuCircleDollarSign } from "react-icons/lu";
import { useEffect, useState } from "react";
import { type Sale } from "../context/SalesContext";
export default function Cards() {
  const { products } = useProducts();
  const [totalMonthSales, setTotalMonthSales] = useState<number>();
  const [todaySales, setTodaySales] = useState<number>();
  const [sales] = useState<Sale[]>(() => {
    const storageSales = localStorage.getItem("sales");
    if (storageSales) {
      return JSON.parse(storageSales);
    }
    return [];
  });
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
  return (
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
    </div>
  );
}
