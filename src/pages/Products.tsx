import { useEffect, useState, type Dispatch } from "react";
// Products Type

import { useProducts } from "../hooks/useProducts";
import ProductsTable from "../components/ProductsTable";
import type { Product } from "../context/ProductsContext";

import { motion } from "motion/react";
import { LuReceipt } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
export default function Products({
  setProductInfo,
  setShowForm,
  id,
  setId,
  setShowSaleForm,
}: {
  setShowForm: Dispatch<React.SetStateAction<boolean>>;
  setProductInfo: Dispatch<React.SetStateAction<Product>>;
  setShowSaleForm: Dispatch<React.SetStateAction<boolean>>;
  id: string | undefined;
  setId: Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const { products } = useProducts();
  const [shownProducts, setShownProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    handleFiltration();
  }, [search, categoryFilter, products, typeFilter]);
  function handleFiltration() {
    const filteredProducts = products.filter((product) => {
      setCategoryFilter((p) => p);
      setSearch((p) => p);
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;

      const matchesSearch =
        search.trim() === "" ||
        product.name.toLowerCase().includes(search.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    });
    switch (typeFilter) {
      case "name": {
        setShownProducts(
          filteredProducts.sort((a, b) => (b.name < a.name ? 1 : -1)),
        );
        break;
      }
      case "category": {
        setShownProducts(
          filteredProducts.sort((a, b) => (b.category < a.category ? 1 : -1)),
        );
        break;
      }
      case "quantity": {
        setShownProducts(
          filteredProducts.sort((a, b) => b.quantity - a.quantity),
        );
        break;
      }
      default: {
        setShownProducts(filteredProducts);
      }
    }
  }
  return (
    <motion.section
      className="relative px-10 pt-10 bg-inherit "
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
    >
      <div className="flex justify-between items-center border-b-gray-200 dark:border-b-cyan-950 border-b pb-4 max-lg:justify-start max-lg:gap-10 max-md:flex-col">
        <div>
          <h2 className="text-4xl font-bold text-black dark:text-white">
            المنتجات
          </h2>
          <p className="text-xl text-[#3F4944] dark:text-[#9DACC2]">
            ادارة المنتجات, المخزون, والاسعار
          </p>
        </div>
        <div className="flex gap-4">
          <button
            className={`cursor-pointer hover:scale-102 bg-[#004532] text-white flex gap-2 px-5 py-2 rounded-sm items-center transition-all dark:bg-[#012e21]`}
            onClick={() => setShowForm(true)}
          >
            + اضافة المنتج
          </button>
          <button
            className="bg-[#D3E4FE] cursor-pointer hover:scale-102 text-[#021338] flex gap-2 px-5 py-2 rounded-sm items-center transition-all dark:bg-[#365f9d] dark:text-cyan-200"
            onClick={() => setShowSaleForm(true)}
          >
            <LuReceipt
              size={20}
              className="text-[#293e5d] dark:text-cyan-200"
            />
            بيع جديد
          </button>
        </div>
      </div>
      <div className="flex gap-10 px-20 mt-4 max-lg:flex-col">
        <div className="flex flex-1 items-center bg-[#EFF4FF] px-2 border border-gray-100 dark:bg-[#001E2C] dark:text-white dark:border-[#011b27] rounded-sm">
          <FaSearch />
          <input
            type="search"
            name="search"
            placeholder=" بحث عن اسم المنتج "
            className="w-full focus:outline-none flex-1 bg-inherit indent-1 p-2"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
            }}
          />
        </div>

        <div className="flex flex-1 ">
          <div className="max-w-60 px-2 flex-1 relative  max-lg:h-12 max-lg:max-w-full">
            <label
              htmlFor="filter-by-category"
              className="absolute top-1/2 -translate-y-1/2 right-8 dark:text-gray-300"
            >
              الترتيب :
            </label>
            <select
              name="filterByCategory"
              id="filter-by-category"
              className="bg-white border border-gray-200 rounded-sm w-full h-full dark:bg-[#001E2C] dark:text-white dark:border-[#011b27] pr-17"
              value={typeFilter}
              onChange={(e) => {
                const value = e.target.value;
                setTypeFilter(value);
              }}
            >
              <option value="all" key={0}>
                ( الكل )
              </option>
              <option value="name">حسب الاسم</option>
              <option value="category">حسب التصنيف</option>
              <option value="quantity">حسب الكمية</option>
            </select>
          </div>
          <div className="max-w-60 px-2 flex-1 relative max-lg:h-12 max-lg:max-w-full">
            <label
              htmlFor="filter-by-category"
              className="absolute top-1/2 -translate-y-1/2 right-8 dark:text-gray-300"
            >
              الفئة :
            </label>
            <select
              name="filterByCategory"
              id="filter-by-category"
              className="bg-white border border-gray-200 rounded-sm w-full h-full dark:bg-[#001E2C] dark:text-white dark:border-[#011b27] pr-15 "
              value={categoryFilter}
              onChange={(e) => {
                const value = e.target.value;
                setCategoryFilter(value);
              }}
            >
              <option value="all" key={0}>
                ( الكل )
              </option>
              {products ? (
                products.map((product: Product, index: number) => (
                  <option value={product.category} key={index}>
                    ({product.category})
                  </option>
                ))
              ) : (
                <></>
              )}
            </select>
          </div>
        </div>
      </div>
      <ProductsTable
        setShowForm={setShowForm}
        setProductInfo={setProductInfo}
        id={id}
        setId={setId}
        shownProducts={shownProducts}
        setShownProducts={setShownProducts}
      />
    </motion.section>
  );
}
