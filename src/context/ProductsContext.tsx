import { createContext } from "react";
export interface Product {
  readonly id?: string;

  name: string;

  description: string;

  category: string;

  buy_price: number;

  sell_price: number;

  quantity: number;

  min_stock: number;

  image: string | null;

  barcode?: string;

  createdAt?: string;
}

export interface ProductsContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}
export const ProductsContext = createContext<ProductsContextType | null>(null);
