import { NavLink } from "react-router-dom";

// Icons
import { MdOutlineDashboard } from "react-icons/md";
import { FaBars, FaHistory } from "react-icons/fa";
import { FaBoxArchive, FaX } from "react-icons/fa6";
import { useState } from "react";

export default function Sidebar() {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  return (
    <>
      <button
        className="absolute top-1 right-5 z-50 cursor-pointer transition-all rounded-full w-fit p-2 hidden max-lg:block"
        onClick={() => setShowSideBar(!showSideBar)}
      >
        {showSideBar ? <FaX size={30} /> : <FaBars size={30} />}
      </button>
      <nav
        className={`pt-16 px-4 text-xl font-semibold bg-[#EFF4FF] lg:w-screen lg:max-w-20 transition-all lg:hover:max-w-57.5 max-lg:absolute  max-lg:z-49 max-lg:h-full max-sm:w-full ${showSideBar ? "right-0" : "max-lg:-right-full"} `}
      >
        <ul className="flex flex-col items-start gap-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex p-2 rounded-2xl gap-2.5 items-center overflow-hidden text-nowrap transition-all duration-300 w-full
            ${
              isActive
                ? "bg-[#065F46] text-[#8BD6B7]"
                : "text-[#3F4944] hover:bg-[#dce9ff]"
            }`
            }
          >
            <MdOutlineDashboard size={30} className="min-w-8" />
            لوحة التحكم
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex p-3 rounded-2xl gap-2.5 items-center overflow-hidden text-nowrap transition-all duration-300 w-full
            ${
              isActive
                ? "bg-[#065F46] text-[#8BD6B7]"
                : "text-[#3F4944] hover:bg-[#dce9ff]"
            }`
            }
          >
            <FaBoxArchive size={30} className="min-w-8" />
            المنتجات
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              `flex p-3 rounded-2xl gap-2.5 items-center overflow-hidden text-nowrap transition-all duration-300 w-full
            ${
              isActive
                ? "bg-[#065F46] text-[#8BD6B7]"
                : "text-[#3F4944] hover:bg-[#dce9ff]"
            }`
            }
          >
            <FaHistory size={30} className="min-w-8" />
            السجل
          </NavLink>
        </ul>
      </nav>
    </>
  );
}
