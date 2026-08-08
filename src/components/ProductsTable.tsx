// Hooks
import { useState, type Dispatch } from "react";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../context/ProductsContext";

// Libraries
import toast from "react-hot-toast";

// Icons
import { FaBoxOpen, FaPlus } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa6";

// Props Type Interface
interface Props {
  setShowForm: Dispatch<React.SetStateAction<boolean>>;
  position: "dashboard" | "products";
  setProductInfo: Dispatch<React.SetStateAction<Product>>;
  id: string | undefined;
  setId: Dispatch<React.SetStateAction<string | undefined>>;
}
export default function ProductsTable({
  setShowForm,
  position,
  setProductInfo,
  id,
  setId,
}: Props) {
  // Products Context
  const { products, setProducts } = useProducts();

  // Show And Hide Delete Product Dialog | Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Delete Product Function
  function handleDelete(id: string | undefined) {
    // Filter The PRoducts TO Return All The Products But Not Have That Id
    const updatedProducts = products.filter((product) => product.id !== id);
    // Updated Products Existed
    if (updatedProducts) {
      // Set The New Products
      setProducts(updatedProducts);
      // Then Save It To Local Storage
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      // Close The Dialog | Modal
      setIsModalOpen(false);
      // Show Tast Message
      toast.success("تم حذف المنتج بنجاح");
      // Empty The ID State
      setId(undefined);
    }
  }
  // Handle Edit Function
  function handleEdit(id: string | undefined) {
    // Return The Product That We Wan to edit
    const selectedProduct = products.find((product) => product.id === id);
    // Selected Products Existed
    if (selectedProduct) {
      // Show Edit Form
      setShowForm(true);
      // Then Fill The Form With Information
      setProductInfo(selectedProduct);
    }
  }
  return (
    <>
      {position === "products" ? (
        <Dialog
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleDelete={() => handleDelete(id)}
        />
      ) : (
        <></>
      )}
      {products.length === 0 ? (
        <div className="flex min-h-100 flex-col items-center justify-center px-6 text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#eff4ff]">
            <FaBoxOpen className="text-4xl text-[#004532]" />
          </div>

          <h3 className="text-xl font-bold text-[#0b1c30]">
            لا توجد منتجات حتى الآن
          </h3>

          <p className="mt-2 max-w-md text-sm text-gray-500">
            لم تقم بإضافة أي منتجات إلى المخزون بعد. ابدأ بإضافة أول منتج لإدارة
            مخزونك بسهولة.
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="mt-6 flex items-center gap-2 rounded-lg bg-[#004532] px-5 py-2.5 text-white transition hover:bg-[#065f46]"
          >
            <FaPlus />
            إضافة منتج
          </button>
        </div>
      ) : (
        <table className=" w-full max-w-500 mx-auto mt-10 min-w-200 overflow-auto">
          <thead className="p-4">
            <tr className="bg-[#EFF4FF] p-4 flex justify-between">
              <th className="basis-36">المنتج</th>
              <th className="basis-24">التصنيف</th>
              <th className="basis-24">السعر</th>
              <th className="basis-24">الكمية</th>
              <th className="basis-24">الحالة</th>
              <th className="basis-24">
                {position === "dashboard" ? "تاريخ الانشاء" : "الاجراءات"}
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => {
              return (
                <tr key={index} className="p-4 items-center">
                  <td className="flex items-center gap-2">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-15"
                      />
                    ) : (
                      <FaRegImage className="w-20 h-15 p-2 " />
                    )}
                    <p>
                      <span>{product.name}</span>
                      <br />
                      <span className="text-gray-500 text-sm tracking-wide">
                        {product.description}
                      </span>
                    </p>
                  </td>
                  <td className="basis-24">{product.category}</td>
                  <td className="basis-24">{product.sellPrice}</td>
                  <td className="basis-24">{product.quantity}</td>
                  {product.quantity === product.minStock ? (
                    <td className="text-[#af9908] bg-[#f59f0b75] px-4 py-1 rounded-2xl font-semibold">
                      قليل
                    </td>
                  ) : product.quantity <= 0 ? (
                    <td className="bg-[#ba1a1a55] text-[#93000A] px-4 py-1 rounded-2xl font-semibold">
                      نفذ
                    </td>
                  ) : (
                    <td className="text-[#004532] bg-[#01996e60] px-4 py-1 rounded-2xl font-semibold">
                      متوفر
                    </td>
                  )}

                  {position === "products" ? (
                    <td className="flex gap-2 ">
                      <button
                        className="px-2 py-0.5 rounded-sm bg-[#078a65] text-white font-semibold cursor-pointer hover:-translate-y-0.5 transition-all"
                        onClick={() => {
                          setId(product.id);
                          handleEdit(product.id);
                        }}
                      >
                        تعديل
                      </button>
                      <button
                        className="px-2 py-0.5 rounded-sm bg-[#880b0bf4] text-white cursor-pointer hover:-translate-y-0.5 transition-all"
                        onClick={() => {
                          setId(product.id);
                          setIsModalOpen(true);
                        }}
                      >
                        حذف
                      </button>
                    </td>
                  ) : (
                    <td>
                      {product.createdAt
                        ? new Intl.DateTimeFormat("ar-EG", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }).format(new Date(product.createdAt))
                        : "-"}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

function Dialog({
  isModalOpen,
  setIsModalOpen,
  handleDelete,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-all duration-200 ${
        isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-xl bg-white p-6 shadow-xl transition-all duration-200 ${
          isModalOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          🗑️
        </div>

        {/* Title */}
        <h2 className="mt-4 text-center text-2xl font-bold">حذف المنتج</h2>

        {/* Description */}
        <p className="mt-2 text-center text-gray-600">
          هل أنت متأكد من حذف هذا المنتج؟
          <br />
          لا يمكن التراجع عن هذا الإجراء.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-gray-100"
          >
            إلغاء
          </button>

          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
