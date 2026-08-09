import { useEffect, type Dispatch } from "react";
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
  const { setProducts } = useProducts();
  const storageProducts: string | null = localStorage.getItem("products");
  useEffect(() => {
    if (storageProducts) {
      setProducts(JSON.parse(storageProducts));
    }
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
      <div>
        <div>
          <input
            type="search"
            name="search"
            placeholder="بحث..."
            className="w-full focus:outline-none flex-1"
          />
          <FaSearch />
        </div>
        <div>
          <select name="filterByCategory" id="filter-by-category">
            {storageProducts ? (
              JSON.parse(storageProducts).map((product: Product) => (
                <option value={product.category}>{product.category}</option>
              ))
            ) : (
              <></>
            )}
          </select>
        </div>
      </div>
      <ProductsTable
        position="products"
        setShowForm={setShowForm}
        setProductInfo={setProductInfo}
        id={id}
        setId={setId}
      />
    </motion.section>
  );
}
