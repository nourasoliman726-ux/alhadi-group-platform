import Link from "next/link";
import { ArrowLeft, Phone, CheckCircle, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-brand-darkest via-brand-dark to-brand-main overflow-hidden">

      <div className="absolute top-20 right-10 w-96 h-96 bg-accent-gold/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-main/30 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Sparkles className="text-accent-gold" size={16} />
              <span className="text-sm font-semibold">الأكثر ثقة </span>
            </div>

    
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
             Al Hadi Group
          
              <span className="block text-accent-gold mt-3">    للمقاولات العامه و الاعمال الكهربائيه و الصيانه</span>
            </h1>

     
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              نوفر لك أفضل الفنيين في الكهرباء، التكييف،  والتشطيبات.
              <span className="text-accent-gold font-semibold block mt-2">خدمة سريعة على مدار الساعة</span>
            </p>

       
            <div className="grid sm:grid-cols-2 gap-3 pt-4">
              {[
                "فنيون معتمدون",
                "خدمة 24/7",
                "أسعار شفافة",
                "ضمان الجودة"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/10">
                  <CheckCircle className="text-accent-gold flex-shrink-0" size={20} />
                  <span className="text-white font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link 
                href="/request-service"
                className="bg-accent-gold hover:bg-yellow-600 text-brand-darkest px-8 py-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:scale-105"
              >
                اطلب خدمة الآن
                <ArrowLeft size={20} />
              </Link>
            
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              {[
                { number: "500+", label: "عميل" },
                { number: "1000+", label: "مشروع" },
                { number: "4.9⭐", label: "التقييم" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent-gold mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

  
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Image */}
              <div className="relative aspect-[4/5] md:aspect-[3/4]">
                <Image
                  src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=1000"
                  alt="فني صيانة محترف"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-darkest/60 via-transparent to-transparent" />
              </div>
              
              {/* Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-brand-main/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-brand-main" size={28} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-brand-darkest">98%</div>
                    <div className="text-sm text-gray-600">معدل رضا العملاء</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Background */}
            <div className="absolute -z-10 -top-6 -right-6 w-full h-full bg-accent-gold/20 rounded-3xl" />
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L60 70C120 60 240 40 360 33.3C480 26.7 600 33.3 720 40C840 46.7 960 53.3 1080 53.3C1200 53.3 1320 46.7 1380 43.3L1440 40V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}