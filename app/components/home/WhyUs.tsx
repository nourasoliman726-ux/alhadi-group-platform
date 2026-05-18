import { Shield, Clock, Award, Headphones, ThumbsUp, Wallet } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "ضمان الجودة",
    description: "جميع خدماتنا مضمونة 100% مع ضمان شامل على الأعمال",
    stat: "100%"
  },
  {
    icon: Clock,
    title: "خدمة سريعة",
    description: "استجابة فورية لطلبك وحضور الفني في أقل وقت ممكن",
    stat: "24/7"
  },
  {
    icon: Award,
    title: "فنيون معتمدون",
    description: "فريق عمل محترف ومدرب على أعلى مستوى من الكفاءة",
    stat: "+50"
  },
  {
    icon: Headphones,
    title: "دعم مستمر",
    description: "فريق دعم متاح على مدار الساعة للرد على استفساراتكم",
    stat: "دائم"
  },
  {
    icon: ThumbsUp,
    title: "رضا العملاء",
    description: "أكثر من 500 عميل راضٍ عن خدماتنا وجودة أعمالنا",
    stat: "98%"
  },
  {
    icon: Wallet,
    title: "أسعار منافسة",
    description: "أفضل الأسعار في السوق مع الحفاظ على الجودة العالية",
    stat: "أفضل"
  }
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-light rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl opacity-30" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-accent-gold/10 text-accent-gold px-4 py-2 rounded-full text-sm font-semibold mb-4">
            لماذا الهادي جروب؟
          </div>
          <h2 className="section-title">
            نتميز بالاحترافية والجودة في كل تفصيلة
          </h2>
          <p className="section-subtitle mt-4">
            لأننا لا نكتفي بإنهاء المهمة، بل نعتني بالتفاصيل التي تضمن استدامتها
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-brand-main"
              >
                {/* Stat Badge */}
                <div className="absolute top-6 left-6 bg-brand-darkest text-white px-3 py-1 rounded-lg text-sm font-bold">
                  {feature.stat}
                </div>

                {/* Icon */}
                <div className="icon-box mb-6 group-hover:scale-110 group-hover:bg-brand-main transition-all duration-300">
                  <Icon className="group-hover:text-white transition-colors" size={32} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-brand-darkest mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-main/0 to-brand-main/0 group-hover:from-brand-main/5 group-hover:to-accent-gold/5 rounded-2xl transition-all duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}