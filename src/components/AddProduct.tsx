// React Hooks
import { useState, type Dispatch } from "react";
// Libraries

// Framer Motion
import { motion } from "motion/react";
// Unique ID
import { v4 as uuidv4 } from "uuid";
// Toast Notification
import toast from "react-hot-toast";
// Products Hook
import { useProducts } from "../hooks/useProducts";
// Products Type
import { type Product } from "../context/ProductsContext";
// Product Form
import ProductForm from "./ProductForm";
// Icons
import { FaArrowRight } from "react-icons/fa6";
import { FaRegSave } from "react-icons/fa";

export default function AddProduct({
  showForm,
  setShowForm,
}: {
  showForm: boolean;
  setShowForm: Dispatch<React.SetStateAction<boolean>>;
}) {
  // Product Info
  const [productInfo, setProductInfo] = useState<Product>({
    id: uuidv4(),
    name: "",
    description: "",
    category: "مأكولات",
    buyPrice: 0,
    sellPrice: 0,
    quantity: 0,
    minStock: 0,
    image: null,
  });
  // All Products
  const { products, setProducts } = useProducts();
  // Handle INput Changes

  // Read The Photo
  const addProduct = () => {
    if (
      productInfo.name.length > 2 &&
      productInfo.sellPrice > 0 &&
      productInfo.quantity > 0
    ) {
      const newProducts = [...products, productInfo];
      setProducts(newProducts);
      setProductInfo({
        id: uuidv4(),
        name: "",
        description: "",
        category: "",
        buyPrice: 0,
        sellPrice: 0,
        quantity: 0,
        minStock: 0,
        image: null,
      });
      toast.success("تمت اضافة المنتج بنجاح");
      localStorage.setItem("products", JSON.stringify(newProducts));
    } else toast.error("يجب ادخال الييانات المطلوبة");
  };
  return (
    <section
      className={`bg-[#f7f9fd] pt-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full h-full px-4  ${showForm ? "max-w-full z-50 opacity-100" : " max-w-0 -z-10 opacity-0 overflow-hidden"} transition-all`}
    >
      <div className="flex gap-5 px-4 bg-inherit">
        <button
          className="hover:translate-x-1 transition-all cursor-pointer"
          onClick={() => setShowForm(false)}
        >
          <FaArrowRight size={30} color="#3F4944" />
        </button>
        <div className="bg-inherit">
          <h1 className="text-4xl font-bold">إضافة منتج جديد</h1>
          <p className="text-[#3F4944] text-xl mt-4">
            أدخل تفاصيل المنتج الجديد لإضافته إلى المخزون
          </p>
        </div>
      </div>
      <ProductForm productInfo={productInfo} setProductInfo={setProductInfo} />
      <div className="w-full bg-white p-4 rounded-sm shadow-xl flex gap-2 justify-end">
        <button
          onClick={() => setShowForm(false)}
          className="text-[#004532] flex gap-2 px-6 py-2 rounded-sm border cursor-pointer hover:scale-102 hover:bg-gray-100 transition-all"
        >
          الغاء
        </button>

        <button
          onClick={() => {
            addProduct();
          }}
          className={`opacity-100 cursor-pointer hover:scale-102 bg-[#004532] text-white flex gap-2 px-4 py-2 rounded-sm items-center  transition-all`}
        >
          <FaRegSave />
          حفظ المنتج
        </button>
      </div>
    </section>
  );
}
