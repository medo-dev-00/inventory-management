import { useEffect, useState, type ReactNode } from "react";
import { SalesContext, type Sale } from "./SalesContext";

export const SalesProvider = ({ children }: { children: ReactNode }) => {
  const [sales, setSales] = useState<Sale[]>([]);
  useEffect(() => {
    const storageSales: string | null = localStorage.getItem("sales");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storageSales) setSales(JSON.parse(storageSales));
  }, []);
  return (
    <SalesContext.Provider value={{ sales, setSales }}>
      {children}
    </SalesContext.Provider>
  );
};
