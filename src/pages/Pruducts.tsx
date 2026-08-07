import { useEffect, type Dispatch } from "react";

import { useProducts } from "../hooks/useProducts";

export default function Products({
  setShowForm,
}: {
  setShowForm: Dispatch<React.SetStateAction<boolean>>;
}) {
  const { products, setProducts } = useProducts();
  useEffect(() => {
    const storageProducts: string | null = localStorage.getItem("products");
    if (storageProducts) {
      setProducts(JSON.parse(storageProducts));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative px-10 pt-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold">المنتجات</h2>
          <p className="text-xl text-[#3F4944]">
            ادارة المنتجات, المخزون, والاسعار
          </p>
        </div>
        <button
          className={`cursor-pointer hover:scale-102 bg-[#004532] text-white flex gap-2 px-5 py-2 rounded-sm items-center transition-all`}
          onClick={() => setShowForm(true)}
        >
          + اضافة المنتج
        </button>
      </div>
      <table className="table-auto w-full max-w-350 mx-auto mt-10">
        <thead className="p-4">
          <tr className="bg-[#EFF4FF] p-4 flex justify-between">
            <th className="basis-36">المنتج</th>
            <th className="basis-24">التصنيف</th>
            <th className="basis-24">السعر</th>
            <th className="basis-24">الكمية</th>
            <th className="basis-24">الحالة</th>
            <th className="basis-24">الاجراءات</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => {
            console.log(product);
            return (
              <tr key={index} className="p-4 flex justify-between items-center">
                <td className="flex items-center gap-2">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20"
                    />
                  ) : (
                    <></>
                  )}
                  {product.name}
                </td>
                <td className="basis-24">{product.category}</td>
                <td className="basis-24">{product.sellPrice}</td>
                <td className="basis-24">{product.quantity}</td>
                {product.quantity <= product.minStock ? (
                  <td className="text-[#FEF3C7] bg-[#f59f0b4f] px-4 py-1 rounded-2xl">
                    قليل
                  </td>
                ) : product.quantity <= 0 ? (
                  <td className="bg-[#ba1a1a55] text-[#93000A] px-4 py-1 rounded-2xl">
                    نفذ
                  </td>
                ) : (
                  <td className="text-[#004532] bg-[#01996e60] px-4 py-1 rounded-2xl">
                    متوفر
                  </td>
                )}
                <td className="flex gap-2 ">
                  <button className="px-2 py-0.5 rounded-sm bg-[#078a65] text-white font-semibold cursor-pointer hover:-translate-y-0.5 transition-all">
                    تعديل
                  </button>
                  <button className="px-2 py-0.5 rounded-sm bg-[#880b0bf4] text-white cursor-pointer hover:-translate-y-0.5 transition-all">
                    حذف
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
