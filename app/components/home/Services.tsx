import Link from "next/link";
import { Zap, Wind, Droplet, Hammer, Building2, Briefcase, ArrowLeft } from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "صيانة كهرباء",
    description: "تركيب وصيانة جميع أعمال الكهرباء المنزلية والتجارية بأعلى معايير السلامة",
    features: ["تبديل كابلات", "لوحات كهربائية", "إنارة ذكية"],
    color: "from-yellow-400 to-orange-500",
    href: "/services"
  },
  {
    icon: Wind,
    title: "صيانة تكييف",
    description: "صيانة وتركيب وتنظيف جميع أنواع المكيفات مع ضمان شامل",
    features: ["تنظيف دوري", "إصلاح أعطال", "صيانة وقائية"],
    color: "from-blue-400 to-cyan-500",
    href: "/services"
  },
  {
    icon: Droplet,
    title: "صيانة سباكة",
    description: "كشف تسربات وإصلاح جميع أعمال السباكة بأحدث الأجهزة",
    features: ["كشف تسربات", "إصلاح أنابيب", "صيانة حمامات"],
    color: "from-cyan-400 to-blue-600",
    href: "/services"
  },
  {
    icon: Hammer,
    title: "المقاولات والتشطيبات",
    description: "تنفيذ مشاريع التشطيب والديكور بأعلى جودة وأفضل الأسعار",
    features: ["تشطيبات فاخرة", "دهانات", "أرضيات"],
    color: "from-orange-400 to-red-500",
    href: "/contracting"
  },
  {
    icon: Building2,
    title: "التطوير العقاري",
    description: "خدمات تطوير عقاري متكاملة من التصميم إلى التنفيذ",
    features: ["تطوير وحدات", "وساطة عقارية", "إدارة أملاك"],
    color: "from-purple-400 to-indigo-600",
    href: "/real-estate"
  },
  {
    icon: Briefcase,
    title: "عقود الشركات",
    description: "عقود صيانة شاملة للشركات والمؤسسات الحكومية والخاصة",
    features: ["صيانة دورية", "دعم فني", "تقارير شهرية"],
    color: "from-green-400 to-emerald-600",
    href: "/services"
  }
];

export default function Services() {
  return (
    <section className="py-24 bg-gradient-light">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-brand-main/10 text-brand-main px-4 py-2 rounded-full text-sm font-semibold mb-4">
            خدماتنا المتميزة
          </div>
          <h2 className="section-title">
            نقدم أفضل الحلول لجميع احتياجاتك
          </h2>
          <p className="section-subtitle mt-4">
            مجموعة شاملة من الخدمات الاحترافية التي تلبي جميع متطلبات الصيانة والمقاولات
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="card card-hover group"
              >
                <div className="p-8">
                  {/* Icon with Gradient */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={36} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-brand-darkest mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-brand-main rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Link */}
                  <Link 
                    href={service.href}
                    className="inline-flex items-center gap-2 text-brand-main font-semibold group-hover:gap-3 transition-all duration-300"
                  >
                    اطلب الخدمة
                    <ArrowLeft size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-main rounded-2xl transition-all duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link href="/services" className="btn-secondary">
            عرض جميع الخدمات
            <ArrowLeft size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}