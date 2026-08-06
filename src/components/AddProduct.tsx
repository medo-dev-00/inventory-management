import { useState, type ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
// Icons
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineInfo } from "react-icons/md";
import { IoPricetagOutline } from "react-icons/io5";
import { BiTask } from "react-icons/bi";
import { IoImageOutline } from "react-icons/io5";
import { TbCloudUpload } from "react-icons/tb";
import { FaRegSave } from "react-icons/fa";

interface Product {
  readonly id?: string;

  name: string;

  description: string;

  category: string;

  buyPrice: number;

  sellPrice: number;

  quantity: number;

  minStock: number;

  image?: File | null;

  barcode?: string;

  createdAt?: string;
}

export default function AddProduct() {
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
  const [products, setProducts] = useState<Product[]>([]);
  function handleChanges(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    setProductInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  return (
    <section className="bg-[#dee3f12b] pt-10 px-10">
      <div className="flex gap-5">
        <button className="hover:translate-x-1 transition-all cursor-pointer">
          <FaArrowRight size={30} color="#3F4944" />
        </button>
        <div>
          <h1 className="text-4xl font-bold">إضافة منتج جديد</h1>
          <p className="text-[#3F4944] text-xl mt-4">
            أدخل تفاصيل المنتج الجديد لإضافته إلى المخزون
          </p>
        </div>
      </div>
      <form
        className="flex add-form mt-8 p-5 gap-8 max-lg:flex-col"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex-1">
          <div className="bg-white p-4 border border-gray-200 rounded-md">
            <h2 className="flex items-center font-semibold text-2xl gap-2 border-b border-b-gray-200 pb-5">
              <MdOutlineInfo /> معلومات المنتج
            </h2>
            <div>
              <div>
                <div className="mt-4">
                  <div>
                    <label htmlFor="name">اسم المنتج *</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={productInfo?.name}
                      onChange={(e) => handleChanges(e)}
                      placeholder="أدخل اسم المنتج"
                      className="placeholder:text-xl"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div>
                    <label htmlFor="description">الوصف</label>
                    <textarea
                      name="description"
                      id="description"
                      value={productInfo?.description}
                      onChange={(e) => handleChanges(e)}
                      placeholder="أدخل وصفا مفصلا للمنتج..."
                      className="placeholder:text-xl resize-none h-36 focus:outline-none border focus:border-gray-300"
                    ></textarea>
                  </div>
                </div>
                <div className="mt-4">
                  <div>
                    <select
                      name="category"
                      id="category"
                      onChange={(e) => handleChanges(e)}
                      value={productInfo?.category}
                      className="w-full focus:outline-none bg-[#f8f9ff] p-2 border-[1.5px] border-[#bec9c264] rounded-sm"
                    >
                      <option
                        value="مأكولات"
                        className="bg-[#f8f9ff] hover:bg-[#f8f9ff]"
                      >
                        مأكولات
                      </option>
                      <option
                        value="مشروبات"
                        className="bg-[#f8f9ff] hover:bg-[#f8f9ff]"
                      >
                        مأكولات
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-10">
            <div className="bg-white p-6 flex-1 basis-80">
              <h3 className="flex items-center gap-2 text-2xl font-bold">
                <IoPricetagOutline className="rotate-y-180" /> الأسعار
              </h3>
              <div className="w-full h-0.5 bg-[#f4f2f254] rounded-2xl px-4 my-4 "></div>
              <div>
                <div>
                  <label htmlFor="buyPrice" className="text-[#3F4944]">
                    سعر الشراء
                  </label>
                  <input
                    type="number"
                    name="buyPrice"
                    id="buyPrice"
                    placeholder="0.00"
                    value={productInfo?.buyPrice}
                    onChange={(e) => handleChanges(e)}
                  />
                </div>
                <div className="mt-5">
                  <label htmlFor="sellPrice">سعر البيع *</label>
                  <input
                    type="number"
                    name="sellPrice"
                    id="sellPrice"
                    placeholder="0.00"
                    value={productInfo?.sellPrice}
                    onChange={(e) => {
                      handleChanges(e);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 flex-1 basis-80">
              <h3 className="flex items-center gap-2 text-2xl font-bold">
                <BiTask /> المخزون
              </h3>
              <div className="w-full h-0.5 bg-[#f4f2f254] rounded-2xl px-4 my-4 "></div>
              <div>
                <div>
                  <label htmlFor="quantity" className="text-[#3F4944]">
                    الكمية الحالية *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    placeholder="0"
                    value={productInfo?.quantity}
                    onChange={(e) => {
                      handleChanges(e);
                    }}
                  />
                </div>
                <div className="mt-5">
                  <label htmlFor="minStock">الحد الادنى للمخزون</label>
                  <input
                    type="number"
                    name="minStock"
                    id="minStock"
                    placeholder="0"
                    value={productInfo?.minStock}
                    onChange={(e) => handleChanges(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center bg-white p-4 border border-gray-200 rounded-md">
            <h3 className="flex gap-2 items-center text-2xl font-bold">
              <IoImageOutline /> صورة المنتج
            </h3>
            <div className="w-full h-0.5 bg-[#f4f2f254] rounded-2xl px-4 my-4 "></div>
            <label
              htmlFor="image"
              className="p-6 border-2 border-dashedh border-gray-300 rounded-lg bg-[#EFF4FF]"
            >
              <div className="bg-[#065f4647] mx-auto mb-4 w-fit p-4 rounded-xl">
                <TbCloudUpload color="#004532" size={30} />
              </div>
              <h4>اسحب وأفلت الصورة هنا</h4>
              <p className="text-sm font-medium mx-auto w-fit mt-1 mb-4">
                أو انقر لاختيار ملف من جهازك
              </p>
              <p className="text-sm text-gray-500">
                GIF, JPG, PNG, حتى 5 ميجابايت
              </p>
            </label>
            <input type="file" id="image" accept="/image" className="hidden" />
          </div>
        </div>
      </form>
      <div className="w-full bg-white p-4 rounded-sm shadow-xl flex gap-2 justify-end">
        <Link
          to="/products"
          className="text-[#004532] flex gap-2 px-6 py-2 rounded-sm border cursor-pointer hover:scale-102 hover:bg-gray-100 transition-all"
        >
          الغاء
        </Link>

        <button
          onClick={() => {
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
          }}
          className={`opacity-100 cursor-pointer hover:scale-102 bg-[#004532] text-white flex gap-2 px-4 py-2 rounded-sm items-center   transition-all`}
        >
          <FaRegSave />
          حفظ المنتج
        </button>
      </div>
    </section>
  );
}
