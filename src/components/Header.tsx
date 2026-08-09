import type { Dispatch } from "react";
import { MdOutlineSettings } from "react-icons/md";

export default function Header({
  setShowSettings,
}: {
  setShowSettings: Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <header className="relative bg-white flex justify-between py-2 items-center px-24 shadow-xs z-49">
      <div className="text-2xl font-bold text-[#004532]">
        نظام الادارة المتكامل
      </div>

      <div>
        <div className="flex gap-4 ">
          <button
            className="cursor-pointer hover:bg-[#005e435c] transition-all rounded-full p-1"
            onClick={() => {
              setShowSettings(true);
            }}
          >
            <MdOutlineSettings size={28} />
          </button>
        </div>
      </div>
    </header>
  );
}
