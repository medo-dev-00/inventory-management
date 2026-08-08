import { NavLink } from "react-router-dom";

// Icons
import { MdOutlineDashboard } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";
// import { LuShapes } from "react-icons/lu";

export default function Sidebar() {
  return (
    <nav className="pt-16 px-4 bg-[#EFF4FF]">
      <ul className="flex flex-col items-start gap-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            ` link
            transition-all duration-300
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
            ` link
            transition-all duration-300
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
      </ul>
    </nav>
  );
}
