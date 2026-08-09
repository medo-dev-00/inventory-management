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
  shownProducts: Product[];
}
export default function ProductsTable({
  setShowForm,
  position,
  setProductInfo,
  id,
  setId,
  shownProducts,
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
        <div className="overflow-x-auto">
          <table className="w-full min-w-200 max-w-500 text-right mx-auto border border-gray-200 mt-10">
            <thead>
              <tr className="bg-[#f7f9fd] text-[#3F4944]">
                <th className="px-6 py-4 font-semibold">المنتج</th>
                <th className="px-6 py-4 font-semibold">التصنيف</th>
                <th className="px-6 py-4 font-semibold">السعر</th>
                <th className="px-6 py-4 font-semibold">الكمية</th>
                <th className="px-6 py-4 font-semibold">الحالة</th>
                <th className="px-6 py-4 font-semibold">
                  {position === "products" ? "الإجراءات" : "تاريخ الإضافة"}
                </th>
              </tr>
            </thead>

            <tbody>
              {shownProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-gray-100 transition dark:text-white"
                >
                  {/* Product */}
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EFF4FF] text-gray-400">
                          <FaRegImage size={18} />
                        </div>
                      )}

                      <span className="font-semibold text-[#0b1c30]">
                        {product.name}
                      </span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 pt-8 text-gray-600 dark:text-gray-400">
                    {product.category}
                  </td>

                  {/* Price */}
                  <td className="px-6 pt-8 font-medium">
                    {product.sellPrice} جنيه
                  </td>

                  {/* Quantity */}
                  <td className="px-6 pt-8">
                    <span className="rounded-md bg-[#EFF4FF] px-3 py-1 font-medium text-[#164e80]">
                      {product.quantity}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 pt-8">
                    {Number(product.quantity) <= 0 ? (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                        نفذ
                      </span>
                    ) : Number(product.quantity) <= Number(product.minStock) ? (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                        قليل
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        متوفر
                      </span>
                    )}
                  </td>

                  {/* Actions / Date */}
                  {position === "products" ? (
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2">
                        <button
                          className="rounded-md bg-[#078a65] px-3 py-1.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#067957]"
                          onClick={() => {
                            setId(product.id);
                            handleEdit(product.id);
                          }}
                        >
                          تعديل
                        </button>

                        <button
                          className="rounded-md bg-[#880b0b] px-3 py-1.5 text-white transition-all hover:-translate-y-0.5 hover:bg-[#6f0808]"
                          onClick={() => {
                            setId(product.id);
                            setIsModalOpen(true);
                          }}
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  ) : (
                    <td className="px-6 pt-8 text-gray-600">
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
              ))}
            </tbody>
          </table>
        </div>
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
