import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Products from "./pages/Pruducts";
import Header from "./components/Header";
import AddProduct from "./components/AddProduct";
import { Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <main dir="rtl" className="flex min-h-dvh">
        <Toaster position="top-center" />
        <Sidebar />

        <div className="w-full flex-1 h-full mr-10">
          <Header />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/addProduct" element={<AddProduct />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
