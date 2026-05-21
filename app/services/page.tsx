import Link from "next/link";
import {
  Zap, LayoutGrid, Cable,
  Camera, FileCheck, ArrowLeft,
  Phone, CheckCircle, Clock,
  Shield, Star, Wrench, ChevronLeft
} from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "أعمال الكهرباء",
    desc: "تركيب وصيانة جميع الأعمال الكهربائية المنزلية والتجارية بأعلى معايير الأمان.",
    features: ["تركيب نقاط كهربائية", "إصلاح أعطال الكهرباء", "تمديدات كهربائية", "فحص السلامة"],
    image: "/WhatsApp Image 2026-05-19 at 4.57.16 PM.jpeg",
    tag: "الأكثر طلباً",
  },
  {
    icon: Cable,
    title: "تبديل الكابلات",
    desc: "استبدال الكابلات القديمة والتالفة بكابلات عالية الجودة لضمان سلامة التوصيلات.",
    features: ["كابلات عالية الجهد", "كابلات التوزيع", "كابلات الشبكات", "كابلات التأريض"],
    image: "/WhatsApp Image 2026-05-18 at 6.50.52 PM.jpeg",
    tag: null,
  },
  {
    icon: LayoutGrid,
    title: "لوحات الكهرباء",
    desc: "تركيب وصيانة وتطوير لوحات التوزيع الكهربائية بجميع أحجامها وأنواعها.",
    features: ["لوحات رئيسية وفرعية", "قواطع الحماية", "أجهزة القياس", "حماية من الصواعق"],
    image: "/WhatsApp Image 2026-05-18 at 6.50.28 PM.jpeg",
    tag: null,
  },
  {
    icon: FileCheck,
    title: "الصيانة العامة",
    desc: "خدمات صيانة شاملة للمنازل والمستشفيات والشركات مع ضمان الاستمرارية الكاملة.",
    features: ["صيانة دورية منتظمة", "طوارئ 24/7", "فحص شامل", "تقارير دورية"],
    image: "https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tag: "متخصص",
  },
  {
    icon: Camera,
    title: "كاميرات المراقبة",
    desc: "تصميم وتركيب أنظمة المراقبة والإنذار المتكاملة للمنازل والشركات.",
    features: ["كاميرات داخلية وخارجية", "أنظمة تسجيل", "مراقبة عن بُعد", "إنذار مبكر"],
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&h=250&fit=crop",
    tag: null,
  },
  {
    icon: FileCheck,
    title: "عقود الصيانة",
    desc: "عقود صيانة دورية شاملة للشركات والمؤسسات بأسعار تنافسية وخدمة متواصلة.",
    features: ["صيانة شهرية وسنوية", "أولوية الاستجابة", "تقارير أداء", "خصومات خاصة"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop",
    tag: "وفر أكثر",
  },
];

const whyUs = [
  {
    icon: Shield,
    title: "فنيون معتمدون",
    desc: "جميع فنيينا حاصلون على شهادات معتمدة وخبرة لا تقل عن 5 سنوات",
  },
  {
    icon: Clock,
    title: "استجابة سريعة",
    desc: "نصل إليك خلال ساعات من استلام طلبك في أي وقت من اليوم",
  },
  {
    icon: Star,
    title: "ضمان الجودة",
    desc: "نضمن جميع أعمالنا ونتحمل المسؤولية الكاملة عن جودة التنفيذ",
  },
  {
    icon: CheckCircle,
    title: "أسعار شفافة",
    desc: "لا مفاجآت في الأسعار — تعرف على التكلفة الكاملة قبل بدء العمل",
  },
];

const steps = [
  { n: "01", icon: "📋", title: "أرسل طلبك",   desc: "اختر الخدمة واملأ بيانات المشكلة بسهولة" },
  { n: "02", icon: "📞", title: "نتواصل معك",   desc: "يتصل بك فريقنا خلال 30 دقيقة لتحديد الموعد" },
  { n: "03", icon: "🔧", title: "يصل الفني",    desc: "يصل في الموعد المحدد بكل الأدوات اللازمة" },
  { n: "04", icon: "✅", title: "إتمام وضمان",  desc: "نتأكد من رضاك ونمنحك ضمان على العمل" },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>

      {/* ===== Hero ===== */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f1b3d 0%, #1e3a5f 50%, #3b6fa0 100%)" }}
      >
     
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
          <div className="flex items-center gap-2 text-sm mb-10" style={{ color: "rgba(232,237,243,0.5)" }}>
            <Link href="/" className="hover:text-white transition-colors" style={{ color: "rgba(232,237,243,0.6)" }}>
              الرئيسية
            </Link>
            <ChevronLeft size={14} />
            <span style={{ color: "#e8edf3" }}>الصيانة الفنية</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* النص */}
            <div className="space-y-8">

              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 border"
                style={{
                  backgroundColor: "rgba(59,111,160,0.25)",
                  borderColor: "rgba(59,111,160,0.4)",
                }}
              >
                <Wrench size={15} style={{ color: "#e8edf3" }} />
                <span className="text-sm font-bold" style={{ color: "#e8edf3" }}>
                  الصيانة الفنية الاحترافية
                </span>
              </div>

              <div>
                <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4" style={{ color: "#ffffff" }}>
                  خدمات صيانة
                  <span className="block" style={{ color: "#e8edf3", opacity: 0.85 }}>
                    فنية احترافية
                  </span>
                </h1>
                <p className="text-lg leading-relaxed max-w-lg" style={{ color: "rgba(232,237,243,0.75)" }}>
                  كهرباء وصيانة عامة بأيدي فنيين معتمدين. نجمع بين أفضل
                  الكفاءات وأحدث التقنيات لنضمن لعملائنا أعلى مستويات الكفاءة.
                </p>
              </div>

              {/* المميزات الرئيسية */}
              <div className="space-y-3">
                {[
                  "كهرباء",
                  "صيانة عامة",
                  "لوحات كهربائية",
                  "تمديدات كهربائية",
                  "كاميرات مراقبة",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={17} style={{ color: "#e8edf3", flexShrink: 0 }} />
                    <span className="font-semibold" style={{ color: "rgba(232,237,243,0.9)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* الأزرار */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/request-service"
                  className="group flex items-center justify-center gap-3 font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105 text-base"
                  style={{ backgroundColor: "#3b6fa0", color: "#ffffff" }}
                >
                  <Wrench size={18} />
                  اطلب خدمة الآن
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                </Link>
                {/* <a
                  href="tel:+201000000000"
                  className="flex items-center justify-center gap-3 font-bold px-8 py-4 rounded-2xl transition-all border text-base"
                  style={{
                    backgroundColor: "rgba(232,237,243,0.1)",
                    borderColor: "rgba(232,237,243,0.25)",
                    color: "#e8edf3",
                  }}
                >
                  <Phone size={18} />
                  اتصل بنا
                </a> */}
              </div>
            </div>

            {/* إحصائيات */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "+500",  l: "عميل سعيد",      icon: "😊" },
                { n: "24/7",  l: "خدمة متواصلة",   icon: "⏰" },
                { n: "+50",   l: "فني محترف",       icon: "👷" },
                { n: "98%",   l: "رضا العملاء",     icon: "⭐" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5 text-center border"
                  style={{
                    backgroundColor: "rgba(232,237,243,0.07)",
                    borderColor: "rgba(232,237,243,0.12)",
                  }}
                >
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div className="text-3xl font-black mb-1" style={{ color: "#e8edf3" }}>
                    {s.n}
                  </div>
                  <div className="text-xs font-medium" style={{ color: "rgba(232,237,243,0.5)" }}>
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
            <path d="M0 60L1440 60L1440 30C1200 0 960 0 720 15C480 30 240 40 0 30Z" fill="#f8fafc" />
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
              خدماتنا
            </span>
            <h2 className="text-4xl font-black mb-4" style={{ color: "#0f1b3d" }}>
              كل ما تحتاجه في مكان واحد
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "#3b6fa0" }}>
              نقدم مجموعة شاملة من خدمات الصيانة الفنية بأعلى مستويات الجودة
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="group bg-white rounded-3xl overflow-hidden border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
                  style={{ borderColor: "#e8edf3" }}
                >
                  {/* Tag */}
                  {s.tag && (
                    <div className="absolute top-3 right-3 z-10">
                      <span
                        className="text-white text-xs font-bold px-3 py-1 rounded-full"
                        style={{ backgroundColor: "#1e3a5f" }}
                      >
                        {s.tag}
                      </span>
                    </div>
                  )}

                  {/* الصورة */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, rgba(15,27,61,0.7) 0%, transparent 60%)",
                      }}
                    />
                    {/* أيقونة على الصورة */}
                    <div
                      className="absolute bottom-4 right-4 w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "rgba(232,237,243,0.15)", backdropFilter: "blur(8px)" }}
                    >
                      <Icon size={22} color="#e8edf3" />
                    </div>
                  </div>

                  {/* المحتوى */}
                  <div className="p-6">
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

                    {/* المميزات */}
                    <ul className="space-y-2 mb-6">
                      {s.features.map((f, fi) => (
                        <li key={fi} className="flex items-center gap-2.5 text-sm" style={{ color: "#1e3a5f" }}>
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
                      اطلب الخدمة
                      <ArrowLeft size={15} />
                    </Link>
                  </div>
                </div>
              );
            })}
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
              <h2 className="text-4xl font-black mb-5" style={{ color: "#0f1b3d" }}>
                لأننا لا نكتفي
                <span style={{ color: "#3b6fa0" }}> بإنهاء المهمة</span>
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(30,58,95,0.7)" }}>
                لأننا لا نكتفي بإنهاء المهمة، بل نعتني بالتفاصيل التي تضمن
                استدامتها. نحن نجمع بين الدقة الهندسية، والسرعة في التنفيذ،
                والالتزام الأخلاقي بالمعايير؛ لنمنحكم تجربة احترافية تجعل
                من الهادي الخيار الأول والأكثر موثوقية لمشروعاتكم.
              </p>
              <Link
                href="/request-service"
                className="inline-flex items-center gap-3 font-bold px-7 py-4 rounded-2xl transition-all hover:scale-105 text-white"
                style={{ backgroundColor: "#0f1b3d" }}
              >
                <Wrench size={17} />
                ابدأ معنا الآن
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
                  <h3 className="font-black mb-2" style={{ color: "#0f1b3d" }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(30,58,95,0.6)" }}>
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
            <h2 className="text-4xl font-black mb-4" style={{ color: "#0f1b3d" }}>
              كيف نعمل؟
            </h2>
            <p className="text-lg" style={{ color: "#3b6fa0" }}>
              أربع خطوات بسيطة للحصول على الخدمة
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative bg-white rounded-3xl p-7 text-center border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ borderColor: "#e8edf3" }}
              >
                {/* رقم الخطوة */}
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
                <p className="text-sm leading-relaxed" style={{ color: "rgba(30,58,95,0.6)" }}>
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
            style={{ background: "linear-gradient(135deg, #0f1b3d 0%, #1e3a5f 60%, #3b6fa0 100%)" }}
          >
            {/* دوائر ضوئية */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: "#3b6fa0", transform: "translate(30%, -40%)" }}
            />
            <div
              className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-15"
              style={{ backgroundColor: "#3b6fa0", transform: "translate(-30%, 40%)" }}
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
                <span className="text-sm font-bold" style={{ color: "#e8edf3" }}>
                  فريقنا جاهز الآن
                </span>
              </div>

              <h2 className="text-4xl font-black mb-4" style={{ color: "#ffffff" }}>
                تحتاج خدمة صيانة؟
              </h2>
              <p
                className="text-lg leading-relaxed max-w-xl mx-auto mb-8"
                style={{ color: "rgba(232,237,243,0.7)" }}
              >
                لا تتردد في التواصل معنا. فريقنا جاهز للمساعدة
                على مدار الساعة طوال أيام الأسبوع
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/request-service"
                  className="group flex items-center justify-center gap-3 font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105 shadow-lg text-base"
                  style={{ backgroundColor: "#e8edf3", color: "#0f1b3d" }}
                >
                  <Wrench size={18} />
                  اطلب خدمة الآن
                  <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                </Link>
                {/* <a
                  href="tel:+201000000000"
                  className="flex items-center justify-center gap-3 font-bold px-8 py-4 rounded-2xl transition-all border text-base"
                  style={{
                    backgroundColor: "rgba(232,237,243,0.1)",
                    borderColor: "rgba(232,237,243,0.3)",
                    color: "#e8edf3",
                  }}
                >
                  <Phone size={18} />
                  اتصل بنا مباشرة
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}