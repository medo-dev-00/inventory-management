export default function Dashboard() {
  return (
    <section className="flex-1 pt-10 px-10 relative min-h-[90vh]">
      <h1 className="text-7xl mb-10">لوحة التحكم</h1>
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 flex justify-between items-center basis-80 rounded-sm bg-white p-8 card">
          <div>
            <h2 className="text-xl font-semibold text-gray-500">
              جميع المنتجات
            </h2>
            <h3 className="text-3xl font-bold">0</h3>
          </div>
          <div className="p-3 rounded-xl bg-[#E5EEFF] text-[#003980]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-clipboard-check-icon lucide-clipboard-check"
            >
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <path d="m9 14 2 2 4-4" />
            </svg>
          </div>
        </div>
        <div className="flex-1 flex justify-between items-center basis-80 rounded-sm bg-white p-8 card">
          <div>
            <h2 className="text-xl font-semibold text-gray-500">التصنيفات</h2>
            <h3 className="text-3xl font-bold">0</h3>
          </div>
          <div className="p-3 rounded-xl bg-[#E5EEFF] text-[#003980]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-shapes-icon lucide-shapes"
            >
              <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <circle cx="17.5" cy="17.5" r="3.5" />
            </svg>
          </div>
        </div>

        <div className="flex-1 flex justify-between items-center basis-80 rounded-sm bg-white p-8 card">
          <div>
            <h2 className="text-xl font-semibold text-gray-500">
              إجمالي المبيعات
            </h2>
            <h3 className="text-3xl font-bold">0</h3>
          </div>
          <div className="p-3 rounded-xl bg-[#E5EEFF] text-[#003980]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-wallet-minimal-icon lucide-wallet-minimal"
            >
              <path d="M17 14h.01" />
              <path d="M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14" />
            </svg>
          </div>
        </div>
        <div className="flex-1 flex justify-between items-center basis-80 rounded-sm bg-white p-8 card">
          <div>
            <h2 className="text-xl font-semibold text-gray-500">
              مبيعات اليوم
            </h2>
            <h3 className="text-3xl font-bold">0</h3>
          </div>
          <div className="p-3 rounded-xl bg-[#E5EEFF] text-[#003980]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-badge-dollar-sign-icon lucide-badge-dollar-sign"
            >
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
              <path d="M12 18V6" />
            </svg>
          </div>
        </div>
        <div className="flex-1 flex justify-between items-center basis-80 rounded-sm bg-white p-8 card">
          <div>
            <h2 className="text-xl font-semibold text-gray-500">
              المنتجات قليلة الكمية
            </h2>
            <h3 className="text-3xl font-bold">0</h3>
          </div>
          <div className="p-3 rounded-xl bg-[#ba1a1a1e] text-[#BA1A1A]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-triangle-alert-icon lucide-triangle-alert"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </div>
        </div>
        <div className="flex-1 flex justify-between items-center basis-80 rounded-sm bg-white p-8 card">
          <div>
            <h2 className="text-xl font-semibold text-gray-500">
              المنتجات غير المتوفرة
            </h2>
            <h3 className="text-3xl font-bold">0</h3>
          </div>
          <div className="p-3 rounded-xl bg-[#ba1a1a1e] text-[#BA1A1A]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-ban-icon lucide-ban"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M4.929 4.929 19.07 19.071" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 flex items-center bg-white shadow-md p-5 rounded-md border border-gray-300">
        <h3>اجراءات سريعة</h3>
        <div className="w-0.5 py-3 bg-gray-200 mx-2 rounded-2xl"></div>
        <div className="flex gap-4">
          <button className="bg-[#004532] text-white rounded-xl px-6 py-2 font-semibold flex gap-2 cursor-pointer hover:scale-102 transition-all ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-plus-icon lucide-plus"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            اضافة منتج
          </button>
          <button className="bg-[#D3E4FE] rounded-xl px-6 py-2 flex gap-2 font-semibold cursor-pointer hover:scale-102 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-scroll-text-icon lucide-scroll-text"
            >
              <path d="M15 12h-5" />
              <path d="M15 8h-5" />
              <path d="M19 17V5a2 2 0 0 0-2-2H4" />
              <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
            </svg>
            بيع جديد
          </button>
        </div>
      </div>
    </section>
  );
}
