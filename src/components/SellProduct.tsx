// React Hooks
import { useState, type Dispatch } from "react";
// Types
import { type Product } from "../context/ProductsContext";
// Custom Hooks
import { useProducts } from "../hooks/useProducts";
// Libraries
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

// Icons
import {
  FaShoppingCart,
  FaInfoCircle,
  FaBoxOpen,
  FaPlus,
  FaMinus,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
// Props Interface
interface Props {
  showSaleForm: boolean;
  setShowSaleForm: Dispatch<React.SetStateAction<boolean>>;
}
export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  createdAt: string;
}
export default function AddSale({ showSaleForm, setShowSaleForm }: Props) {
  // Selected Product
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // Sold Quantity
  const [saleQuantity, setSaleQuantity] = useState<number>(1);
  // Products Context
  const { products, setProducts } = useProducts();
  // Handle Sale
  function handelSale() {
    if (!selectedProduct) {
      toast.error("اختر المنتج أولًا");
      return;
    }
    if (saleQuantity <= 0) {
      toast.error("أدخل كمية صحيحة");
      return;
    }
    if (saleQuantity > selectedProduct.quantity) {
      toast.error("الكمية المطلوبة أكبر من المخزون");
      return;
    }

    // Change Product Quantity
    const updatedProducts = products.map((product) => {
      if (product.id === selectedProduct?.id) {
        product.quantity -= saleQuantity;
      }
      return product;
    });
    // Set The New Products
    setProducts(updatedProducts);
    // Then Save It Into Local Storage
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    // Show Toast
    toast.success("تم تسجيل عملية البيع بنجاح");
    // Save Sales
    const total = selectedProduct.sellPrice * saleQuantity;
    const sale: Sale = {
      id: uuidv4(),
      productId: selectedProduct.id!,
      productName: selectedProduct.name,
      quantity: saleQuantity,
      price: selectedProduct.sellPrice,
      total: total,
      createdAt: new Date().toISOString(),
    };
    const storageSales = localStorage.getItem("sales");
    if (storageSales) {
      const sales: Sale[] = JSON.parse(storageSales);
      sales.push(sale);
      localStorage.setItem("sales", JSON.stringify(sales));
    } else localStorage.setItem("sales", JSON.stringify([sale]));
    // Empty The States
    setSelectedProduct(null);
    setSaleQuantity(1);
  }

  function handelCancel() {
    setShowSaleForm(false);
    setSelectedProduct(null);
  }

  return (
    <section
      className={`w-full h-full bg-[#f7f9fd] absolute inset-0  ${showSaleForm ? "opacity-100 visible" : "opacity-0 invisible"} transition-all`}
    >
      {/* Header */}
      <div className="border-b border-gray-200 bg-[#eff4ff] px-10 py-8 text-right flex items-center gap-8">
        <button
          type="button"
          onClick={() => setShowSaleForm(false)}
          className="flex cursor-pointer items-center gap-2 transition-all hover:translate-x-1"
        >
          <FaArrowRight size={30} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-[#0b1c30]">تسجيل عملية بيع</h1>

          <p className="mt-3 text-lg text-gray-600">
            تسجيل عملية بيع جديدة وخصمها من المخزون
          </p>
        </div>
      </div>

      <div className="px-10 py-10">
        {/* Product Search */}
        <div>
          <label
            htmlFor="product"
            className="mb-2 block text-lg font-semibold text-[#26332f] text-nowrap"
          >
            اختر المنتج
          </label>

          <select
            className="w-full bg-[#eff4ff] p-2"
            value={selectedProduct?.id ?? ""}
            onChange={(e) => {
              const product = products.find(
                (product) => product.id === e.target.value,
              );

              setSelectedProduct(product ?? null);
              setSaleQuantity(1);
            }}
          >
            <option value="">اختر المنتج</option>

            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {/* Product Details + Sale Details */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Product Information */}
          <div className="rounded-lg bg-[#dfeaff] p-8">
            <div className="mb-6 flex items-center justify-end gap-3">
              <h2 className="text-2xl font-bold text-[#0b1c30]">
                معلومات المنتج
              </h2>

              <FaInfoCircle size={25} className="text-[#004532]" />
            </div>

            <div className="space-y-5 text-lg">
              <div className="flex items-center justify-between border-b border-[#cbd8ec] pb-4">
                <span className="text-gray-600">اسم المنتج:</span>

                <span className="font-bold text-[#0b1c30]">
                  {selectedProduct?.name
                    ? selectedProduct?.name
                    : "لم يتم تحديد منتج"}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#cbd8ec] pb-4">
                <span className="text-gray-600">السعر:</span>

                <span className="font-bold text-[#0b1c30]">
                  {selectedProduct?.sellPrice
                    ? selectedProduct?.sellPrice
                    : " 0 "}
                  جنيه
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">المخزون الحالي:</span>

                <span className="rounded-full bg-[#cfe0fa] px-4 py-1 font-semibold text-[#164e80]">
                  {selectedProduct?.quantity}
                  قطعة
                </span>
              </div>
            </div>
          </div>

          {/* Sale Details */}
          <div className="rounded-lg bg-[#dfeaff] p-8">
            <div className="mb-6 flex items-center justify-end gap-3">
              <h2 className="text-2xl font-bold text-[#0b1c30]">
                تفاصيل البيع
              </h2>

              <FaShoppingCart size={25} className="text-[#004532]" />
            </div>

            <div>
              <label className="mb-3 block text-lg font-semibold text-[#26332f]">
                الكمية المباعة
              </label>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-md border border-gray-300 bg-white text-xl transition hover:bg-gray-100"
                  onClick={(e) => {
                    e.preventDefault();
                    if (saleQuantity > 1) {
                      setSaleQuantity((p) => p - 1);
                    }
                  }}
                >
                  <FaMinus />
                </button>

                <input
                  type="number"
                  // max={}
                  value={saleQuantity}
                  readOnly
                  className="h-14 w-32 rounded-md border border-gray-300 bg-white text-center text-xl outline-none"
                />

                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-md border border-gray-300 bg-white text-xl transition hover:bg-gray-100"
                  onClick={() => {
                    if (saleQuantity < Number(selectedProduct?.quantity)) {
                      setSaleQuantity((p) => p + 1);
                    }
                  }}
                >
                  <FaPlus />
                </button>
              </div>

              <div className="mt-8 flex items-center justify-end gap-3 text-lg">
                <span className="text-gray-600">المتاح في المخزون:</span>

                <span className="font-bold text-[#0b1c30]">
                  {selectedProduct?.quantity} قطعة
                </span>

                <FaBoxOpen size={24} className="text-[#00624b]" />
              </div>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="mt-10 flex items-center justify-between rounded-lg border border-[#8dd5c4] bg-[#dceaff] px-8 py-8">
          <span className="text-4xl font-bold text-[#005b48]">
            {selectedProduct?.sellPrice
              ? selectedProduct?.sellPrice * saleQuantity
              : 0}
            جنيه
          </span>

          <span className="text-2xl font-semibold text-[#0b1c30]">
            إجمالي العملية
          </span>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-200" />

        {/* Buttons */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="flex items-center gap-3 rounded-md bg-[#004f3b] px-7 py-3 text-lg font-semibold text-white transition hover:bg-[#003d2e]"
            onClick={(e) => {
              e.preventDefault();
              handelSale();
            }}
          >
            <FaCheckCircle size={22} />
            تسجيل البيع
          </button>

          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white px-7 py-3 text-lg transition hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              handelCancel();
            }}
          >
            إلغاء
          </button>
        </div>
      </div>
    </section>
  );
}
