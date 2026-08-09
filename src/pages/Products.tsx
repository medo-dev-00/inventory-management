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
  const storageProducts: string | null = localStorage.getItem("products");
  useEffect(() => {
    if (!storageProducts) return;

    const parsedProducts: Product[] = JSON.parse(storageProducts);

    setProducts(parsedProducts);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShownProducts(parsedProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.section
      className="relative px-10 pt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
    >
      <div className="flex justify-between items-center border-b-gray-200 border-b pb-4 max-lg:justify-start max-lg:gap-10 max-md:flex-col">
        <div>
          <h2 className="text-4xl font-bold">المنتجات</h2>
          <p className="text-xl text-[#3F4944]">
            ادارة المنتجات, المخزون, والاسعار
          </p>
        </div>
        <div className="flex gap-4">
          <button
            className={`cursor-pointer hover:scale-102 bg-[#004532] text-white flex gap-2 px-5 py-2 rounded-sm items-center transition-all`}
            onClick={() => setShowForm(true)}
          >
            + اضافة المنتج
          </button>
          <button
            className="bg-[#D3E4FE] cursor-pointer hover:scale-102 text-[#021338] flex gap-2 px-5 py-2 rounded-sm items-center transition-all"
            onClick={() => setShowSaleForm(true)}
          >
            <LuReceipt size={20} className="text-[#293e5d]" />
            بيع جديد
          </button>
        </div>
      </div>
      <div className="flex gap-10 px-20 mt-4">
        <div className="flex items-center bg-[#EFF4FF] flex-1 px-2 border border-gray-100">
          <FaSearch />
          <input
            type="search"
            name="search"
            placeholder=" بحث عن اسم المنتج "
            className="w-full focus:outline-none flex-1 bg-inherit indent-1 p-2 rounded-sm"
          />
        </div>

        <select
          name="filterByCategory"
          id="filter-by-category"
          className="bg-white border border-gray-200 rounded-sm basis-100"
          value={categoryFilter}
          onChange={(e) => {
            const value = e.target.value;
            setCategoryFilter(value);
            if (value === "all") {
              setShownProducts(products);
              return;
            }
            const filteredProducts = products.filter(
              (product) => product.category === value,
            );
            setShownProducts(filteredProducts);
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
      />
    </motion.section>
  );
}
