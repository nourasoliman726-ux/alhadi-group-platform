import Link from "next/link";
import {
  ChevronLeft, Target, Eye, MessageSquare,
  Shield, Clock, Award, Users, TrendingUp,
  CheckCircle, Wrench, HardHat, Building2,
  Phone, ArrowLeft
} from "lucide-react";
import Image from "next/image";

const values = [
  {
    icon: Shield,
    title: "الجودة والثقة",
    desc: "نؤمن أن الجودة والثقة هما أساس نجاح أي مشروع ونلتزم بهما في كل عمل",
  },
  {
    icon: Clock,
    title: "الالتزام بالمواعيد",
    desc: "نحترم وقت عملائنا ونلتزم بالجداول الزمنية المتفق عليها دون تأخير",
  },
  {
    icon: Award,
    title: "الاحترافية",
    desc: "نقدم خدماتنا بأعلى مستويات الاحترافية والدقة في كل تفصيلة",
  },
  {
    icon: Users,
    title: "العلاقات الطويلة",
    desc: "نبني علاقات طويلة الأمد مع عملائنا قائمة على الثقة والرضا",
  },
  {
    icon: TrendingUp,
    title: "التطوير المستمر",
    desc: "نسعى دائماً لتطوير خدماتنا ومواكبة أحدث التقنيات والمعايير",
  },
  {
    icon: CheckCircle,
    title: "الشفافية",
    desc: "نتعامل بشفافية كاملة في الأسعار والعقود والتنفيذ",
  },
];

const services = [
  {
    icon: Wrench,
    title: "الصيانة الفنية والكهربائية",
    items: ["كهرباء", "كاميرات مراقبة", "اتصالات وData", "صيانة عامة"],
  },
  {
    icon: HardHat,
    title: "المقاولات العامة والتشطيبات",
    items: ["تشطيبات راقية", "مشاريع سكنية وتجارية", "إدارة مشاريع", "أعمال مدنية"],
  },
  {
    icon: Building2,
    title: "التطوير العقاري",
    items: ["تطوير وحدات وفلل", "وساطة عقارية", "إدارة أملاك", "استشارات عقارية"],
  },
];

const stats = [
  { number: "+10",   label: "سنوات خبرة",      icon: "⭐" },
  { number: "+500",  label: "عميل سعيد",       icon: "😊" },
  { number: "+1000", label: "مشروع منجز",       icon: "🏗️" },
  { number: "+50",   label: "فني محترف",        icon: "👷" },
  { number: "98%",   label: "معدل رضا العملاء", icon: "✅" },
  { number: "24/7",  label: "دعم متواصل",       icon: "⏰" },
];

const whyChooseUs = [
  "جودة تنفيذ عالية ومضمونة",
  "فريق فني وإداري محترف ومدرب",
  "الالتزام الكامل بالمواعيد المتفق عليها",
  "أسعار تنافسية وشفافة بدون مفاجآت",
  "متابعة ودعم مستمر قبل وبعد التنفيذ",
  "تنفيذ وفق أعلى معايير السلامة والجودة",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>

      {/* ===== Hero ===== */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f1b3d 0%, #1e3a5f 55%, #3b6fa0 100%)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: "#3b6fa0", transform: "translate(30%, -40%)" }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-sm mb-8"
            style={{ color: "rgba(232,237,243,0.5)" }}
          >
            <Link href="/" style={{ color: "rgba(232,237,243,0.6)" }}>
              الرئيسية
            </Link>
            <ChevronLeft size={14} />
            <span style={{ color: "#e8edf3" }}>عن الشركة</span>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <div
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 border mb-5"
              style={{
                backgroundColor: "rgba(59,111,160,0.25)",
                borderColor: "rgba(59,111,160,0.4)",
              }}
            >
              <Users size={15} style={{ color: "#e8edf3" }} />
              <span className="text-sm font-bold" style={{ color: "#e8edf3" }}>
                من نحن
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl font-black mb-6"
              style={{ color: "#ffffff" }}
            >
              الهادي جروب
            </h1>

            <p
              className="text-xl leading-relaxed mb-4"
              style={{ color: "rgba(232,237,243,0.85)" }}
            >
              في الهادي جروب، تتجاوز رؤيتنا مجرد تقديم الخدمة إلى بناء
              شراكات مستدامة قوامها التميز في التنفيذ.
            </p>

            <p
              className="text-lg leading-relaxed"
              style={{ color: "rgba(232,237,243,0.7)" }}
            >
              نجمع بين أفضل الكفاءات وأحدث التقنيات في مجالات المقاولات
              العامة والصيانة، لنضمن لعملائنا أعلى مستويات الكفاءة
              التشغيلية التي يستحقونها.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none" preserveAspectRatio="none" className="w-full">
            <path
              d="M0 50L1440 50L1440 25C1200 0 960 0 720 12C480 25 240 35 0 25Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      {/* ===== الإحصائيات ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl border hover:shadow-md transition-all"
                style={{
                  backgroundColor: "#f8fafc",
                  borderColor: "#e8edf3",
                }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div
                  className="text-3xl font-black mb-1"
                  style={{ color: "#1e3a5f" }}
                >
                  {stat.number}
                </div>
                <div
                  className="text-xs font-medium"
                  style={{ color: "rgba(30,58,95,0.6)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== عن الشركة ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* النص */}
            <div className="space-y-6">
              <span
                className="inline-block font-bold text-sm px-4 py-2 rounded-full"
                style={{ backgroundColor: "#e8edf3", color: "#1e3a5f" }}
              >
                قصتنا
              </span>

              <h2
                className="text-4xl font-black"
                style={{ color: "#0f1b3d" }}
              >
                من نحن؟
              </h2>

              <p
                className="text-lg leading-relaxed"
                style={{ color: "rgba(30,58,95,0.7)" }}
              >
                في الهادي جروب نؤمن أن الجودة والثقة هما أساس نجاح أي مشروع،
                لذلك نعمل على تقديم حلول متكاملة في مجالات الصيانة الفنية،
                المقاولات العامة، والتطوير العقاري بأعلى مستويات الاحترافية والدقة.
              </p>

              <p
                className="text-lg leading-relaxed"
                style={{ color: "rgba(30,58,95,0.7)" }}
              >
                نمتلك فريق عمل متخصص من الفنيين والمشرفين ذوي الخبرة، ونسعى
                دائمًا لتنفيذ الأعمال وفق أحدث المعايير الفنية والهندسية مع
                الالتزام الكامل بالجودة، سرعة الإنجاز والشفافية في التعامل مع العملاء.
              </p>

              <p
                className="text-lg leading-relaxed"
                style={{ color: "rgba(30,58,95,0.7)" }}
              >
                نقدم خدماتنا للأفراد والشركات والمؤسسات، ونحرص على بناء علاقات
                طويلة المدى قائمة على الثقة والالتزام بداية من دراسة المشروع
                وحتى التسليم النهائي.
              </p>
            </div>

            {/* الصورة */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden border shadow-xl" style={{ borderColor: "#e8edf3" }}>
                <div className="aspect-square">
                  <Image
                    src= "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=350&fit=crop"
                    alt="فريق الهادي جروب"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              {/* خلفية ديكورية */}
              <div
                className="absolute -z-10 -bottom-6 -left-6 w-full h-full rounded-3xl"
                style={{ backgroundColor: "#e8edf3" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== الرؤية والرسالة ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* كلمة الشركة */}
            <div
              className="rounded-3xl p-8 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0f1b3d 0%, #1e3a5f 60%, #3b6fa0 100%)",
              }}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
                style={{ backgroundColor: "#3b6fa0", transform: "translate(30%, -30%)" }}
              />
              <div className="relative">
                <MessageSquare size={36} className="text-white mb-4 opacity-80" />
                <h3 className="text-2xl font-black text-white mb-4">
                  كلمة الشركة
                </h3>
                <p
                  className="leading-relaxed italic"
                  style={{ color: "rgba(232,237,243,0.85)" }}
                >
                  "نسعى في الهادي جروب إلى أن نكون شريك نجاح حقيقي لعملائنا،
                  من خلال تقديم أعمال تعكس الاحترافية والثقة والجودة في كل تفصيلة."
                </p>
              </div>
            </div>

            {/* الرؤية */}
            <div
              className="rounded-3xl p-8 border"
              style={{
                backgroundColor: "#f8fafc",
                borderColor: "#e8edf3",
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "#e8edf3" }}
              >
                <Eye size={28} style={{ color: "#1e3a5f" }} />
              </div>
              <h3
                className="text-2xl font-black mb-4"
                style={{ color: "#0f1b3d" }}
              >
                رؤيتنا
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: "rgba(30,58,95,0.7)" }}
              >
                أن نكون من الشركات الرائدة في مجال الصيانة والمقاولات
                والتطوير العقاري من خلال تقديم خدمات احترافية وحلول مبتكرة
                تلبي احتياجات السوق.
              </p>
            </div>

            {/* الرسالة */}
            <div
              className="rounded-3xl p-8 border"
              style={{
                backgroundColor: "#f8fafc",
                borderColor: "#e8edf3",
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "#e8edf3" }}
              >
                <Target size={28} style={{ color: "#1e3a5f" }} />
              </div>
              <h3
                className="text-2xl font-black mb-4"
                style={{ color: "#0f1b3d" }}
              >
                رسالتنا
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: "rgba(30,58,95,0.7)" }}
              >
                تقديم خدمات عالية الجودة تحقق رضا العملاء، مع الالتزام
                بالمصداقية، الأمان، والتنفيذ الاحترافي في جميع المشاريع.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== قيمنا ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span
              className="inline-block font-bold text-sm px-4 py-2 rounded-full mb-4"
              style={{ backgroundColor: "#e8edf3", color: "#1e3a5f" }}
            >
              قيمنا
            </span>
            <h2
              className="text-4xl font-black mb-4"
              style={{ color: "#0f1b3d" }}
            >
              ما نؤمن به
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "rgba(30,58,95,0.7)" }}
            >
              القيم التي تحرك عملنا وتوجه قراراتنا اليومية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border hover:shadow-lg transition-all group"
                style={{ borderColor: "#e8edf3" }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: "#e8edf3" }}
                >
                  <Icon size={26} style={{ color: "#1e3a5f" }} />
                </div>
                <h3
                  className="text-xl font-black mb-3"
                  style={{ color: "#0f1b3d" }}
                >
                  {title}
                </h3>
                <p
                  className="leading-relaxed text-sm"
                  style={{ color: "rgba(30,58,95,0.65)" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== مجالات العمل ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2
              className="text-4xl font-black mb-4"
              style={{ color: "#0f1b3d" }}
            >
              مجالات عملنا
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "rgba(30,58,95,0.7)" }}
            >
              نقدم خدمات متكاملة في ثلاثة مجالات رئيسية
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map(({ icon: Icon, title, items }, i) => (
              <div
                key={i}
                className="rounded-3xl p-8 border hover:shadow-lg transition-all"
                style={{
                  backgroundColor: "#f8fafc",
                  borderColor: "#e8edf3",
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: "#1e3a5f" }}
                >
                  <Icon size={32} className="text-white" />
                </div>
                <h3
                  className="text-xl font-black mb-5"
                  style={{ color: "#0f1b3d" }}
                >
                  {title}
                </h3>
                <ul className="space-y-3">
                  {items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2.5 text-sm"
                      style={{ color: "rgba(30,58,95,0.7)" }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "#3b6fa0" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== لماذا تختارنا ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* الصورة */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden border shadow-xl" style={{ borderColor: "#e8edf3" }}>
                <div className="aspect-[4/3]">
                  <Image
                    src="/WhatsApp Image 2026-05-19 at 4.57.16 PM.jpeg"
                    alt="لماذا الهادي جروب"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* النص */}
            <div className="order-1 lg:order-2">
              <span
                className="inline-block font-bold text-sm px-4 py-2 rounded-full mb-5"
                style={{ backgroundColor: "#e8edf3", color: "#1e3a5f" }}
              >
                لماذا تختارنا؟
              </span>

              <h2
                className="text-4xl font-black mb-6"
                style={{ color: "#0f1b3d" }}
              >
                لماذا يختارنا العملاء؟
              </h2>

              <p
                className="text-lg leading-relaxed mb-8"
                style={{ color: "rgba(30,58,95,0.7)" }}
              >
                لأننا لا نكتفي بإنهاء المهمة، بل نعتني بالتفاصيل التي تضمن
                استدامتها. نحن نجمع بين الدقة الهندسية، والسرعة في التنفيذ،
                والالتزام الأخلاقي بالمعايير.
              </p>

              <div className="space-y-3">
                {whyChooseUs.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-xl border"
                    style={{
                      backgroundColor: "#f8fafc",
                      borderColor: "#e8edf3",
                    }}
                  >
                    <CheckCircle
                      size={18}
                      style={{ color: "#1e3a5f", flexShrink: 0 }}
                    />
                    <span
                      className="font-semibold text-sm"
                      style={{ color: "#0f1b3d" }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 bg-white">
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
              <div className="text-5xl mb-4">🤝</div>
              <h2 className="text-4xl font-black text-white mb-4">
                جاهز للبدء معنا؟
              </h2>
              <p
                className="text-lg leading-relaxed max-w-xl mx-auto mb-8"
                style={{ color: "rgba(232,237,243,0.7)" }}
              >
                تواصل معنا الآن وكن جزءاً من عائلة عملائنا الراضين
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/request-service"
                  className="inline-flex items-center justify-center gap-3 font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105 shadow-lg"
                  style={{ backgroundColor: "#ffffff", color: "#0f1b3d" }}
                >
                  <Wrench size={20} />
                  اطلب خدمة الآن
                  <ArrowLeft size={18} />
                </Link>
              
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}