import { NavLink } from "react-router-dom";
// Icons
import { MdOutlineDashboard } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";
import { LuShapes } from "react-icons/lu";

export default function Sidebar() {
  return (
    <nav className="pt-8 px-4 bg-[#EFF4FF] fixed h-full z-50 w-full max-w-15 hover:max-w-xs overflow-hidden transition-all duration-100">
      <ul className="mt-10 space-y-2 min-w-sm">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `text-xl flex items-center gap-4 p-3 rounded-md transition-all w-70 ${
              isActive ? "bg-[#065F46] text-[#8BD6B7]" : "text-[#3F4944]"
            }`
          }
        >
          <MdOutlineDashboard size={25} />
          لوحة التحكم
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `text-xl flex items-center gap-4 p-3 rounded-md transition-all w-70 ${
              isActive ? "bg-[#065F46] text-[#8BD6B7]" : "text-[#3F4944]"
            }`
          }
        >
          <FaBoxArchive />
          المنتجات
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `text-xl flex items-center gap-4 p-3 rounded-md transition-all w-70 ${
              isActive ? "bg-[#065F46] text-[#8BD6B7]" : "text-[#3F4944]"
            }`
          }
        >
          <LuShapes />
          الفئات
        </NavLink>
      </ul>
    </nav>
  );
}
