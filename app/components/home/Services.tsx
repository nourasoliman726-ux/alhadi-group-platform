"use client";
import Link from "next/link";
import { Zap, Camera, Hammer, Building2, Briefcase, Network, ArrowLeft } from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "صيانة كهرباء",
    description: "تركيب وصيانة جميع أعمال الكهرباء المنزلية والتجارية بأعلى معايير السلامة",
    features: ["تبديل كابلات", "لوحات كهربائية", "تمديدات كهربائية"],
    color: "from-yellow-400 to-orange-500",
    href: "/services",
  },
  {
    icon: Camera,
    title: "كاميرات مراقبة",
    description: "تركيب وصيانة أنظمة المراقبة والإنذار المتكاملة للمنازل والشركات",
    features: ["كاميرات داخلية وخارجية", "أنظمة تسجيل", "مراقبة عن بُعد"],
    color: "from-slate-500 to-slate-700",
    href: "/services",
  },
  {
    icon: Network,
    title: "اتصالات وData",
    description: "تمديد وصيانة شبكات الاتصالات والإنترنت والبنية التحتية للبيانات",
    features: ["شبكات إنترنت", "تمديد كابلات Data", "أنظمة الاتصال"],
    color: "from-blue-400 to-cyan-600",
    href: "/services",
  },
  {
    icon: Hammer,
    title: "المقاولات العامة",
    description: "تنفيذ مشاريع المقاولات العامة والتشطيبات بأعلى جودة وأفضل الأسعار",
    features: ["تشطيبات فاخرة", "مشاريع سكنية وتجارية", "إدارة مشاريع"],
    color: "from-orange-400 to-red-500",
    href: "/contracting",
  },
  {
    icon: Building2,
    title: "التطوير العقاري",
    description: "خدمات تطوير عقاري متكاملة من التصميم إلى التنفيذ والإدارة",
    features: ["تطوير وحدات وفلل", "وساطة عقارية", "إدارة أملاك"],
    color: "from-purple-400 to-indigo-600",
    href: "/real-estate",
  },
  {
    icon: Briefcase,
    title: "عقود الشركات",
    description: "عقود صيانة شاملة للشركات والمؤسسات الحكومية والخاصة",
    features: ["صيانة دورية", "دعم فني متواصل", "تقارير شهرية"],
    color: "from-green-400 to-emerald-600",
    href: "/services",
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">

        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
            style={{ backgroundColor: "rgba(59,111,160,0.1)", color: "#1e3a5f" }}
          >
            خدماتنا المتميزة
          </div>
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ color: "#0f1b3d" }}
          >
            نقدم أفضل الحلول لجميع احتياجاتك
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#3b6fa0" }}
          >
            مجموعة شاملة من الخدمات الاحترافية التي تلبي جميع متطلبات
            الصيانة والمقاولات والتطوير العقاري
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl overflow-hidden border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{ borderColor: "#e8edf3" }}
              >
                <div className="p-8">

                  {/* Icon */}
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="text-white" size={36} />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ color: "#0f1b3d" }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="mb-6 leading-relaxed text-sm"
                    style={{ color: "rgba(30,58,95,0.65)" }}
                  >
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: "rgba(30,58,95,0.7)" }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: "#3b6fa0" }}
                        />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Link */}
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all duration-300 text-sm"
                    style={{ color: "#3b6fa0" }}
                  >
                    اطلب الخدمة
                    <ArrowLeft
                      size={16}
                      className="group-hover:-translate-x-1 transition-transform"
                    />
                  </Link>
                </div>

                {/* Hover Border */}
                <div
                  className="absolute inset-0 border-2 border-transparent group-hover:rounded-2xl transition-all duration-300 pointer-events-none"
                  style={{ borderColor: "rgba(59,111,160,0)" }}
                  onMouseEnter={e =>
                    ((e.target as HTMLElement).style.borderColor = "#3b6fa0")
                  }
                  onMouseLeave={e =>
                    ((e.target as HTMLElement).style.borderColor = "rgba(59,111,160,0)")
                  }
                />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105 shadow-md text-white"
            style={{ backgroundColor: "#1e3a5f" }}
          >
            عرض جميع الخدمات
            <ArrowLeft size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}