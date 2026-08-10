import { useContext } from "react";
import { SalesContext } from "../context/SalesContext";

export function useSales() {
  const context = useContext(SalesContext);

  if (!context) {
    throw new Error("useSales must be used inside SalesContext.Provider");
  }

  return context;
}
