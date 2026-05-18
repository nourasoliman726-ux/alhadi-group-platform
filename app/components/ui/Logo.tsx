import Link from "next/link";

export default function Logo({ variant = "default" }: { variant?: "default" | "white" }) {
  const isWhite = variant === "white";
  
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all ${
        isWhite 
          ? "bg-white text-[#0f1b3d]" 
          : "bg-gradient-to-br from-[#0f1b3d] to-[#3b6fa0] text-white"
      }`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
        >
          <path
            d="M20 8V32M12 16L20 8L28 16M12 24L20 32L28 24"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="20" r="2" fill="currentColor" />
        </svg>
      </div>
      <div className="hidden sm:block">
        <div className={`text-2xl font-bold ${
          isWhite ? "text-white" : "text-[#0f1b3d]"
        }`}>
          الهادي جروب
        </div>
        <div className={`text-xs ${
          isWhite ? "text-gray-300" : "text-gray-500"
        }`}>
       
        </div>
      </div>
    </Link>
  );
}