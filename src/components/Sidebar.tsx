import { NavLink } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FaBars, FaHistory } from "react-icons/fa";
import { FaBoxArchive, FaX } from "react-icons/fa6";
import { useState } from "react";

export default function Sidebar() {
  const [showSideBar, setShowSideBar] = useState(false);

  const closeSidebar = () => {
    setShowSideBar(false);
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `group flex h-14 w-full items-center gap-4 overflow-hidden whitespace-nowrap rounded-xl px-3 transition-all duration-300 ${
      isActive
        ? "bg-[#065F46] text-[#8BD6B7] shadow-sm"
        : "text-[#3F4944] hover:bg-[#dce9ff] dark:text-gray-300 dark:hover:bg-[#102530]"
    }`;

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setShowSideBar((prev) => !prev)}
        className="
          fixed right-5 top-5 z-60
          flex h-11 w-11
          cursor-pointer items-center justify-center
          rounded-xl
          bg-white
          text-[#065F46]
          shadow-md
          transition-all duration-200
          hover:scale-105
          dark:bg-[#102530]
          dark:text-[#8BD6B7]
        "
      >
        {showSideBar ? <FaX size={18} /> : <FaBars size={20} />}
      </button>

      {/* Overlay */}
      <div
        onClick={closeSidebar}
        className={`
          fixed inset-0 z-40
          bg-black/40
          transition-all duration-300
          ${
            showSideBar
              ? "visible opacity-100"
              : "pointer-events-none invisible opacity-0"
          }
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed right-0 top-0 z-50
          flex h-screen w-90
          flex-col
          bg-[#EFF4FF]
          p-4
          shadow-2xl
          transition-transform duration-300 ease-in-out
          dark:bg-[#000f16]

          ${showSideBar ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Logo / Header */}
        <div className="mb-8 flex h-14 items-center gap-4 rounded-xl px-3">
          <span className="text-2xl font-bold text-[#065F46] dark:text-[#8BD6B7] mr-auto font-[Gothic]">
            Inventory True
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          <NavLink to="/dashboard" onClick={closeSidebar} className={linkClass}>
            <MdOutlineDashboard size={25} className="min-w-6.25" />
            <span className="text-xl font-semibold">لوحة التحكم</span>
          </NavLink>

          <NavLink to="/products" onClick={closeSidebar} className={linkClass}>
            <FaBoxArchive size={23} className="min-w-6.25" />
            <span className="text-xl font-semibold">المنتجات</span>
          </NavLink>

          <NavLink to="/history" onClick={closeSidebar} className={linkClass}>
            <FaHistory size={23} className="min-w-6.25" />
            <span className="text-xl font-semibold">السجل</span>
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
