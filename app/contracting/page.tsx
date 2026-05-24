import Link from "next/link";
import {
  HardHat, Hammer, Building2, ClipboardList,
  CheckCircle, ArrowLeft, Phone, ChevronLeft,
  Shield, Clock, Star, Award
} from "lucide-react";
import Image from "next/image";

const services = [
{
  title: "أنظمة الكهرباء الحديثة",
  desc: "تنفيذ وتمديد الشبكات الكهربائية للمشاريع السكنية والتجارية بأعلى معايير الأمان والجودة.",
  features: [
    "تمديدات كهربائية",
    "لوحات توزيع",
    "أنظمة إنارة",
    "صيانة كهربائية"
  ],
 image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=500&h=350&fit=crop",
},
  {
    title: "إدارة المشاريع الكبرى",
    desc: "التعاقد على تنفيذ المشاريع الإنشائية وتطوير المباني الحكومية بدقة واحترافية.",
    features: ["مباني سكنية وتجارية", "مشاريع حكومية", "إشراف هندسي", "ضبط جودة"],
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&h=350&fit=crop",
  },
 {
  title: "أنظمة الشبكات والاتصالات",
  desc: "تصميم وتنفيذ شبكات الإنترنت والاتصالات الداخلية للمؤسسات والشركات بكفاءة عالية.",
  features: [
    "شبكات داخلية",
    "تمديد كابلات",
    "أجهزة اتصال",
    "حلول تقنية حديثة"
  ],
  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=350&fit=crop",
},
  {
    title: "عقود الشركات والمؤسسات",
    desc: "عقود صيانة وإنشاء شاملة للشركات والمؤسسات الحكومية والخاصة.",
    features: ["عقود سنوية", "صيانة دورية", "دعم فني متواصل", "تقارير أداء"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&h=350&fit=crop",
  },
];

const whyUs = [
  {
    icon: Shield,
    title: "ضمان الجودة",
    desc: "نلتزم بأعلى معايير الجودة في كل مشروع من البداية حتى التسليم",
  },
  {
    icon: Clock,
    title: "الالتزام بالمواعيد",
    desc: "نسلم مشاريعنا في الوقت المحدد دون أي تأخير",
  },
  {
    icon: Star,
    title: "فريق هندسي متخصص",
    desc: "مهندسون وفنيون ذوو خبرة واسعة في مجال المقاولات",
  },
  {
    icon: Award,
    title: "مواد عالية الجودة",
    desc: "نستخدم أفضل المواد والخامات لضمان استدامة المشاريع",
  },
];

const stats = [
  { n: "+200",  l: "مشروع منجز",     icon: "🏗️" },
  { n: "+50",   l: "عميل شركات",      icon: "🤝" },
  { n: "10+",   l: "سنوات خبرة",      icon: "⭐" },
  { n: "100%",  l: "التزام بالجودة",  icon: "✅" },
];

const steps = [
  { n: "01", icon: "📋", title: "دراسة المشروع",   desc: "ندرس متطلبات مشروعك ونضع خطة تنفيذ متكاملة" },
  { n: "02", icon: "📐", title: "عرض السعر",        desc: "نقدم عرض سعر شفاف ومفصل بدون أي تكاليف خفية" },
  { n: "03", icon: "🏗️", title: "بدء التنفيذ",     desc: "نبدأ التنفيذ بفريق متخصص مع إشراف هندسي كامل" },
  { n: "04", icon: "🎯", title: "التسليم والضمان",  desc: "نسلم المشروع في الموعد مع ضمان شامل على الأعمال" },
];

export default function ContractingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>

      {/* ===== Hero ===== */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f1b3d 0%, #1e3a5f 55%, #3b6fa0 100%)" }}
      >
        {/* دوائر ضوئية */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: "#3b6fa0", transform: "translate(30%, -40%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: "#3b6fa0", transform: "translate(-30%, 40%)" }}
        />

        <div className="relative max-w-7xl mx-auto px-6">

          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-sm mb-10"
            style={{ color: "rgba(232,237,243,0.5)" }}
          >
            <Link
              href="/"
              className="hover:text-white transition-colors"
              style={{ color: "rgba(232,237,243,0.6)" }}
            >
              الرئيسية
            </Link>
            <ChevronLeft size={14} />
            <span style={{ color: "#e8edf3" }}>المقاولات العامة</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* النص */}
            <div className="space-y-8">
              <div
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 border"
                style={{
                  backgroundColor: "rgba(59,111,160,0.25)",
                  borderColor: "rgba(59,111,160,0.4)",
                }}
              >
                <HardHat size={15} style={{ color: "#e8edf3" }} />
                <span className="text-sm font-bold" style={{ color: "#e8edf3" }}>
                  المقاولات العامة
                </span>
              </div>

              <div>
                <h1
                  className="text-5xl md:text-6xl font-black leading-tight mb-4"
                  style={{ color: "#ffffff" }}
                >
                  مقاولات عامة
                  <span
                    className="block mt-1"
                    style={{ color: "rgba(232,237,243,0.8)" }}
                  >
                    بأعلى معايير الجودة
                  </span>
                </h1>
                <p
                  className="text-lg leading-relaxed max-w-lg"
                  style={{ color: "rgba(232,237,243,0.7)" }}
                >
                  تنفيذ مشاريع المقاولات العامة بأحدث الأساليب الهندسية
                  مع الالتزام بالجودة والدقة وسرعة الإنجاز لتقديم
                  مشاريع متكاملة تليق بعملائنا.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  "مشاريع سكنية وتجارية",
                  "تشطيبات متكاملة",
                  "أعمال كهرباء وبنية تحتية",
                  "إدارة مواقع ومشاريع",
                  "تنفيذ وفق المواصفات الحديثة",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle
                      size={16}
                      style={{ color: "#e8edf3", flexShrink: 0 }}
                    />
                    <span
                      className="font-medium text-sm"
                      style={{ color: "rgba(232,237,243,0.85)" }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/request-service"
                  className="group flex items-center justify-center gap-3 font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105 shadow-lg text-white"
                  style={{ backgroundColor: "#3b6fa0" }}
                >
                  <HardHat size={18} />
                  اطلب عرض سعر
                  <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                </Link>
                <a
                  href="tel:+201025686280"
                  className="flex items-center justify-center gap-3 font-bold px-8 py-4 rounded-2xl transition-all border text-base"
                  style={{
                    backgroundColor: "rgba(232,237,243,0.1)",
                    borderColor: "rgba(232,237,243,0.25)",
                    color: "#e8edf3",
                  }}
                >
                  <Phone size={18} />
                  +20 10 2568 6280
                </a>
              </div>
            </div>

            {/* الإحصائيات */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 text-center border"
                  style={{
                    backgroundColor: "rgba(232,237,243,0.07)",
                    borderColor: "rgba(232,237,243,0.12)",
                  }}
                >
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div
                    className="text-3xl font-black mb-1"
                    style={{ color: "#e8edf3" }}
                  >
                    {s.n}
                  </div>
                  <div
                    className="text-xs font-medium"
                    style={{ color: "rgba(232,237,243,0.5)" }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* موجة */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full">
            <path
              d="M0 60L1440 60L1440 30C1200 0 960 0 720 15C480 30 240 40 0 30Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      {/* ===== الخدمات ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <span
              className="inline-block font-bold text-sm px-4 py-2 rounded-full mb-4"
              style={{ backgroundColor: "#e8edf3", color: "#1e3a5f" }}
            >
              مجالات المقاولات
            </span>
            <h2
              className="text-4xl font-black mb-4"
              style={{ color: "#0f1b3d" }}
            >
              خدمات المقاولات الشاملة
            </h2>
            <p
              className="text-lg max-w-xl mx-auto"
              style={{ color: "#3b6fa0" }}
            >
              نقدم حلول مقاولات متكاملة من الدراسة حتى التسليم
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <div
                key={i}
                className="group bg-white rounded-3xl overflow-hidden border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{ borderColor: "#e8edf3" }}
              >
                {/* الصورة */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(15,27,61,0.75) 0%, transparent 60%)",
                    }}
                  />
                  <div
                    className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{ backgroundColor: "rgba(232,237,243,0.15)", color: "#e8edf3", backdropFilter: "blur(8px)" }}
                  >
                    مقاولات عامة
                  </div>
                </div>

                {/* المحتوى */}
                <div className="p-7">
                  <h3
                    className="text-xl font-black mb-2"
                    style={{ color: "#0f1b3d" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: "rgba(30,58,95,0.65)" }}
                  >
                    {s.desc}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {s.features.map((f, fi) => (
                      <li
                        key={fi}
                        className="flex items-center gap-2.5 text-sm"
                        style={{ color: "#1e3a5f" }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: "#3b6fa0" }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/request-service"
                    className="flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all"
                    style={{ color: "#3b6fa0" }}
                  >
                    اطلب عرض سعر
                    <ArrowLeft size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== لماذا نحن ===== */}
      <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* النص */}
            <div>
              <span
                className="inline-block font-bold text-sm px-4 py-2 rounded-full mb-5"
                style={{ backgroundColor: "#e8edf3", color: "#1e3a5f" }}
              >
                لماذا الهادي جروب؟
              </span>
              <h2
                className="text-4xl font-black mb-5"
                style={{ color: "#0f1b3d" }}
              >
                شريكك المثالي
                <span style={{ color: "#3b6fa0" }}> في المقاولات</span>
              </h2>
              <p
                className="text-lg leading-relaxed mb-6"
                style={{ color: "rgba(30,58,95,0.7)" }}
              >
                نجمع بين الدقة الهندسية والسرعة في التنفيذ والالتزام الأخلاقي
                بالمعايير لنمنحكم تجربة احترافية تجعل من الهادي الخيار الأول
                والأكثر موثوقية لمشروعاتكم.
              </p>

              {/* quote */}
              <div
                className="rounded-2xl p-6 mb-6 border-r-4"
                style={{
                  backgroundColor: "#e8edf3",
                  borderColor: "#3b6fa0",
                }}
              >
                <p
                  className="italic text-sm leading-relaxed"
                  style={{ color: "#1e3a5f" }}
                >
                  "لأننا لا نكتفي بإنهاء المهمة، بل نعتني بالتفاصيل
                  التي تضمن استدامتها"
                </p>
              </div>

              <Link
                href="/request-service"
                className="inline-flex items-center gap-3 font-bold px-7 py-4 rounded-2xl transition-all hover:scale-105 text-white"
                style={{ backgroundColor: "#0f1b3d" }}
              >
                <HardHat size={17} />
                ابدأ مشروعك معنا
                <ArrowLeft size={15} />
              </Link>
            </div>

            {/* المميزات */}
            <div className="grid grid-cols-2 gap-4">
              {whyUs.map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 border hover:shadow-md transition-all duration-300"
                  style={{
                    backgroundColor: "#f8fafc",
                    borderColor: "#e8edf3",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: "#e8edf3" }}
                  >
                    <Icon size={22} style={{ color: "#1e3a5f" }} />
                  </div>
                  <h3
                    className="font-black mb-2"
                    style={{ color: "#0f1b3d" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(30,58,95,0.6)" }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== كيف نعمل ===== */}
      <section className="py-20" style={{ backgroundColor: "#e8edf3" }}>
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <h2
              className="text-4xl font-black mb-4"
              style={{ color: "#0f1b3d" }}
            >
              كيف ننفذ مشروعك؟
            </h2>
            <p className="text-lg" style={{ color: "#3b6fa0" }}>
              من الدراسة حتى التسليم — خطوات واضحة وشفافة
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative bg-white rounded-3xl p-7 text-center border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ borderColor: "#e8edf3" }}
              >
                <div
                  className="absolute -top-3 right-1/2 translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black"
                  style={{ backgroundColor: "#1e3a5f" }}
                >
                  {step.n}
                </div>
                <div className="text-4xl mb-4 mt-2">{step.icon}</div>
                <h3
                  className="font-black text-lg mb-2"
                  style={{ color: "#0f1b3d" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(30,58,95,0.6)" }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div
            className="relative rounded-3xl p-10 md:p-14 text-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0f1b3d 0%, #1e3a5f 60%, #3b6fa0 100%)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: "#3b6fa0", transform: "translate(30%, -40%)" }}
            />

            <div className="relative">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 border"
                style={{
                  backgroundColor: "rgba(232,237,243,0.1)",
                  borderColor: "rgba(232,237,243,0.2)",
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: "#e8edf3" }}
                />
                <span
                  className="text-sm font-bold"
                  style={{ color: "#e8edf3" }}
                >
                  فريقنا جاهز لمشروعك
                </span>
              </div>

              <h2
                className="text-4xl font-black mb-4"
                style={{ color: "#ffffff" }}
              >
                لديك مشروع مقاولات؟
              </h2>
              <p
                className="text-lg leading-relaxed max-w-xl mx-auto mb-8"
                style={{ color: "rgba(232,237,243,0.7)" }}
              >
                تواصل معنا الآن واحصل على دراسة مجانية وعرض سعر فوري
                لمشروعك بدون أي التزامات
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/request-service"
                  className="group flex items-center justify-center gap-3 font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105 shadow-lg text-base"
                  style={{ backgroundColor: "#e8edf3", color: "#0f1b3d" }}
                >
                  <HardHat size={18} />
                  اطلب عرض سعر الآن
                  <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                </Link>
               
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}