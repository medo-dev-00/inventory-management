// React Hooks
import { useState, useEffect } from "react";
// Toast Notification
import { Toaster } from "react-hot-toast";
// React Router
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// Get Unique Id for each Product
import { v4 as uuidv4 } from "uuid";

// Contexts And Providers
import ProductProvider from "./context/ProductsProvider";

// Types And Interfaces
import type { Product } from "./context/ProductsContext";

// Components
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Header from "./components/Header";
import AddProduct from "./components/AddProduct";
import AddSale from "./components/SellProduct";
import SalesHistory from "./pages/SalesHistory";
import Settings from "./components/Settings";

function App() {
  const location = useLocation();
  const date = new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

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
  const [showSettings, setShowSettings] = useState<boolean>(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowForm(false);
    setShowSaleForm(false);
  }, [location.pathname]);
  return (
    <ProductProvider>
      <Toaster position="top-center" />
      <Settings setShowSettings={setShowSettings} showSettings={showSettings} />
      <main dir="rtl" className="flex min-h-dvh ">
        <Sidebar />

        <div className="relative w-full flex-1 h-full">
          <Header setShowSettings={setShowSettings}/>
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
              <Route path="/history" element={<SalesHistory />} />
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
