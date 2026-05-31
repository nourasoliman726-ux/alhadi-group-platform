import Link from "next/link";
import { Home, Search, ArrowLeft, Phone, Wrench } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-20"
      style={{ backgroundColor: "#f8fafc" }}
    >
      <div className="max-w-2xl w-full text-center">

        {/* الرقم 404 */}
        <div className="relative mb-8">
          <div
            className="text-[200px] md:text-[280px] font-black leading-none opacity-10 select-none"
            style={{ color: "#1e3a5f" }}
          >
            404
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#e8edf3" }}
            >
              <Search size={64} style={{ color: "#1e3a5f" }} className="md:w-20 md:h-20" />
            </div>
          </div>
        </div>

        {/* النص */}
        <h1
          className="text-4xl md:text-5xl font-black mb-4"
          style={{ color: "#0f1b3d" }}
        >
          عذراً، الصفحة غير موجودة!
        </h1>

        <p
          className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ color: "rgba(30,58,95,0.65)" }}
        >
          يبدو أن الصفحة التي تبحث عنها قد تم نقلها أو حذفها أو أنها
          غير موجودة من الأساس.
        </p>

        {/* الأزرار */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105 shadow-md text-white"
            style={{ backgroundColor: "#1e3a5f" }}
          >
            <Home size={20} />
            العودة للرئيسية
            <ArrowLeft size={18} />
          </Link>

          <Link
            href="/request-service"
            className="inline-flex items-center justify-center gap-3 font-bold px-8 py-4 rounded-2xl transition-all border"
            style={{
              backgroundColor: "white",
              borderColor: "#e8edf3",
              color: "#1e3a5f",
            }}
          >
            <Wrench size={20} />
            اطلب خدمة
          </Link>
        </div>

        {/* روابط سريعة */}
        <div
          className="rounded-3xl p-8 border"
          style={{
            backgroundColor: "white",
            borderColor: "#e8edf3",
          }}
        >
          <h2
            className="text-xl font-black mb-6"
            style={{ color: "#0f1b3d" }}
          >
            أو جرب هذه الصفحات
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: "/services",        label: "الصيانة الفنية",    icon: "🔧" },
              { href: "/contracting",     label: "المقاولات",          icon: "🏗️" },
              { href: "/real-estate",     label: "التطوير العقاري",   icon: "🏢" },
              { href: "/contact",         label: "تواصل معنا",         icon: "📞" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all hover:shadow-md hover:-translate-y-1"
                style={{
                  backgroundColor: "#f8fafc",
                  borderColor: "#e8edf3",
                }}
              >
                <div className="text-3xl">{link.icon}</div>
                <span
                  className="text-sm font-bold text-center"
                  style={{ color: "#1e3a5f" }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* معلومات التواصل */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+201025686280"
            className="flex items-center justify-center gap-2 text-sm font-semibold"
            style={{ color: "#3b6fa0" }}
          >
            <Phone size={16} />
            +20 10 2568 6280
          </a>
          <span className="hidden sm:block" style={{ color: "#e8edf3" }}>|</span>
          <a
            href="mailto:alhadigroup1998@gmail.com"
            className="flex items-center justify-center gap-2 text-sm font-semibold"
            style={{ color: "#3b6fa0" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            alhadigroup1998@gmail.com
          </a>
        </div>

      </div>
    </div>
  );
}