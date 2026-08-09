import { type Dispatch } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

interface Props {
  showSettings: boolean;
  setShowSettings: Dispatch<React.SetStateAction<boolean>>;
  setTheme: Dispatch<React.SetStateAction<"dark" | "light">>;
  theme: "dark" | "light";
}

export default function Settings({
  showSettings,
  setShowSettings,
  setTheme,
  theme,
}: Props) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-all duration-300 ${
        showSettings ? "visible opacity-100" : "invisible opacity-0"
      }`}
      onClick={() => setShowSettings(false)}
    >
      <div
        className={`w-full max-w-md rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 ${
          showSettings
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">الإعدادات</h2>

            <p className="mt-1 text-sm text-gray-500">
              تخصيص تجربة استخدام النظام
            </p>
          </div>

          <button
            onClick={() => setShowSettings(false)}
            className="cursor-pointer rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
          >
            <FaX />
          </button>
        </div>

        {/* Language */}
        <div className="mt-8">
          <h3 className="font-semibold">اللغة</h3>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <button className="rounded-xl border p-4 transition hover:-translate-y-0.5">
              العربية
            </button>

            <button className="rounded-xl border p-4 transition hover:-translate-y-0.5">
              English
            </button>
          </div>
        </div>

        {/* Theme */}
        <div className="mt-8">
          <h3 className="font-semibold">المظهر</h3>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {/* Light */}
            <button
              onClick={() => setTheme("light")}
              className={`flex cursor-pointer items-center justify-center gap-4 rounded-xl border p-4 font-semibold transition hover:-translate-y-0.5 ${
                theme === "light"
                  ? "border-[#065F46] bg-[#065F46] text-white"
                  : "border-gray-200 bg-white text-gray-800"
              }`}
            >
              <FaSun
                size={25}
                className={theme === "light" ? "text-white" : "text-black"}
              />
              فاتح
            </button>

            {/* Dark */}
            <button
              onClick={() => setTheme("dark")}
              className={`flex cursor-pointer items-center justify-center gap-4 rounded-xl border p-4 font-semibold transition hover:-translate-y-0.5 ${
                theme === "dark"
                  ? "border-[#065F46] bg-[#065F46] text-white"
                  : "border-gray-200 bg-white text-gray-800"
              }`}
            >
              <FaMoon
                size={25}
                className={theme === "dark" ? "text-white" : "text-black"}
              />
              داكن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
