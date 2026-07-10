'use client';

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a1428]">
      
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a392ad40?q=80&w=2070"
          alt="خلفية"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1428]/95 via-[#0a1428]/90 to-[#0a1428]/95" />
      </div>

      <div className="container-custom relative z-10 text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Main Title with Animation */}
          <div className="space-y-6">
            <h1 
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white animate-fade-in"
            >
              Al Hadi Group
            </h1>
            
            <p 
              className="text-2xl md:text-4xl text-[#bae6fd] font-medium tracking-wide animate-fade-in-delay"
            >
              للمقاولات العامة والأعمال الكهربائية والصيانة
            </p>
          </div>

          {/* Simple Button */}
          <div className="pt-12">
            <Link 
              href="/request-service"
              className="inline-flex items-center gap-3 bg-[#3b6fa0] hover:bg-[#2563eb] text-white px-12 py-5 rounded-2xl text-xl font-semibold transition-all hover:scale-105 shadow-xl group"
            >
              اطلب خدمتك الآن
              <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={28} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom subtle wave */}
      <div className="absolute bottom-0 left-0 right-0 opacity-30">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L80 45C160 30 320 20 480 35C640 50 800 70 960 65C1120 60 1280 40 1440 45V80H0Z" fill="#e0f2fe"/>
        </svg>
      </div>
    </section>
  );
}