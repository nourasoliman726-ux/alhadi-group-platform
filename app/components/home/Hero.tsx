'use client';

import Link from "next/link";
import { ArrowLeft, Phone, CheckCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const slides = [
  // {
  //   image:"https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1400",
  //   alt: "فني كهرباء محترف"
  // },
  {
    image:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1400",
    alt: "مشروع تشطيبات فاخر"
  },
//   {
//     image:"https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1400"
// ,
//     alt: "أعمال تكييف وصيانة"
//   }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0f1b3d]">
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#1e3a5f_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(at_bottom_left,#3b6fa0_0%,transparent_60%)]" />

      {/* Moving Orbs */}
      <div className="absolute top-20 -right-20 w-96 h-96 bg-[#3b6fa0]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 -left-16 w-[28rem] h-[28rem] bg-[#1e3a5f]/20 rounded-full blur-3xl animate-pulse delay-700" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-[#e8edf3]/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Slider Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f1b3d]/90 via-[#0f1b3d]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1b3d]/80 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      <div className="container-custom relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Content */}
          <div className="text-white space-y-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-3xl border border-white/20">
              <Sparkles className="text-[#e8edf3]" size={18} />
              <span className="text-sm font-semibold tracking-widest">ثقة • احترافية • ضمان</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tighter">
              Al Hadi Group
              <span className="block text-[#e8edf3] text-4xl md:text-5xl lg:text-6xl mt-4 font-semibold">
                للمقاولات العامة والأعمال الكهربائية والصيانة
              </span>
            </h1>

            {/* <p className="text-xl text-[#e8edf3]/90 max-w-lg">
              حلول كهربائية وتشطيبات متكاملة بأعلى معايير الجودة والأمان.
              <span className="block mt-2 font-medium">خدمة سريعة 24/7 في الإسكندرية</span>
            </p> */}

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "فنيون معتمدون",
                "خدمة 24 ساعة",
                "أسعار شفافة",
                "ضمان على الأعمال"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/10">
                  <CheckCircle className="text-[#3b6fa0]" size={24} />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link 
                href="/request-service"
                className="bg-[#3b6fa0] hover:bg-[#2e5a8a] text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-xl"
              >
                اطلب خدمة الآن
                <ArrowLeft size={24} />
              </Link>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              {[
                { num: "500+", label: "عميل" },
                { num: "1000+", label: "مشروع" },
                { num: "4.9", label: "تقييم" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl font-bold text-[#e8edf3]">{stat.num}</div>
                  <div className="text-sm text-[#e8edf3]/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Controls */}
          <div className="relative lg:block hidden">
            <div className="absolute -bottom-6 right-0 flex gap-3 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide 
                      ? 'bg-[#e8edf3] w-8' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 100L60 85C120 70 240 40 360 35C480 30 600 55 720 60C840 65 960 50 1080 45C1200 40 1320 55 1380 65L1440 70V100H0Z" fill="#e8edf3"/>
        </svg>
      </div>
    </section>
  );
}