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
import Sales from "./pages/Sales";
import Settings from "./components/Settings";
import { useTranslation } from "react-i18next";
import { SalesProvider } from "./context/SalesProvider";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isArabic = i18n.language === "ar";

    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = isArabic ? "ar" : "en";
  }, [i18n.language]);
  const location = useLocation();
  const date = new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  // Show Add Product Form
  const [showForm, setShowForm] = useState(false);
  // Show Sale Form
  const [showSaleForm, setShowSaleForm] = useState(false);
  const [productInfo, setProductInfo] = useState<Product>({
    id: uuidv4(),
    name: "",
    description: "",
    category: "/",
    buy_price: 0,
    sell_price: 0,
    quantity: 0,
    min_stock: 0,
    image: null,
    createdAt: date,
  });
  // Set Product Id
  const [id, setId] = useState<string | undefined>();

  // Show Settings Window
  const [showSettings, setShowSettings] = useState<boolean>(false);
  // Color Theme
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    // Get Saved Theme From Locale Storage
    const savedTheme = localStorage.getItem("theme");
    // If The Saved Theme in locale storage is dark or light return it
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
    return "light";
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowForm(false);
    setShowSaleForm(false);
  }, [location.pathname]);

  return (
    <ProductProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: theme === "dark" ? "#131B2E" : "#FFFFFF",
            color: theme === "dark" ? "#FFFFFF" : "#0F172A",
            border:
              theme === "dark" ? "1px solid #334155" : "1px solid #E2E8F0",
          },
        }}
      />
      <Settings
        setShowSettings={setShowSettings}
        showSettings={showSettings}
        setTheme={setTheme}
        theme={theme}
      />
      <SalesProvider>
        <main
          className="flex min-h-dvh h-full bg-[#fafafa] dark:bg-[#000f16] pb-50"
          dir="rtl"
        >
          <Sidebar />

          <div className="relative w-full flex-1 h-full ">
            <Header setShowSettings={setShowSettings} />
            <div className="relative max-w-400 mx-auto">
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <Dashboard
                      setShowForm={setShowForm}
                      setShowSaleForm={setShowSaleForm}
                      theme={theme}
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
                <Route path="/sales" element={<Sales />} />
                <Route path="*" element={<Navigate to={"/dashboard"} />} />
                {/* Default Route */}
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
      </SalesProvider>
    </ProductProvider>
  );
}

export default App;
