import { FaSearch } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";

import { FaRegBell } from "react-icons/fa";
export default function Header() {
  return (
    <header className="bg-white flex justify-between py-2 items-center px-24 shadow-xs">
      <div className="text-2xl font-bold text-[#004532]">
        نظام الادارة المتكامل
      </div>
      <div className="bg-[#EFF4FF] flex items-center p-2 pl-4 gap-2 rounded-sm overflow-hidden">
        <input
          type="search"
          name="search"
          placeholder="بحث..."
          className="w-full focus:outline-none flex-1"
        />
        <FaSearch />
      </div>
      <div>
        <div className="flex gap-4 ">
          <button>
            <FaRegBell size={28} />
          </button>
          <button>
            <MdOutlineSettings size={28} />
          </button>
        </div>
      </div>
    </header>
  );
}
