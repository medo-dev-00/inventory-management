import { type ChangeEvent } from "react";

// Icons
import { MdOutlineInfo } from "react-icons/md";
import { IoPricetagOutline } from "react-icons/io5";
import { BiTask } from "react-icons/bi";
import { IoImageOutline } from "react-icons/io5";
import { TbCloudUpload } from "react-icons/tb";
import type { Product } from "../context/ProductsContext";

interface InfoType {
  productInfo: Product;
  setProductInfo: React.Dispatch<React.SetStateAction<Product>>;
}
export default function ProductForm({ productInfo, setProductInfo }: InfoType) {
  function handleChanges(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    // Set Product Information
    setProductInfo((prev: Product) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const image = reader.result as string;

      setProductInfo((prev: Product) => ({
        ...prev,
        image,
      }));
    };

    reader.readAsDataURL(file);
  };
  return (
    <form
      className="flex bg-inherit add-form pt-10 p-5 gap-8 w-full max-lg:flex-col "
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
                    onChange={(e) =>
                      setProductInfo((prev: Product) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
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
                    onChange={(e) =>
                      setProductInfo((prev: Product) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
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

          {productInfo.image ? (
            <>
              <img
                src={productInfo.image}
                className="w-full max-h-96 object-cover"
              />
              <label htmlFor="image">اختر صورة أخرى</label>
            </>
          ) : (
            <label
              htmlFor="image"
              className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-[#EFF4FF]"
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
          )}
          <input
            type="file"
            id="image"
            accept="/image"
            className="hidden"
            onChange={(e) => handleImageChange(e)}
          />
        </div>
      </div>
    </form>
  );
}
