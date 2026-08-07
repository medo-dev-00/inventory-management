import { NavLink } from "react-router-dom";
// Icons
import { MdOutlineDashboard } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";
// import { LuShapes } from "react-icons/lu";

export default function Sidebar() {
  return (
    <nav className="pt-8 px-4 bg-[#EFF4FF] h-dvh w-60 text-nowrap overflow-hidden">
      <ul className="mt-10 space-y-2 h-full ">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `text-xl flex items-center gap-5 p-3 rounded-md transition-all  ${
              isActive ? "bg-[#065F46] text-[#8BD6B7]" : "text-[#3F4944]"
            }`
          }
        >
          <MdOutlineDashboard size={30} className="min-w-8" />
          لوحة التحكم
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `text-xl flex items-center gap-4 p-3 rounded-md transition-all  ${
              isActive ? "bg-[#065F46] text-[#8BD6B7]" : "text-[#3F4944]"
            }`
          }
        >
          <FaBoxArchive size={30} className="min-w-8" />
          المنتجات
        </NavLink>
        {/* <NavLink
          to="/categories"
          className={({ isActive }) =>
            `text-xl flex items-center gap-4 p-3 rounded-md transition-all   ${
              isActive ? "bg-[#065F46] text-[#8BD6B7]" : "text-[#3F4944]"
            }`
          }
        >
          <LuShapes size={30} className="min-w-8" />
          الفئات
        </NavLink> */}
      </ul>
    </nav>
  );
}
