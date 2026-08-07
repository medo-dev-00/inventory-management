import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Products from "./pages/Pruducts";
import Header from "./components/Header";
import AddProduct from "./components/AddProduct";
import ProductProvider from "./context/ProductsProvider";
import { Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { useState } from "react";
function App() {
  const [showForm, setShowForm] = useState(false);
  return (
    <ProductProvider>
      <Toaster position="top-center" />
      <main dir="rtl" className="flex min-h-dvh">
        <Sidebar />

        <div className="w-full flex-1 h-full">
          <Header />
          <div className="relative">
            <Routes>
              <Route
                path="/dashboard"
                element={<Dashboard setShowForm={setShowForm} />}
              />
              <Route
                path="/products"
                element={<Products setShowForm={setShowForm} />}
              />
            </Routes>
            <AddProduct showForm={showForm} setShowForm={setShowForm} />
          </div>
        </div>
      </main>
    </ProductProvider>
  );
}

export default App;
