import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Pruducts";
import Header from "./components/Header";
import AddProduct from "./components/AddProduct";
import ProductProvider from "./context/ProductsProvider";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import type { Product } from "./context/ProductsContext";
import AddSale from "./components/SellProduct";

function App() {
  const location = useLocation();
  const date = new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  console.log(date);
  const [showForm, setShowForm] = useState(false);
  const [showSaleForm, setShowSaleForm] = useState(false);
  const [productInfo, setProductInfo] = useState<Product>({
    id: uuidv4(),
    name: "",
    description: "",
    category: "/",
    buyPrice: 0,
    sellPrice: 0,
    quantity: 0,
    minStock: 0,
    image: null,
    createdAt: date,
  });
  const [id, setId] = useState<string | undefined>();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowForm(false);
  }, [location.pathname]);
  return (
    <ProductProvider>
      <Toaster position="top-center" />
      <main dir="rtl" className="flex min-h-dvh overflow-hidden">
        <Sidebar />

        <div className="relative w-full flex-1 h-full">
          <Header />
          <div className="relative">
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    setShowForm={setShowForm}
                    id={id}
                    setId={setId}
                    setProductInfo={setProductInfo}
                    setShowSaleForm={setShowSaleForm}
                  />
                }
              />
              <Route
                path="/products"
                element={
                  <Products
                    setShowForm={setShowForm}
                    setProductInfo={setProductInfo}
                    id={id}
                    setId={setId}
                    setShowSaleForm={setShowSaleForm}
                  />
                }
              />
              {/* Default Route */}
              <Route path="*" element={<Navigate to={"/dashboard"} />} />
            </Routes>
            <AddProduct
              showForm={showForm}
              setShowForm={setShowForm}
              productInfo={productInfo}
              setProductInfo={setProductInfo}
              id={id}
              setId={setId}
              date={date}
            />
            <AddSale
              showSaleForm={showSaleForm}
              setShowSaleForm={setShowSaleForm}
            />
          </div>
        </div>
      </main>
    </ProductProvider>
  );
}

export default App;
