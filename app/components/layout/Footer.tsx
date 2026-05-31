// import Link from "next/link";
// import { Phone, Mail, MapPin, } from "lucide-react";

// export default function Footer() {
//   const services = [
//     { name: "صيانة كهرباء", href: "/services" },
//     { name: "صيانة تكييف", href: "/services" },
//     { name: "المقاولات", href: "/contracting" },
//     { name: "التطوير العقاري", href: "/real-estate" },
//   ];

//   const quickLinks = [
//     { name: "عن الشركة", href: "/about" },
//     { name: "خدماتنا", href: "/services" },
//     { name: "اطلب خدمة", href: "/request-service" },
//     { name: "تواصل معنا", href: "/contact" },
//   ];

//   return (
//     <footer className="bg-brand-darkest text-white">
//       {/* Main Footer */}
//       <div className="container-custom py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
//           {/* Company Info */}
//           <div>
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-12 h-12 bg-gradient-to-br from-accent-gold to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <span className="text-white font-bold text-xl">H</span>
//               </div>
//               <div>
//                 <h3 className="text-2xl font-bold">الهادي جروب</h3>
//               </div>
//             </div>
//             <p className="text-gray-400 leading-relaxed mb-6">
//               شركة متخصصة في خدمات الصيانة الفنية والمقاولات وتوفير الكوادر المهنية بأعلى معايير الجودة
//             </p>
//             <div className="flex gap-3">
//               {[Phone, Mail, MapPin].map((Icon, index) => (
//                 <a
//                   key={index}
//                   href="#"
//                   className="w-10 h-10 bg-brand-dark hover:bg-accent-gold rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
//                 >
//                   <Icon size={20} />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-lg font-bold mb-6 text-accent-gold">روابط سريعة</h4>
//             <ul className="space-y-3">
//               {quickLinks.map((link) => (
//                 <li key={link.href}>
//                   <Link 
//                     href={link.href} 
//                     className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Services */}
//           <div>
//             <h4 className="text-lg font-bold mb-6 text-accent-gold">خدماتنا</h4>
//             <ul className="space-y-3">
//               {services.map((service) => (
//                 <li key={service.href}>
//                   <Link 
//                     href={service.href} 
//                     className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
//                   >
//                     {service.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h4 className="text-lg font-bold mb-6 text-accent-gold">تواصل معنا</h4>
//             <ul className="space-y-4">
//               <li>
//                 <a href="tel:+966500000000" className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group">
//                   <Phone className="flex-shrink-0 mt-1 group-hover:text-accent-gold transition-colors" size={20} />
//                   <span>+966 50 000 0000</span>
//                 </a>
//               </li>
//               <li>
//                 <a href="mailto:info@alhadi.com" className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group">
//                   <Mail className="flex-shrink-0 mt-1 group-hover:text-accent-gold transition-colors" size={20} />
//                   <span>info@alhadi.com</span>
//                 </a>
//               </li>
//               <li className="flex items-start gap-3 text-gray-400">
//                 <MapPin className="flex-shrink-0 mt-1 text-accent-gold" size={20} />
//                 <span>الرياض، المملكة العربية السعودية</span>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="border-t border-brand-dark/50">
//         <div className="container-custom py-6">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
//             <p>© 2024 الهادي جروب - جميع الحقوق محفوظة</p>
//             <div className="flex gap-6">
//               <Link href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
//               <Link href="/terms" className="hover:text-white transition-colors">الشروط والأحكام</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }



import Link from "next/link";
import { Phone, Mail, MapPin, BoneIcon, BoldIcon } from "lucide-react";

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
    <footer className="bg-brand-darkest text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-gold to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">الهادي جروب</h3>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              شركة متخصصة في خدمات الصيانة الفنية والمقاولات وتوفير الكوادر المهنية بأعلى معايير الجودة
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/share/1EF4CFbTfo/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-brand-dark hover:bg-accent-gold rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <BoldIcon size={20} />
              </a>
              {/* <a
                href="tel:+201025686280"
                className="w-10 h-10 bg-brand-dark hover:bg-accent-gold rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="اتصل بنا"
              >
                <Phone size={20} />
              </a> */}
              <a
                href="mailto:alhadigroup1998@gmail.com"
                className="w-10 h-10 bg-brand-dark hover:bg-accent-gold rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="البريد الإلكتروني"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent-gold">روابط سريعة</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent-gold">خدماتنا</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link 
                    href={service.href} 
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent-gold">تواصل معنا</h4>
            <ul className="space-y-4">
              <li>
                {/* <a href="tel:+201025686280" className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group">
                  <Phone className="flex-shrink-0 mt-1 group-hover:text-accent-gold transition-colors" size={20} />
                  <span dir="ltr">+20 10 2568 6280</span>
                </a> */}
              </li>
              <li>
                <a href="mailto:alhadigroup1998@gmail.com" className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group">
                  <Mail className="flex-shrink-0 mt-1 group-hover:text-accent-gold transition-colors" size={20} />
                  <span className="break-all text-sm">alhadigroup1998@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="flex-shrink-0 mt-1 text-accent-gold" size={20} />
                <div>
                  <div>
                    المنيا - القاهرة، مصر
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-dark/50">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2024 الهادي جروب - جميع الحقوق محفوظة</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
              <Link href="/terms" className="hover:text-white transition-colors">الشروط والأحكام</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}