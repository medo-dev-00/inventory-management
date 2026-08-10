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
  const { products, setProducts } = useProducts();
  const [shownProducts, setShownProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [search, setSearch] = useState<string>("");
  const storageProducts: string | null = localStorage.getItem("products");
  useEffect(() => {
    if (!storageProducts) return;

    const parsedProducts: Product[] = JSON.parse(storageProducts);

    setProducts(parsedProducts);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShownProducts(parsedProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (storageProducts)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShownProducts(JSON.parse(storageProducts));
  }, [storageProducts]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    handleFiltration();
  }, [search, categoryFilter, products]);
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

    setShownProducts(filteredProducts);
  }
  return (
    <motion.section
      className="relative px-10 pt-10 bg-white dark:bg-[#000f16]"
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
      <div className="flex gap-10 px-20 mt-4">
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

        <select
          name="filterByCategory"
          id="filter-by-category"
          className="bg-white border border-gray-200 rounded-sm max-w-60 px-2 flex-1 dark:bg-[#001E2C] dark:text-white dark:border-[#011b27]"
          value={categoryFilter}
          onChange={(e) => {
            const value = e.target.value;
            setCategoryFilter(value);
          }}
        >
          <option value="all" key={0}>
            الكل
          </option>
          {products ? (
            products.map((product: Product, index: number) => (
              <option value={product.category} key={index}>
                {product.category}
              </option>
            ))
          ) : (
            <></>
          )}
        </select>
      </div>
      <ProductsTable
        position="products"
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
