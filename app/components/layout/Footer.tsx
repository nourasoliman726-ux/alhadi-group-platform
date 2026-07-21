import Link from "next/link";
import { Phone, Mail, MapPin, Wrench } from "lucide-react";

export default function Footer() {
  const services = [
    { name: "صيانة كهرباء", href: "/services" },
    { name: "صيانة عامة", href: "/services" },
    { name: "لوحات كهربائية", href: "/services" },
    { name: "كاميرات مراقبة", href: "/services" },
    { name: "المقاولات", href: "/contracting" },
    { name: "التطوير العقاري", href: "/real-estate" },
  ];

  const quickLinks = [
    { name: "عن الشركة", href: "/about" },
    { name: "خدماتنا", href: "/services" },
    { name: "اطلب خدمة", href: "/request-service" },
    { name: "تواصل معنا", href: "/contact" },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#1e3a5f] to-[#152942] text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-[#3b6fa0] to-[#1e3a5f] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 relative overflow-hidden border-2 border-white/10">
                  {/* أيقونة المفتاح الإنجليزي */}
                  <Wrench className="text-white w-7 h-7 group-hover:rotate-12 transition-transform duration-300" strokeWidth={2.5} />
                  
                  {/* برق كهرباء صغير */}
                  <svg 
                    className="absolute top-1 right-1 w-3.5 h-3.5 text-yellow-300 animate-pulse" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M11 3L6 13h4l-1 4 5-10h-4l1-4z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">منصة الهادي جروب</h3>
                <p className="text-xs text-[#3b6fa0] font-semibold">للخدمات الفنية</p>
              </div>
            </Link>
            
            <p className="text-gray-300 leading-relaxed mb-6 text-sm">
              شركة متخصصة في خدمات الصيانة الفنية والمقاولات وتوفير الكوادر المهنية بأعلى معايير الجودة
            </p>
            
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/share/1EF4CFbTfo/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/10 hover:bg-[#3b6fa0] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="mailto:alhadigroup1998@gmail.com"
                className="w-11 h-11 bg-white/10 hover:bg-[#3b6fa0] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm"
                aria-label="البريد الإلكتروني"
              >
                <Mail size={20} />
              </a>
             
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-[#3b6fa0] rounded-full"></div>
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-[#3b6fa0] hover:translate-x-2 inline-flex items-center gap-2 transition-all duration-300 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#3b6fa0] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-[#3b6fa0] rounded-full"></div>
              خدماتنا
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link 
                    href={service.href} 
                    className="text-gray-300 hover:text-[#3b6fa0] hover:translate-x-2 inline-flex items-center gap-2 transition-all duration-300 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#3b6fa0] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-[#3b6fa0] rounded-full"></div>
              تواصل معنا
            </h4>
            <ul className="space-y-5">
              {/* <li>
                <a 
                  href="tel:+201025686280" 
                  className="flex items-start gap-3 text-gray-300 hover:text-[#3b6fa0] transition-colors group"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#3b6fa0] transition-all">
                    <Phone size={18} />
                  </div>
                  <div className="pt-2">
                    <p className="text-xs text-gray-400 mb-1">اتصل بنا</p>
                    <span dir="ltr" className="font-medium">+20 10 2568 6280</span>
                  </div>
                </a>
              </li> */}
              <li>
                <a 
                  href="mailto:alhadigroup1998@gmail.com" 
                  className="flex items-start gap-3 text-gray-300 hover:text-[#3b6fa0] transition-colors group"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#3b6fa0] transition-all">
                    <Mail size={18} />
                  </div>
                  <div className="pt-2">
                    <p className="text-xs text-gray-400 mb-1">البريد الإلكتروني</p>
                    <span className="text-sm font-medium break-all">alhadigroup1998@gmail.com</span>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-[#3b6fa0]" />
                </div>
                <div className="pt-2">
                  <p className="text-xs text-gray-400 mb-1">العنوان</p>
                  <p className="font-medium">المنيا - القاهرة، مصر</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">
            <p className="flex items-center gap-2">
              <span>© 2024</span>
              <span className="text-[#3b6fa0] font-bold">منصة الهادي جروب</span>
              <span>- جميع الحقوق محفوظة</span>
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-[#3b6fa0] transition-colors">سياسة الخصوصية</Link>
              <span className="text-gray-600">|</span>
              <Link href="/terms" className="hover:text-[#3b6fa0] transition-colors">الشروط والأحكام</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}