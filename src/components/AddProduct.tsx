// React
import { type Dispatch } from "react";

// Libraries
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

// Hooks
import { useProducts } from "../hooks/useProducts";

// Components
import ProductForm from "./ProductForm";

// Icons
import { FaArrowRight } from "react-icons/fa6";
import { FaRegSave } from "react-icons/fa";

// Types
import type { Product } from "../context/ProductsContext";

interface AddProductProps {
  productInfo: Product;
  setProductInfo: Dispatch<React.SetStateAction<Product>>;
  showForm: boolean;
  setShowForm: Dispatch<React.SetStateAction<boolean>>;
  id?: string | undefined;
  setId: Dispatch<React.SetStateAction<string | undefined>>;
  date: string;
}

export default function AddProduct({
  productInfo,
  setProductInfo,
  showForm,
  setShowForm,
  id,
  setId,
  date,
}: AddProductProps) {
  const { products, setProducts } = useProducts();

  const resetForm = () => {
    setProductInfo({
      id: uuidv4(),
      name: "",
      description: "",
      category: "مأكولات",
      buyPrice: 0,
      sellPrice: 0,
      quantity: 0,
      minStock: 0,
      image: null,
      createdAt: date,
    });
  };

  const handleSaveProduct = () => {
    // Validation
    if (
      productInfo.name.trim().length < 3 ||
      productInfo.sellPrice <= 0 ||
      productInfo.quantity < 0
    ) {
      toast.error("يجب إدخال البيانات المطلوبة");
      return;
    }

    let updatedProducts: Product[];

    // =========================
    // EDIT PRODUCT
    // =========================
    if (id) {
      updatedProducts = products.map((product) =>
        product.id === id
          ? {
              ...productInfo,
              id,
            }
          : product,
      );

      toast.success("تم تعديل المنتج بنجاح");
      setId(undefined);
    }

    // =========================
    // ADD PRODUCT
    // =========================
    else {
      const newProduct: Product = {
        ...productInfo,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };

      updatedProducts = [...products, newProduct];

      toast.success("تمت إضافة المنتج بنجاح");
      setId(undefined);
    }

    // Update Context
    setProducts(updatedProducts);

    // Update LocalStorage
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // Reset Form
    resetForm();

    // Close Form
    setShowForm(false);
  };

  return (
    <section
      className={`absolute top-1/2 z-50 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[#f7f9fd] px-4 py-10 transition-all duration-300 ${
        showForm ? "left-1/2 opacity-100" : "left-[200vw] opacity-0"
      }`}
    >
      {/* Header */}
      <div className="pr-8 flex max-w-7xl items-center gap-4">
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="flex cursor-pointer items-center gap-2 transition-all hover:translate-x-1"
        >
          <FaArrowRight size={30} />
        </button>

        <div>
          <h1 className="text-3xl font-bold">
            {id ? "تعديل المنتج" : "إضافة منتج جديد"}
          </h1>

          <p className="mt-2 text-gray-500">
            {id
              ? "قم بتعديل بيانات المنتج"
              : "أدخل تفاصيل المنتج الجديد لإضافته إلى المخزون"}
          </p>
        </div>
      </div>

      {/* Form */}
      <ProductForm productInfo={productInfo} setProductInfo={setProductInfo} />

      {/* Actions */}
      <div className="mx-auto mt-8 flex max-w-7xl justify-end gap-3">
        {/* Cancel */}
        <button
          type="button"
          onClick={() => {
            setId(undefined);
            setShowForm(false);
          }}
          className="flex cursor-pointer items-center gap-2 rounded-sm border border-gray-300 px-6 py-2 text-[#004532] transition-all hover:scale-[1.02] hover:bg-gray-100"
        >
          إلغاء
        </button>

        {/* Save */}
        <button
          type="button"
          onClick={handleSaveProduct}
          className="flex cursor-pointer items-center gap-2 rounded-sm bg-[#004532] px-5 py-2 text-white transition-all hover:scale-[1.02] hover:bg-[#00382a]"
        >
          <FaRegSave />

          {id ? "حفظ التعديلات" : "حفظ المنتج"}
        </button>
      </div>
    </section>
  );
}
