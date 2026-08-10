import { createContext, type Dispatch, type SetStateAction } from "react";

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  createdAt: string;
}

export interface ContextType {
  sales: Sale[];
  setSales: Dispatch<SetStateAction<Sale[]>>;
}

export const SalesContext = createContext<ContextType | null>(null);
