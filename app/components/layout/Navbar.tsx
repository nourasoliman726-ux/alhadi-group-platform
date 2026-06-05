"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, ChevronDown, MapPin } from "lucide-react";
import Logo from "../ui/Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/about", label: "عن الشركة" },
    { 
      href: "/services", 
      label: "خدماتنا",
      submenu: [
        { href: "/services", label: "الصيانة الفنية" },
        { href: "/contracting", label: "المقاولات" },
        { href: "/real-estate", label: "التطوير العقاري" },
      ]
    },
    { href: "/contact", label: "تواصل معنا" },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-lg py-2' 
        : 'bg-white/95 backdrop-blur-sm py-3'
    }`}>
    
      {/* Main Navbar */}
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Logo variant="default" />

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className="px-4 py-2 text-gray-700 hover:text-[#3b6fa0] font-semibold transition-colors rounded-lg hover:bg-[#e8edf3] flex items-center gap-1"
                >
                  {link.label}
                  {link.submenu && <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />}
                </Link>
                
                {/* Dropdown Menu */}
                {link.submenu && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {link.submenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-6 py-3 text-gray-700 hover:text-[#3b6fa0] hover:bg-[#e8edf3] transition-colors first:rounded-t-xl last:rounded-b-xl"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons + Mobile Toggle */}
          <div className="flex items-center gap-1.5 md:gap-4">
            {/* زر اطلب خدمة - يظهر الآن في كل الشاشات متناسقاً مع الموبايل */}
            <Link 
              href="/request-service" 
              className="inline-flex items-center gap-1.5 bg-[#3b6fa0] hover:bg-[#1e3a5f] text-white px-2.5 py-2 md:px-6 md:py-3 rounded-lg font-bold transition-all duration-300 shadow-md hover:shadow-lg text-xs md:text-base whitespace-nowrap"
            >
              اطلب خدمة
            </Link>

            {/* زر دخول فنيين - يظهر في كل الشاشات */}
            <Link 
              href="/dashboard/login" 
              className="inline-flex items-center gap-1.5 bg-[#1e3a5f] hover:bg-[#3b6fa0] text-white px-2.5 py-2 md:px-6 md:py-3 rounded-lg font-bold transition-all duration-300 shadow-md hover:shadow-lg text-xs md:text-base whitespace-nowrap"
            >
               دخول فنيين
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-[#e8edf3] transition-colors"
              aria-label="القائمة"
            >
              {isOpen ? <X size={24} className="text-[#3b6fa0]" /> : <Menu size={24} className="text-[#3b6fa0]" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="bg-[#e8edf3] rounded-2xl p-4 space-y-2">
              {/* Contact Info Mobile */}
              <div className="bg-white rounded-lg p-4 mb-4 space-y-2 text-sm">
                <a href="mailto:alhadigroup1998@gmail.com" className="flex items-center gap-2 text-gray-700">
                  <Mail size={16} className="text-[#3b6fa0]" />
                  <span className="text-xs">alhadigroup1998@gmail.com</span>
                </a>
              </div>

              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-3 px-4 text-gray-700 hover:text-[#3b6fa0] hover:bg-white rounded-lg transition-colors font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.submenu && (
                    <div className="mr-4 mt-2 space-y-1">
                      {link.submenu.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block py-2 px-4 text-sm text-gray-600 hover:text-[#3b6fa0] hover:bg-white rounded-lg transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}