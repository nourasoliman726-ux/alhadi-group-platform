import Link from "next/link";

export default function Logo({ variant = "default" }: { variant?: "default" | "white" }) {
  const isWhite = variant === "white";
  
  return (
    <Link href="/" className="flex items-center gap-3 group select-none">
      {/* أيقونة اللوجو - حرف الهاء */}
      <div className={`w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-lg transition-all ${
        isWhite 
          ? "bg-white text-[#0f1b3d]" 
          : "bg-gradient-to-br from-[#0f1b3d] to-[#3b6fa0] text-white"
      }`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 md:w-9 md:h-9"
        >
          {/* رسمة احترافية لحرف الهاء العربي المتصل (هـ) */}
          <path
            d="M 28,19 C 28,14 24,11 19,11 C 13,11 10,15 10,21 C 10,26 14,29 20,29 C 27,29 31,24 31,20 M 18,21 C 18,17 21,15 24,17 C 27,19 26,24 22,24 C 19,24 18,22 18,21 Z"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* اسم الشركة */}
      <div className="hidden sm:block">
        <div className={`text-xl md:text-2xl font-black transition-colors ${
          isWhite ? "text-white" : "text-[#0f1b3d]"
        }`}>
          الهادي جروب
        </div>
      </div>
    </Link>
  );
}