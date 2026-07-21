// "use client";

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { Menu, X, Phone, Mail, ChevronDown, MapPin, Wrench } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLinks = [
//     { href: "/", label: "الرئيسية" },
//     { href: "/about", label: "عن الشركة" },
//     { 
//       href: "/services", 
//       label: "خدماتنا",
//       submenu: [
//         { href: "/services", label: "الصيانة الفنية" },
//         { href: "/contracting", label: "المقاولات" },
//         { href: "/real-estate", label: "التطوير العقاري" },
//       ]
//     },
//     { href: "/contact", label: "تواصل معنا" },
//   ];

//   return (
//     <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
//       isScrolled 
//         ? 'bg-white shadow-lg py-2' 
//         : 'bg-white/95 backdrop-blur-sm py-3'
//     }`}>
    
//       {/* Main Navbar */}
//       <div className="container-custom">
//         <div className="flex justify-between items-center">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-3 group">
//             <div className="relative">
//               <div className="w-12 h-12 bg-gradient-to-br from-[#3b6fa0] to-[#1e3a5f] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
//                 {/* أيقونة المفتاح الإنجليزي */}
//                 <Wrench className="text-white w-6 h-6 group-hover:rotate-12 transition-transform duration-300" strokeWidth={2.5} />
                
//                 {/* برق كهرباء صغير */}
//                 <svg 
//                   className="absolute top-1 right-1 w-3 h-3 text-yellow-300 animate-pulse" 
//                   fill="currentColor" 
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M11 3L6 13h4l-1 4 5-10h-4l1-4z" />
//                 </svg>
//               </div>
//             </div>
//             <div className="flex flex-col">
//               <span className="text-[#1e3a5f] font-bold text-lg leading-tight">
//                 منصة الهادي جروب
//               </span>
//               <span className="text-[#3b6fa0] text-xs font-semibold">
//                 للخدمات الفنية
//               </span>
//             </div>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden lg:flex items-center gap-1">
//             {navLinks.map((link) => (
//               <div key={link.href} className="relative group">
//                 <Link
//                   href={link.href}
//                   className="px-4 py-2 text-gray-700 hover:text-[#3b6fa0] font-semibold transition-colors rounded-lg hover:bg-[#e8edf3] flex items-center gap-1"
//                 >
//                   {link.label}
//                   {link.submenu && <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />}
//                 </Link>
                
//                 {/* Dropdown Menu */}
//                 {link.submenu && (
//                   <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
//                     {link.submenu.map((item) => (
//                       <Link
//                         key={item.href}
//                         href={item.href}
//                         className="block px-6 py-3 text-gray-700 hover:text-[#3b6fa0] hover:bg-[#e8edf3] transition-colors first:rounded-t-xl last:rounded-b-xl"
//                       >
//                         {item.label}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* CTA Buttons + Mobile Toggle */}
//           <div className="flex items-center gap-1.5 md:gap-4">
//             {/* زر اطلب خدمة - يظهر الآن في كل الشاشات متناسقاً مع الموبايل */}
//             <Link 
//               href="/request-service" 
//               className="inline-flex items-center gap-1.5 bg-[#3b6fa0] hover:bg-[#1e3a5f] text-white px-2.5 py-2 md:px-6 md:py-3 rounded-lg font-bold transition-all duration-300 shadow-md hover:shadow-lg text-xs md:text-base whitespace-nowrap"
//             >
//               اطلب خدمة
//             </Link>

//             {/* زر دخول فنيين - يظهر في كل الشاشات */}
//             <Link 
//               href="/dashboard/login" 
//               className="inline-flex items-center gap-1.5 bg-[#1e3a5f] hover:bg-[#3b6fa0] text-white px-2.5 py-2 md:px-6 md:py-3 rounded-lg font-bold transition-all duration-300 shadow-md hover:shadow-lg text-xs md:text-base whitespace-nowrap"
//             >
//                دخول فنيين
//             </Link>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="lg:hidden p-1.5 rounded-lg hover:bg-[#e8edf3] transition-colors"
//               aria-label="القائمة"
//             >
//               {isOpen ? <X size={24} className="text-[#3b6fa0]" /> : <Menu size={24} className="text-[#3b6fa0]" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="lg:hidden mt-4 pb-4">
//             <div className="bg-[#e8edf3] rounded-2xl p-4 space-y-2">
//               {/* Contact Info Mobile */}
//               <div className="bg-white rounded-lg p-4 mb-4 space-y-2 text-sm">
//                 <a href="mailto:alhadigroup1998@gmail.com" className="flex items-center gap-2 text-gray-700">
//                   <Mail size={16} className="text-[#3b6fa0]" />
//                   <span className="text-xs">alhadigroup1998@gmail.com</span>
//                 </a>
//               </div>

//               {navLinks.map((link) => (
//                 <div key={link.href}>
//                   <Link
//                     href={link.href}
//                     className="block py-3 px-4 text-gray-700 hover:text-[#3b6fa0] hover:bg-white rounded-lg transition-colors font-semibold"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     {link.label}
//                   </Link>
//                   {link.submenu && (
//                     <div className="mr-4 mt-2 space-y-1">
//                       {link.submenu.map((item) => (
//                         <Link
//                           key={item.href}
//                           href={item.href}
//                           className="block py-2 px-4 text-sm text-gray-600 hover:text-[#3b6fa0] hover:bg-white rounded-lg transition-colors"
//                           onClick={() => setIsOpen(false)}
//                         >
//                           {item.label}
//                         </Link>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }


"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, ChevronDown, MapPin, Wrench } from "lucide-react";

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
          <Link href="/" className="flex items-center gap-2 md:gap-3 group min-w-0">
            <div className="relative shrink-0">
              <div className="w-9 h-9 md:w-12 md:h-12 bg-gradient-to-br from-[#3b6fa0] to-[#1e3a5f] rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                {/* أيقونة المفتاح الإنجليزي */}
                <Wrench className="text-white w-4 h-4 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300" strokeWidth={2.5} />
                
                {/* برق كهرباء صغير */}
                <svg 
                  className="absolute top-0.5 right-0.5 md:top-1 md:right-1 w-2.5 h-2.5 md:w-3 md:h-3 text-yellow-300 animate-pulse" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M11 3L6 13h4l-1 4 5-10h-4l1-4z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[#1e3a5f] font-bold text-sm md:text-lg leading-tight truncate">
                منصة الهادي جروب
              </span>
              <span className="hidden sm:block text-[#3b6fa0] text-[10px] md:text-xs font-semibold truncate">
                للخدمات الفنية
              </span>
            </div>
          </Link>

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
          <div className="flex items-center gap-1.5 md:gap-4 shrink-0">
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