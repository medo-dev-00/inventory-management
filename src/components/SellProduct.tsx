import {
  FaShoppingCart,
  FaInfoCircle,
  FaBoxOpen,
  FaPlus,
  FaMinus,
  FaCheckCircle,
} from "react-icons/fa";
import { type Product } from "../context/ProductsContext";
import { useProducts } from "../hooks/useProducts";
import { useEffect, useState, type Dispatch } from "react";

import toast from "react-hot-toast";

interface Props {
  showSaleForm: boolean;
  setShowSaleForm: Dispatch<React.SetStateAction<boolean>>;
}
export default function AddSale({ showSaleForm, setShowSaleForm }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [saleQuantity, setSaleQuantity] = useState<number>(1);
  const { products, setProducts } = useProducts();
  function handelSale() {
    setProducts((prev) => ({ ...prev, selectedProduct }));
    toast.success("تم تسجيل عملية البيع بنجاح");
  }
  function handelCancel() {
    setShowSaleForm(false);
    setSelectedProduct(null);
  }
  useEffect(() => {
    setShowSaleForm(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
 
  return (
    <section
      className={`w-full h-full bg-[#f7f9fd] absolute left-0  ${showSaleForm ? " top-0 visible" : " top-[-200vh]  invisible"} transition-all`}
    >
      {/* Header */}
      <div className="border-b border-gray-200 bg-[#eff4ff] px-10 py-8 text-right">
        <h1 className="text-3xl font-bold text-[#0b1c30]">تسجيل عملية بيع</h1>

        <p className="mt-3 text-lg text-gray-600">
          تسجيل عملية بيع جديدة وخصمها من المخزون
        </p>
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
                    : "0 "}
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
                    if (saleQuantity > 0) {
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
            {selectedProduct?.sellPrice ? selectedProduct?.sellPrice : 0} جنيه
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
