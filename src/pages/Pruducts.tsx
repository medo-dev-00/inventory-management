import { useEffect, type Dispatch } from "react";
// Products Type

import { useProducts } from "../hooks/useProducts";
import ProductsTable from "../components/ProductsTable";
import type { Product } from "../context/ProductsContext";

export default function Products({
  setProductInfo,
  setShowForm,
  id,
  setId,
}: {
  setShowForm: Dispatch<React.SetStateAction<boolean>>;

  setProductInfo: Dispatch<React.SetStateAction<Product>>;
  id: string | undefined;
  setId: Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const { setProducts } = useProducts();
  useEffect(() => {
    const storageProducts: string | null = localStorage.getItem("products");
    if (storageProducts) {
      setProducts(JSON.parse(storageProducts));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative px-10 pt-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold">المنتجات</h2>
          <p className="text-xl text-[#3F4944]">
            ادارة المنتجات, المخزون, والاسعار
          </p>
        </div>
        <button
          className={`cursor-pointer hover:scale-102 bg-[#004532] text-white flex gap-2 px-5 py-2 rounded-sm items-center transition-all`}
          onClick={() => setShowForm(true)}
        >
          + اضافة المنتج
        </button>
      </div>
      <ProductsTable
        position="products"
        setShowForm={setShowForm}
        setProductInfo={setProductInfo}
        id={id}
        setId={setId}
      />
    </section>
  );
}
