import { useEffect, useState } from "react";
import { type Product, ProductsContext } from "./ProductsContext";
export default function ProductProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const storageProducts: string | null = localStorage.getItem("products");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storageProducts) setProducts(JSON.parse(storageProducts));
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
