

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import {
//   Wrench, User, Phone, MapPin, FileText,
//   Upload, CheckCircle, ChevronLeft, Send,
//   Zap, HardHat, Building2, Camera, Network,
//   Navigation, Loader2
// } from "lucide-react";

// const services = [
//   { id: "electrical", label: "صيانة كهرباء", icon: Zap },
//   { id: "cameras", label: "كاميرات مراقبة", icon: Camera },
//   { id: "data", label: "اتصالات وData", icon: Network },
//   { id: "contracting", label: "مقاولات عامة", icon: HardHat },
//   { id: "real-estate", label: "تطوير عقاري", icon: Building2 },
//   { id: "maintenance", label: "صيانة عامة", icon: Wrench },
// ];

// const cities = ["المنيا", "القاهرة", "الجيزة", "الإسكندرية", "أخرى"];

// export default function RequestServicePage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     city: "",
//     address: "",
//     serviceType: "",
//     description: "",
//     latitude: "",
//     longitude: "",
//     locationLink: "", // ← لينك الموقع الكامل جاهز للإرسال
//   });

//   const [images, setImages] = useState<File[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [locationLoading, setLocationLoading] = useState(false);
//   const [locationError, setLocationError] = useState("");

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const files = Array.from(e.target.files);
//       setImages((prev) => [...prev, ...files]);
//     }
//   };

//   const removeImage = (index: number) => {
//     setImages(images.filter((_, i) => i !== index));
//   };

//   // ===== تحديد الموقع بدقة عالية زي واتساب =====
//   const getCurrentLocation = () => {
//     setLocationLoading(true);
//     setLocationError("");

//     if (!navigator.geolocation) {
//       setLocationError("متصفحك لا يدعم تحديد الموقع");
//       setLocationLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         // احتفظ بالدقة الكاملة بدون تقريب
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;

//         // نفس الـ link اللي واتساب بيولده لما بتبعت موقعك
//         const googleMapsLink = `https://maps.google.com/maps?q=${lat},${lng}`;

//         setFormData((prev) => ({
//           ...prev,
//           latitude: lat.toString(),
//           longitude: lng.toString(),
//           locationLink: googleMapsLink,
//         }));
//         setLocationLoading(false);
//       },
//       (error) => {
//         setLocationError("لم نتمكن من الوصول إلى موقعك. تأكد من إعطاء الإذن.");
//         setLocationLoading(false);
//         console.error(error);
//       },
//       {
//         enableHighAccuracy: true, // GPS حقيقي مش WiFi triangulation
//         timeout: 10000,
//         maximumAge: 0, // لا تستخدم موقع قديم من الكاش — موقع جديد في كل مرة
//       }
//     );
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     // البيانات كاملة جاهزة للإرسال للـ API
//     const payload = {
//       name: formData.name,
//       phone: formData.phone,
//       city: formData.city,
//       address: formData.address,
//       serviceType: formData.serviceType,
//       description: formData.description,
//       // الموقع كـ إحداثيات + لينك جاهز
//       latitude: formData.latitude,
//       longitude: formData.longitude,
//       locationLink: formData.locationLink, // ← ابعته لـ API أو WhatsApp مباشرة
//     };

//     console.log("بيانات الطلب:", payload);

//     // ===== مثال: إرسال رسالة واتساب للإدارة مع الموقع =====
//     // const waMsg = `طلب خدمة جديد:
//     // الاسم: ${formData.name}
//     // الهاتف: ${formData.phone}
//     // المدينة: ${formData.city}
//     // العنوان: ${formData.address}
//     // الخدمة: ${formData.serviceType}
//     // الوصف: ${formData.description}
//     // الموقع: ${formData.locationLink}`;
//     // window.open(`https://wa.me/201025686280?text=${encodeURIComponent(waMsg)}`);

//     // ===== أو: إرسال لـ API =====
//     // await fetch("/api/requests", {
//     //   method: "POST",
//     //   headers: { "Content-Type": "application/json" },
//     //   body: JSON.stringify(payload),
//     // });

//     setTimeout(() => {
//       setLoading(false);
//       setSuccess(true);

//       setFormData({
//         name: "",
//         phone: "",
//         city: "",
//         address: "",
//         serviceType: "",
//         description: "",
//         latitude: "",
//         longitude: "",
//         locationLink: "",
//       });
//       setImages([]);

//       setTimeout(() => setSuccess(false), 5000);
//     }, 2000);
//   };

//   return (
//     <div className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>

//       {/* ===== Hero Section ===== */}
//       <section
//         className="relative py-20 overflow-hidden"
//         style={{
//           background: "linear-gradient(135deg, #0f1b3d 0%, #1e3a5f 60%, #3b6fa0 100%)",
//         }}
//       >
//         <div
//           className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20"
//           style={{ backgroundColor: "#3b6fa0", transform: "translate(30%, -40%)" }}
//         />

//         <div className="relative max-w-7xl mx-auto px-6">
//           <div
//             className="flex items-center gap-2 text-sm mb-8"
//             style={{ color: "rgba(232,237,243,0.5)" }}
//           >
//             <Link
//               href="/"
//               className="hover:text-white transition-colors"
//               style={{ color: "rgba(232,237,243,0.6)" }}
//             >
//               الرئيسية
//             </Link>
//             <ChevronLeft size={14} />
//             <span style={{ color: "#e8edf3" }}>اطلب خدمة</span>
//           </div>

//           <div className="text-center max-w-3xl mx-auto">
//             <div
//               className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 border mb-6"
//               style={{
//                 backgroundColor: "rgba(59,111,160,0.25)",
//                 borderColor: "rgba(59,111,160,0.4)",
//               }}
//             >
//               <Wrench size={15} style={{ color: "#e8edf3" }} />
//               <span className="text-sm font-bold" style={{ color: "#e8edf3" }}>
//                 اطلب خدمتك الآن
//               </span>
//             </div>

//             <h1
//               className="text-4xl md:text-5xl font-black leading-tight mb-4"
//               style={{ color: "#ffffff" }}
//             >
//               احصل على خدمتك
//               <span
//                 className="block mt-1"
//                 style={{ color: "rgba(232,237,243,0.8)" }}
//               >
//                 في 3 خطوات بسيطة
//               </span>
//             </h1>

//             <p
//               className="text-lg leading-relaxed"
//               style={{ color: "rgba(232,237,243,0.7)" }}
//             >
//               املأ النموذج أدناه وسيتواصل معك فريقنا خلال 30 دقيقة
//               لتحديد موعد الزيارة
//             </p>

//             <div className="grid grid-cols-3 gap-4 mt-8">
//               {[
//                 { icon: "⚡", text: "استجابة سريعة" },
//                 { icon: "🔒", text: "بياناتك آمنة" },
//                 { icon: "✅", text: "بدون التزام" },
//               ].map((item, i) => (
//                 <div
//                   key={i}
//                   className="flex flex-col items-center gap-2 p-3 rounded-xl border"
//                   style={{
//                     backgroundColor: "rgba(232,237,243,0.08)",
//                     borderColor: "rgba(232,237,243,0.15)",
//                   }}
//                 >
//                   <span className="text-2xl">{item.icon}</span>
//                   <span
//                     className="text-xs font-semibold"
//                     style={{ color: "rgba(232,237,243,0.8)" }}
//                   >
//                     {item.text}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0">
//           <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full">
//             <path
//               d="M0 60L1440 60L1440 30C1200 0 960 0 720 15C480 30 240 40 0 30Z"
//               fill="#f8fafc"
//             />
//           </svg>
//         </div>
//       </section>

//       {/* ===== Form Section ===== */}
//       <section className="py-16">
//         <div className="max-w-4xl mx-auto px-6">

//           {/* رسالة النجاح */}
//           {success && (
//             <div
//               className="mb-8 p-6 rounded-2xl border flex items-start gap-4"
//               style={{ backgroundColor: "#ecfdf5", borderColor: "#10b981" }}
//             >
//               <CheckCircle size={24} style={{ color: "#10b981", flexShrink: 0 }} />
//               <div>
//                 <h3 className="font-bold text-lg mb-1" style={{ color: "#065f46" }}>
//                   تم إرسال طلبك بنجاح!
//                 </h3>
//                 <p className="text-sm leading-relaxed" style={{ color: "#047857" }}>
//                   شكراً لك! سيتواصل معك فريقنا خلال 30 دقيقة لتحديد موعد الزيارة.
//                   يمكنك أيضاً الاتصال بنا مباشرة على{" "}
//                   <a href="tel:+201025686280" className="font-bold underline">
//                     +20 10 2568 6280
//                   </a>
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* النموذج */}
//           <div
//             className="bg-white rounded-3xl border p-8 md:p-10"
//             style={{ borderColor: "#e8edf3" }}
//           >
//             <form onSubmit={handleSubmit}>

//               {/* ===== الخطوة 1: البيانات الشخصية ===== */}
//               <div className="mb-10">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div
//                     className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white"
//                     style={{ backgroundColor: "#1e3a5f" }}
//                   >
//                     1
//                   </div>
//                   <h2 className="text-2xl font-black" style={{ color: "#0f1b3d" }}>
//                     بياناتك الشخصية
//                   </h2>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   {/* الاسم */}
//                   <div>
//                     <label className="block font-bold mb-2 text-sm" style={{ color: "#1e3a5f" }}>
//                       <User size={16} className="inline ml-2" />
//                       الاسم الكامل *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       placeholder="أدخل اسمك الكامل"
//                       className="w-full px-4 py-3 rounded-xl border transition-all outline-none"
//                       style={{ borderColor: "#e8edf3", color: "#0f1b3d" }}
//                       onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
//                       onBlur={e => (e.target.style.borderColor = "#e8edf3")}
//                     />
//                   </div>

//                   {/* الهاتف */}
//                   <div>
//                     <label className="block font-bold mb-2 text-sm" style={{ color: "#1e3a5f" }}>
//                       <Phone size={16} className="inline ml-2" />
//                       رقم الهاتف *
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       required
//                       placeholder="01xxxxxxxxx"
//                       className="w-full px-4 py-3 rounded-xl border transition-all outline-none"
//                       style={{ borderColor: "#e8edf3", color: "#0f1b3d" }}
//                       onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
//                       onBlur={e => (e.target.style.borderColor = "#e8edf3")}
//                     />
//                   </div>

//                   {/* المدينة */}
//                   <div>
//                     <label className="block font-bold mb-2 text-sm" style={{ color: "#1e3a5f" }}>
//                       <MapPin size={16} className="inline ml-2" />
//                       المدينة *
//                     </label>
//                     <select
//                       name="city"
//                       value={formData.city}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 rounded-xl border transition-all outline-none"
//                       style={{ borderColor: "#e8edf3", color: "#0f1b3d" }}
//                       onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
//                       onBlur={e => (e.target.style.borderColor = "#e8edf3")}
//                     >
//                       <option value="">اختر المدينة</option>
//                       {cities.map((city) => (
//                         <option key={city} value={city}>{city}</option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* العنوان */}
//                   <div>
//                     <label className="block font-bold mb-2 text-sm" style={{ color: "#1e3a5f" }}>
//                       <MapPin size={16} className="inline ml-2" />
//                       العنوان بالتفصيل *
//                     </label>
//                     <input
//                       type="text"
//                       name="address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       required
//                       placeholder="الشارع، الحي، رقم المبنى"
//                       className="w-full px-4 py-3 rounded-xl border transition-all outline-none"
//                       style={{ borderColor: "#e8edf3", color: "#0f1b3d" }}
//                       onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
//                       onBlur={e => (e.target.style.borderColor = "#e8edf3")}
//                     />
//                   </div>
//                 </div>

//                 {/* ===== زر الموقع ===== */}
//                 <div className="mt-6">
//                   <button
//                     type="button"
//                     onClick={getCurrentLocation}
//                     disabled={locationLoading}
//                     className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border transition-all font-bold"
//                     style={{
//                       borderColor: formData.locationLink ? "#10b981" : "#e8edf3",
//                       backgroundColor: formData.locationLink
//                         ? "rgba(16,185,129,0.1)"
//                         : "white",
//                       color: formData.locationLink ? "#059669" : "#1e3a5f",
//                     }}
//                   >
//                     {locationLoading ? (
//                       <>
//                         <Loader2 size={20} className="animate-spin" />
//                         جاري تحديد الموقع...
//                       </>
//                     ) : formData.locationLink ? (
//                       <>
//                         <CheckCircle size={20} />
//                         تم تحديد موقعك بنجاح
//                         {/* لينك مباشر يفتح Google Maps بالإحداثيات الدقيقة */}
//                         <a
//                           href={formData.locationLink}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           onClick={(e) => e.stopPropagation()}
//                           className="text-xs underline mr-2"
//                           style={{ color: "#059669" }}
//                         >
//                           عرض على الخريطة
//                         </a>
//                       </>
//                     ) : (
//                       <>
//                         <Navigation size={20} />
//                         حدد موقعي الحالي
//                       </>
//                     )}
//                   </button>

//                   {/* عرض الإحداثيات الدقيقة للمستخدم */}
//                   {formData.latitude && formData.longitude && (
//                     <div
//                       className="mt-3 px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2"
//                       style={{
//                         backgroundColor: "rgba(16,185,129,0.06)",
//                         color: "#059669",
//                         border: "1px solid rgba(16,185,129,0.2)",
//                       }}
//                     >
//                       <MapPin size={12} />
//                       <span>
//                         {parseFloat(formData.latitude).toFixed(6)}°N،{" "}
//                         {parseFloat(formData.longitude).toFixed(6)}°E
//                       </span>
//                     </div>
//                   )}

//                   {locationError && (
//                     <p className="text-xs mt-2 text-center" style={{ color: "#ef4444" }}>
//                       {locationError}
//                     </p>
//                   )}

//                   <p
//                     className="text-xs mt-2 text-center"
//                     style={{ color: "rgba(30,58,95,0.5)" }}
//                   >
//                     📍 سيساعد هذا الفني في الوصول إليك بسهولة
//                   </p>
//                 </div>
//               </div>

//               {/* ===== الخطوة 2: نوع الخدمة ===== */}
//               <div className="mb-10">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div
//                     className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white"
//                     style={{ backgroundColor: "#1e3a5f" }}
//                   >
//                     2
//                   </div>
//                   <h2 className="text-2xl font-black" style={{ color: "#0f1b3d" }}>
//                     نوع الخدمة المطلوبة
//                   </h2>
//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                   {services.map((service) => {
//                     const Icon = service.icon;
//                     const isSelected = formData.serviceType === service.id;
//                     return (
//                       <button
//                         key={service.id}
//                         type="button"
//                         onClick={() =>
//                           setFormData({ ...formData, serviceType: service.id })
//                         }
//                         className="p-4 rounded-2xl border transition-all text-right"
//                         style={{
//                           borderColor: isSelected ? "#3b6fa0" : "#e8edf3",
//                           backgroundColor: isSelected
//                             ? "rgba(59,111,160,0.08)"
//                             : "white",
//                         }}
//                       >
//                         <Icon
//                           size={24}
//                           className="mb-3"
//                           style={{ color: isSelected ? "#3b6fa0" : "#1e3a5f" }}
//                         />
//                         <div
//                           className="font-bold text-sm"
//                           style={{ color: isSelected ? "#0f1b3d" : "#1e3a5f" }}
//                         >
//                           {service.label}
//                         </div>
//                         {isSelected && (
//                           <CheckCircle
//                             size={18}
//                             className="mt-2"
//                             style={{ color: "#3b6fa0" }}
//                           />
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* ===== الخطوة 3: وصف المشكلة ===== */}
//               <div className="mb-10">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div
//                     className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white"
//                     style={{ backgroundColor: "#1e3a5f" }}
//                   >
//                     3
//                   </div>
//                   <h2 className="text-2xl font-black" style={{ color: "#0f1b3d" }}>
//                     وصف الخدمة
//                   </h2>
//                 </div>

//                 <div className="mb-6">
//                   <label className="block font-bold mb-2 text-sm" style={{ color: "#1e3a5f" }}>
//                     <FileText size={16} className="inline ml-2" />
//                     وصف المشكلة أو الخدمة المطلوبة *
//                   </label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     required
//                     rows={5}
//                     placeholder="اشرح المشكلة أو الخدمة التي تحتاجها بالتفصيل..."
//                     className="w-full px-4 py-3 rounded-xl border transition-all outline-none resize-none"
//                     style={{ borderColor: "#e8edf3", color: "#0f1b3d" }}
//                     onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
//                     onBlur={e => (e.target.style.borderColor = "#e8edf3")}
//                   />
//                 </div>

//                 <div>
//                   <label className="block font-bold mb-2 text-sm" style={{ color: "#1e3a5f" }}>
//                     <Upload size={16} className="inline ml-2" />
//                     إرفاق صور (اختياري)
//                   </label>
//                   <div
//                     className="border-2 border-dashed rounded-2xl p-6 text-center transition-all"
//                     style={{ borderColor: "#e8edf3" }}
//                   >
//                     <input
//                       type="file"
//                       accept="image/*"
//                       multiple
//                       onChange={handleImageUpload}
//                       className="hidden"
//                       id="image-upload"
//                     />
//                     <label htmlFor="image-upload" className="cursor-pointer inline-block">
//                       <Upload size={32} className="mx-auto mb-3" style={{ color: "#3b6fa0" }} />
//                       <p className="font-semibold mb-1" style={{ color: "#1e3a5f" }}>
//                         اضغط لرفع الصور
//                       </p>
//                       <p className="text-xs" style={{ color: "rgba(30,58,95,0.5)" }}>
//                         يمكنك رفع عدة صور لتوضيح المشكلة
//                       </p>
//                     </label>
//                   </div>

//                   {images.length > 0 && (
//                     <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-4">
//                       {images.map((image, index) => (
//                         <div
//                           key={index}
//                           className="relative group rounded-xl overflow-hidden border"
//                           style={{ borderColor: "#e8edf3" }}
//                         >
//                           <img
//                             src={URL.createObjectURL(image)}
//                             alt={`صورة ${index + 1}`}
//                             className="w-full h-24 object-cover"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index)}
//                             className="absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
//                             style={{ backgroundColor: "rgba(239,68,68,0.9)" }}
//                           >
//                             ×
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* ===== زر الإرسال ===== */}
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="flex-1 flex items-center justify-center gap-3 font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-white"
//                   style={{ backgroundColor: "#1e3a5f" }}
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 size={20} className="animate-spin" />
//                       جاري الإرسال...
//                     </>
//                   ) : (
//                     <>
//                       <Send size={20} />
//                       إرسال الطلب
//                     </>
//                   )}
//                 </button>

//                 <a
//                   href="tel:+201025686280"
//                   className="flex items-center justify-center gap-3 font-bold px-8 py-4 rounded-2xl border transition-all"
//                   style={{ borderColor: "#1e3a5f", color: "#1e3a5f" }}
//                 >
//                   <Phone size={20} />
//                   أو اتصل مباشرة
//                 </a>
//               </div>

//               <p
//                 className="text-xs text-center mt-6 leading-relaxed"
//                 style={{ color: "rgba(30,58,95,0.5)" }}
//               >
//                 بإرسال هذا النموذج، أنت توافق على{" "}
//                 <Link href="/privacy" className="underline">
//                   سياسة الخصوصية
//                 </Link>
//                 . بياناتك آمنة ولن تُستخدم إلا للتواصل معك بخصوص طلبك.
//               </p>
//             </form>
//           </div>

//           {/* ===== معلومات إضافية ===== */}
//           <div className="grid md:grid-cols-3 gap-6 mt-12">
//             {[
//               { icon: "⚡", title: "استجابة سريعة", desc: "نتواصل معك خلال 30 دقيقة" },
//               { icon: "👷", title: "فنيون محترفون", desc: "فريق معتمد وذو خبرة عالية" },
//               { icon: "✅", title: "ضمان الجودة", desc: "نضمن جودة العمل 100%" },
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="text-center p-6 rounded-2xl border"
//                 style={{ backgroundColor: "white", borderColor: "#e8edf3" }}
//               >
//                 <div className="text-4xl mb-3">{item.icon}</div>
//                 <h3 className="font-bold mb-2" style={{ color: "#0f1b3d" }}>
//                   {item.title}
//                 </h3>
//                 <p className="text-sm" style={{ color: "rgba(30,58,95,0.6)" }}>
//                   {item.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wrench, User, Phone, MapPin, FileText,
  Upload, CheckCircle, ChevronLeft, Send,
  Zap, HardHat, Building2, Camera, Network,
  Navigation, Loader2, PartyPopper
} from "lucide-react";

const services = [
  { id: "electrical", label: "صيانة كهرباء", icon: Zap },
  { id: "cameras", label: "كاميرات مراقبة", icon: Camera },
  { id: "data", label: "اتصالات وData", icon: Network },
  { id: "contracting", label: "مقاولات عامة", icon: HardHat },
  { id: "real-estate", label: "تطوير عقاري", icon: Building2 },
  { id: "maintenance", label: "صيانة عامة", icon: Wrench },
];

const cities = ["المنيا", "القاهرة", "الجيزة", "الإسكندرية", "أخرى"];

export default function RequestServicePage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    serviceType: "",
    description: "",
    latitude: "",
    longitude: "",
    locationLink: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages((prev) => [...prev, ...files]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const getCurrentLocation = () => {
    setLocationLoading(true);
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("متصفحك لا يدعم تحديد الموقع");
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const googleMapsLink = `https://maps.google.com/maps?q=${lat},${lng}`;

        setFormData((prev) => ({
          ...prev,
          latitude: lat.toString(),
          longitude: lng.toString(),
          locationLink: googleMapsLink,
        }));
        setLocationLoading(false);
      },
      (error) => {
        setLocationError("لم نتمكن من الوصول إلى موقعك. تأكد من إعطاء الإذن.");
        setLocationLoading(false);
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // ===== دالة إعادة تعيين النموذج =====
  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      city: "",
      address: "",
      serviceType: "",
      description: "",
      latitude: "",
      longitude: "",
      locationLink: "",
    });
    setImages([]);
    setSuccess(false);
    setLocationError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      phone: formData.phone,
      city: formData.city,
      address: formData.address,
      serviceType: formData.serviceType,
      description: formData.description,
      latitude: formData.latitude,
      longitude: formData.longitude,
      locationLink: formData.locationLink,
    };

    console.log("بيانات الطلب:", payload);

    // ===== هنا يتم إرسال البيانات للـ API =====

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" }); // انتقال سلس لأعلى الصفحة
    }, 2000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>

      {/* ===== Hero Section ===== */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f1b3d 0%, #1e3a5f 60%, #3b6fa0 100%)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: "#3b6fa0", transform: "translate(30%, -40%)" }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <div
            className="flex items-center gap-2 text-sm mb-8"
            style={{ color: "rgba(232,237,243,0.5)" }}
          >
            <Link
              href="/"
              className="hover:text-white transition-colors"
              style={{ color: "rgba(232,237,243,0.6)" }}
            >
              الرئيسية
            </Link>
            <ChevronLeft size={14} />
            <span style={{ color: "#e8edf3" }}>اطلب خدمة</span>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <div
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 border mb-6"
              style={{
                backgroundColor: "rgba(59,111,160,0.25)",
                borderColor: "rgba(59,111,160,0.4)",
              }}
            >
              <Wrench size={15} style={{ color: "#e8edf3" }} />
              <span className="text-sm font-bold" style={{ color: "#e8edf3" }}>
                اطلب خدمتك الآن
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl font-black leading-tight mb-4"
              style={{ color: "#ffffff" }}
            >
              احصل على خدمتك
              <span
                className="block mt-1"
                style={{ color: "rgba(232,237,243,0.8)" }}
              >
                في 3 خطوات بسيطة
              </span>
            </h1>

            <p
              className="text-lg leading-relaxed"
              style={{ color: "rgba(232,237,243,0.7)" }}
            >
              املأ النموذج أدناه وسيتواصل معك فريقنا خلال 30 دقيقة
              لتحديد موعد الزيارة
            </p>

            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { icon: "⚡", text: "استجابة سريعة" },
                { icon: "🔒", text: "بياناتك آمنة" },
                { icon: "✅", text: "بدون التزام" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border"
                  style={{
                    backgroundColor: "rgba(232,237,243,0.08)",
                    borderColor: "rgba(232,237,243,0.15)",
                  }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "rgba(232,237,243,0.8)" }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full">
            <path
              d="M0 60L1440 60L1440 30C1200 0 960 0 720 15C480 30 240 40 0 30Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      {/* ===== Form Section ===== */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">

          {/* ===== 🎉 رسالة النجاح (تظهر بدل الفورم) ===== */}
          {success ? (
            <div
              className="bg-white rounded-3xl border p-12 md:p-16 text-center"
              style={{ borderColor: "#10b981" }}
            >
              {/* أيقونة متحركة */}
              <div
                className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce"
                style={{ backgroundColor: "rgba(16,185,129,0.15)" }}
              >
                <CheckCircle size={48} style={{ color: "#10b981" }} />
              </div>

              {/* العنوان */}
              <h2
                className="text-3xl md:text-4xl font-black mb-4"
                style={{ color: "#065f46" }}
              >
                🎉 تم إرسال طلبك بنجاح!
              </h2>

              {/* الوصف */}
              <p
                className="text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
                style={{ color: "#047857" }}
              >
                شكراً لك! سيتواصل معك فريقنا خلال <strong>30 دقيقة</strong> لتحديد موعد الزيارة.
                <br />
                يمكنك أيضاً الاتصال بنا مباشرة على{" "}
                <a
                  href="tel:+201025686280"
                  className="font-black underline"
                  style={{ color: "#065f46" }}
                >
                  +20 10 2568 6280
                </a>
              </p>

              {/* الأزرار */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* زر طلب خدمة مرة أخرى */}
                <button
                  onClick={resetForm}
                  className="flex items-center gap-3 font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105 text-white"
                  style={{ backgroundColor: "#1e3a5f" }}
                >
                  <Wrench size={20} />
                  اطلب خدمة مرة أخرى
                </button>

                {/* زر الرجوع للرئيسية */}
                <Link
                  href="/"
                  className="flex items-center gap-3 font-bold px-8 py-4 rounded-2xl border transition-all"
                  style={{ borderColor: "#10b981", color: "#065f46" }}
                >
                  <ChevronLeft size={20} />
                  العودة للرئيسية
                </Link>
              </div>

              {/* ديكور إضافي */}
              <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                {[
                  { emoji: "⚡", text: "استجابة فورية" },
                  { emoji: "👨‍🔧", text: "فنيون محترفون" },
                  { emoji: "✅", text: "جودة مضمونة" },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl mb-2">{item.emoji}</div>
                    <p
                      className="text-xs font-semibold"
                      style={{ color: "#047857" }}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* ===== النموذج (يظهر فقط لو success = false) ===== */
            <div
              className="bg-white rounded-3xl border p-8 md:p-10"
              style={{ borderColor: "#e8edf3" }}
            >
              <form onSubmit={handleSubmit}>

                {/* ===== الخطوة 1: البيانات الشخصية ===== */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white"
                      style={{ backgroundColor: "#1e3a5f" }}
                    >
                      1
                    </div>
                    <h2 className="text-2xl font-black" style={{ color: "#0f1b3d" }}>
                      بياناتك الشخصية
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* الاسم */}
                    <div>
                      <label className="block font-bold mb-2 text-sm" style={{ color: "#1e3a5f" }}>
                        <User size={16} className="inline ml-2" />
                        الاسم الكامل *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="أدخل اسمك الكامل"
                        className="w-full px-4 py-3 rounded-xl border transition-all outline-none"
                        style={{ borderColor: "#e8edf3", color: "#0f1b3d" }}
                        onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
                        onBlur={e => (e.target.style.borderColor = "#e8edf3")}
                      />
                    </div>

                    {/* الهاتف */}
                    <div>
                      <label className="block font-bold mb-2 text-sm" style={{ color: "#1e3a5f" }}>
                        <Phone size={16} className="inline ml-2" />
                        رقم الهاتف *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="01xxxxxxxxx"
                        className="w-full px-4 py-3 rounded-xl border transition-all outline-none"
                        style={{ borderColor: "#e8edf3", color: "#0f1b3d" }}
                        onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
                        onBlur={e => (e.target.style.borderColor = "#e8edf3")}
                      />
                    </div>

                    {/* المدينة */}
                    <div>
                      <label className="block font-bold mb-2 text-sm" style={{ color: "#1e3a5f" }}>
                        <MapPin size={16} className="inline ml-2" />
                        المدينة *
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border transition-all outline-none"
                        style={{ borderColor: "#e8edf3", color: "#0f1b3d" }}
                        onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
                        onBlur={e => (e.target.style.borderColor = "#e8edf3")}
                      >
                        <option value="">اختر المدينة</option>
                        {cities.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>

                    {/* العنوان */}
                    <div>
                      <label className="block font-bold mb-2 text-sm" style={{ color: "#1e3a5f" }}>
                        <MapPin size={16} className="inline ml-2" />
                        العنوان بالتفصيل *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="الشارع، الحي، رقم المبنى"
                        className="w-full px-4 py-3 rounded-xl border transition-all outline-none"
                        style={{ borderColor: "#e8edf3", color: "#0f1b3d" }}
                        onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
                        onBlur={e => (e.target.style.borderColor = "#e8edf3")}
                      />
                    </div>
                  </div>

                  {/* ===== زر الموقع ===== */}
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      disabled={locationLoading}
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border transition-all font-bold"
                      style={{
                        borderColor: formData.locationLink ? "#10b981" : "#e8edf3",
                        backgroundColor: formData.locationLink
                          ? "rgba(16,185,129,0.1)"
                          : "white",
                        color: formData.locationLink ? "#059669" : "#1e3a5f",
                      }}
                    >
                      {locationLoading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          جاري تحديد الموقع...
                        </>
                      ) : formData.locationLink ? (
                        <>
                          <CheckCircle size={20} />
                          تم تحديد موقعك بنجاح
                          <a
                            href={formData.locationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs underline mr-2"
                            style={{ color: "#059669" }}
                          >
                            عرض على الخريطة
                          </a>
                        </>
                      ) : (
                        <>
                          <Navigation size={20} />
                          حدد موقعي الحالي
                        </>
                      )}
                    </button>

                    {formData.latitude && formData.longitude && (
                      <div
                        className="mt-3 px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2"
                        style={{
                          backgroundColor: "rgba(16,185,129,0.06)",
                          color: "#059669",
                          border: "1px solid rgba(16,185,129,0.2)",
                        }}
                      >
                        <MapPin size={12} />
                        <span>
                          {parseFloat(formData.latitude).toFixed(6)}°N،{" "}
                          {parseFloat(formData.longitude).toFixed(6)}°E
                        </span>
                      </div>
                    )}

                    {locationError && (
                      <p className="text-xs mt-2 text-center" style={{ color: "#ef4444" }}>
                        {locationError}
                      </p>
                    )}

                    <p
                      className="text-xs mt-2 text-center"
                      style={{ color: "rgba(30,58,95,0.5)" }}
                    >
                      📍 سيساعد هذا الفني في الوصول إليك بسهولة
                    </p>
                  </div>
                </div>

                {/* ===== الخطوة 2: نوع الخدمة ===== */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white"
                      style={{ backgroundColor: "#1e3a5f" }}
                    >
                      2
                    </div>
                    <h2 className="text-2xl font-black" style={{ color: "#0f1b3d" }}>
                      نوع الخدمة المطلوبة
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {services.map((service) => {
                      const Icon = service.icon;
                      const isSelected = formData.serviceType === service.id;
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, serviceType: service.id })
                          }
                          className="p-4 rounded-2xl border transition-all text-right"
                          style={{
                            borderColor: isSelected ? "#3b6fa0" : "#e8edf3",
                            backgroundColor: isSelected
                              ? "rgba(59,111,160,0.08)"
                              : "white",
                          }}
                        >
                          <Icon
                            size={24}
                            className="mb-3"
                            style={{ color: isSelected ? "#3b6fa0" : "#1e3a5f" }}
                          />
                          <div
                            className="font-bold text-sm"
                            style={{ color: isSelected ? "#0f1b3d" : "#1e3a5f" }}
                          >
                            {service.label}
                          </div>
                          {isSelected && (
                            <CheckCircle
                              size={18}
                              className="mt-2"
                              style={{ color: "#3b6fa0" }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ===== الخطوة 3: وصف المشكلة ===== */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white"
                      style={{ backgroundColor: "#1e3a5f" }}
                    >
                      3
                    </div>
                    <h2 className="text-2xl font-black" style={{ color: "#0f1b3d" }}>
                      وصف الخدمة
                    </h2>
                  </div>

                  <div className="mb-6">
                    <label className="block font-bold mb-2 text-sm" style={{ color: "#1e3a5f" }}>
                      <FileText size={16} className="inline ml-2" />
                      وصف المشكلة أو الخدمة المطلوبة *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="اشرح المشكلة أو الخدمة التي تحتاجها بالتفصيل..."
                      className="w-full px-4 py-3 rounded-xl border transition-all outline-none resize-none"
                      style={{ borderColor: "#e8edf3", color: "#0f1b3d" }}
                      onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
                      onBlur={e => (e.target.style.borderColor = "#e8edf3")}
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-2 text-sm" style={{ color: "#1e3a5f" }}>
                      <Upload size={16} className="inline ml-2" />
                      إرفاق صور (اختياري)
                    </label>
                    <div
                      className="border-2 border-dashed rounded-2xl p-6 text-center transition-all"
                      style={{ borderColor: "#e8edf3" }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer inline-block">
                        <Upload size={32} className="mx-auto mb-3" style={{ color: "#3b6fa0" }} />
                        <p className="font-semibold mb-1" style={{ color: "#1e3a5f" }}>
                          اضغط لرفع الصور
                        </p>
                        <p className="text-xs" style={{ color: "rgba(30,58,95,0.5)" }}>
                          يمكنك رفع عدة صور لتوضيح المشكلة
                        </p>
                      </label>
                    </div>

                    {images.length > 0 && (
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                        {images.map((image, index) => (
                          <div
                            key={index}
                            className="relative group rounded-xl overflow-hidden border"
                            style={{ borderColor: "#e8edf3" }}
                          >
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`صورة ${index + 1}`}
                              className="w-full h-24 object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ backgroundColor: "rgba(239,68,68,0.9)" }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* ===== زر الإرسال ===== */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-3 font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                    style={{ backgroundColor: "#1e3a5f" }}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        إرسال الطلب
                      </>
                    )}
                  </button>

                  {/* <a
                    href="tel:+201025686280"
                    className="flex items-center justify-center gap-3 font-bold px-8 py-4 rounded-2xl border transition-all"
                    style={{ borderColor: "#1e3a5f", color: "#1e3a5f" }}
                  >
                    <Phone size={20} />
                    أو اتصل مباشرة
                  </a> */}
                </div>

                <p
                  className="text-xs text-center mt-6 leading-relaxed"
                  style={{ color: "rgba(30,58,95,0.5)" }}
                >
                  بإرسال هذا النموذج، أنت توافق على{" "}
                  <Link href="/privacy" className="underline">
                    سياسة الخصوصية
                  </Link>
                  . بياناتك آمنة ولن تُستخدم إلا للتواصل معك بخصوص طلبك.
                </p>
              </form>
            </div>
          )}

          {/* ===== معلومات إضافية (تظهر دائماً) ===== */}
          {!success && (
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: "⚡", title: "استجابة سريعة", desc: "نتواصل معك خلال 30 دقيقة" },
                { icon: "👷", title: "فنيون محترفون", desc: "فريق معتمد وذو خبرة عالية" },
                { icon: "✅", title: "ضمان الجودة", desc: "نضمن جودة العمل 100%" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="text-center p-6 rounded-2xl border"
                  style={{ backgroundColor: "white", borderColor: "#e8edf3" }}
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-bold mb-2" style={{ color: "#0f1b3d" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{ color: "rgba(30,58,95,0.6)" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/////////////////////////////////////////////////////////
//////////////////////////////////////////////////
////////////////////////////////////////////////////
///////////////////////////////////
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import {
//   Wrench, HardHat, Building2, Zap,
//   Camera, Network, ChevronLeft,
//   Phone, Mail, MapPin, CheckCircle,
//   Upload, X, Send, User, FileText
// } from "lucide-react";

// const serviceCategories = [
//   {
//     id: "electricity",
//     icon: Zap,
//     title: "كهرباء",
//     desc: "تركيب وصيانة الكهرباء",
//     color: "bg-yellow-500/15 border-yellow-500/30",
//     iconColor: "text-yellow-500",
//   },
//   {
//     id: "cameras",
//     icon: Camera,
//     title: "كاميرات مراقبة",
//     desc: "تركيب وصيانة الكاميرات",
//     color: "bg-slate-500/15 border-slate-500/30",
//     iconColor: "text-slate-500",
//   },
//   {
//     id: "data",
//     icon: Network,
//     title: "اتصالات وData",
//     desc: "شبكات وتمديدات بيانات",
//     color: "bg-blue-500/15 border-blue-500/30",
//     iconColor: "text-blue-500",
//   },
//   {
//     id: "maintenance",
//     icon: Wrench,
//     title: "صيانة عامة",
//     desc: "صيانة عامة وإصلاحات",
//     color: "bg-green-500/15 border-green-500/30",
//     iconColor: "text-green-500",
//   },
//   {
//     id: "contracting",
//     icon: HardHat,
//     title: "مقاولات عامة",
//     desc: "تشطيبات ومشاريع إنشائية",
//     color: "bg-orange-500/15 border-orange-500/30",
//     iconColor: "text-orange-500",
//   },
//   {
//     id: "realestate",
//     icon: Building2,
//     title: "تطوير عقاري",
//     desc: "تطوير وإدارة العقارات",
//     color: "bg-purple-500/15 border-purple-500/30",
//     iconColor: "text-purple-500",
//   },
// ];

// const subServices: Record<string, string[]> = {
//   electricity: ["تركيب نقاط كهربائية", "إصلاح أعطال", "تبديل كابلات", "لوحات كهربائية", "تمديدات كهربائية", "فحص السلامة"],
//   cameras: ["تركيب كاميرات داخلية", "تركيب كاميرات خارجية", "أنظمة تسجيل", "مراقبة عن بُعد", "صيانة كاميرات"],
//   data: ["تمديد شبكات إنترنت", "كابلات Data", "أنظمة اتصال", "شبكات محلية", "نقاط واي فاي"],
//   maintenance: ["صيانة دورية", "إصلاح أعطال", "فحص شامل", "صيانة طارئة", "عقود صيانة"],
//   contracting: ["تشطيبات سكنية", "تشطيبات تجارية", "دهانات", "أرضيات", "أسقف مستعارة", "واجهات"],
//   realestate: ["تطوير وحدات", "تطوير فلل", "وساطة عقارية", "إدارة أملاك", "استشارات عقارية"],
// };

// type FormData = {
//   name: string;
//   phone: string;
//   email: string;
//   address: string;
//   city: string;
//   serviceCategory: string;
//   subService: string;
//   description: string;
//   urgency: string;
//   images: File[];
// };

// export default function RequestServicePage() {
//   const [step, setStep] = useState(1);
//   const [submitted, setSubmitted] = useState(false);
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     phone: "",
//     email: "",
//     address: "",
//     city: "",
//     serviceCategory: "",
//     subService: "",
//     description: "",
//     urgency: "normal",
//     images: [],
//   });

//   const handleCategorySelect = (id: string) => {
//     setFormData({ ...formData, serviceCategory: id, subService: "" });
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const newFiles = Array.from(e.target.files);
//       setFormData({
//         ...formData,
//         images: [...formData.images, ...newFiles].slice(0, 5),
//       });
//     }
//   };

//   const removeImage = (index: number) => {
//     setFormData({
//       ...formData,
//       images: formData.images.filter((_, i) => i !== index),
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);
//   };

//   const isStep1Valid =
//     formData.serviceCategory !== "" && formData.subService !== "";

//   const isStep2Valid =
//     formData.name !== "" &&
//     formData.phone !== "" &&
//     formData.address !== "" &&
//     formData.city !== "";

//   // ===== شاشة النجاح =====
//   if (submitted) {
//     return (
//       <div
//         className="min-h-screen flex items-center justify-center px-6 py-20"
//         style={{ backgroundColor: "#f8fafc" }}
//       >
//         <div className="max-w-lg w-full text-center">
//           <div
//             className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
//             style={{ backgroundColor: "#e8edf3" }}
//           >
//             <CheckCircle size={48} style={{ color: "#1e3a5f" }} />
//           </div>
//           <h1
//             className="text-3xl font-black mb-4"
//             style={{ color: "#0f1b3d" }}
//           >
//             تم إرسال طلبك بنجاح! 🎉
//           </h1>
//           <p
//             className="text-lg leading-relaxed mb-8"
//             style={{ color: "rgba(30,58,95,0.7)" }}
//           >
//             شكراً <strong>{formData.name}</strong>! تم استلام طلبك وسيتواصل معك
//             فريقنا على الرقم{" "}
//             <strong>{formData.phone}</strong> خلال 30 دقيقة.
//           </p>

//           <div
//             className="rounded-2xl p-6 mb-8 text-right"
//             style={{ backgroundColor: "#e8edf3" }}
//           >
//             <h3
//               className="font-black mb-4"
//               style={{ color: "#0f1b3d" }}
//             >
//               تفاصيل طلبك:
//             </h3>
//             <div className="space-y-2">
//               {[
//                 {
//                   label: "الخدمة",
//                   value: serviceCategories.find(
//                     (s) => s.id === formData.serviceCategory
//                   )?.title,
//                 },
//                 { label: "التخصص",  value: formData.subService },
//                 { label: "المدينة",  value: formData.city },
//                 { label: "الأولوية", value: formData.urgency === "urgent" ? "عاجل 🚨" : formData.urgency === "scheduled" ? "مجدول 📅" : "عادي ⏰" },
//               ].map((item, i) => (
//                 <div key={i} className="flex justify-between text-sm">
//                   <span style={{ color: "rgba(30,58,95,0.6)" }}>{item.label}</span>
//                   <span className="font-bold" style={{ color: "#0f1b3d" }}>{item.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={() => {
//                 setSubmitted(false);
//                 setStep(1);
//                 setFormData({
//                   name: "", phone: "", email: "", address: "",
//                   city: "", serviceCategory: "", subService: "",
//                   description: "", urgency: "normal", images: [],
//                 });
//               }}
//               className="flex-1 font-bold py-3 rounded-2xl border transition-all"
//               style={{
//                 borderColor: "#e8edf3",
//                 color: "#1e3a5f",
//                 backgroundColor: "white",
//               }}
//             >
//               طلب خدمة جديدة
//             </button>
//             <Link
//               href="/"
//               className="flex-1 font-bold py-3 rounded-2xl text-center text-white transition-all hover:scale-105"
//               style={{ backgroundColor: "#1e3a5f" }}
//             >
//               العودة للرئيسية
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>

//       {/* ===== Hero ===== */}
//       <section
//         className="relative py-20 overflow-hidden"
//         style={{
//           background: "linear-gradient(135deg, #0f1b3d 0%, #1e3a5f 55%, #3b6fa0 100%)",
//         }}
//       >
//         <div
//           className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20"
//           style={{ backgroundColor: "#3b6fa0", transform: "translate(30%, -40%)" }}
//         />

//         <div className="relative max-w-7xl mx-auto px-6">
//           {/* Breadcrumb */}
//           <div
//             className="flex items-center gap-2 text-sm mb-8"
//             style={{ color: "rgba(232,237,243,0.5)" }}
//           >
//             <Link href="/" style={{ color: "rgba(232,237,243,0.6)" }}>
//               الرئيسية
//             </Link>
//             <ChevronLeft size={14} />
//             <span style={{ color: "#e8edf3" }}>طلب خدمة</span>
//           </div>

//           <div className="text-center">
//             <div
//               className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 border mb-5"
//               style={{
//                 backgroundColor: "rgba(59,111,160,0.25)",
//                 borderColor: "rgba(59,111,160,0.4)",
//               }}
//             >
//               <Wrench size={15} style={{ color: "#e8edf3" }} />
//               <span className="text-sm font-bold" style={{ color: "#e8edf3" }}>
//                 طلب خدمة سريع
//               </span>
//             </div>
//             <h1
//               className="text-4xl md:text-5xl font-black mb-4"
//               style={{ color: "#ffffff" }}
//             >
//               اطلب خدمتك الآن
//             </h1>
//             <p
//               className="text-lg max-w-xl mx-auto"
//               style={{ color: "rgba(232,237,243,0.7)" }}
//             >
//               أرسل طلبك في دقيقتين وسيتواصل معك فريقنا خلال 30 دقيقة
//             </p>
//           </div>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0">
//           <svg viewBox="0 0 1440 50" fill="none" preserveAspectRatio="none" className="w-full">
//             <path d="M0 50L1440 50L1440 25C1200 0 960 0 720 12C480 25 240 35 0 25Z" fill="#f8fafc" />
//           </svg>
//         </div>
//       </section>

//       {/* ===== الفورم ===== */}
//       <section className="py-16">
//         <div className="max-w-3xl mx-auto px-6">

//           {/* Progress Steps */}
//           <div className="flex items-center justify-center mb-12">
//             {[
//               { n: 1, label: "اختر الخدمة" },
//               { n: 2, label: "بياناتك" },
//               { n: 3, label: "تفاصيل الطلب" },
//             ].map((s, i) => (
//               <div key={s.n} className="flex items-center">
//                 <div className="flex flex-col items-center">
//                   <div
//                     className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all"
//                     style={{
//                       backgroundColor: step >= s.n ? "#1e3a5f" : "#e8edf3",
//                       color: step >= s.n ? "#ffffff" : "#3b6fa0",
//                     }}
//                   >
//                     {step > s.n ? <CheckCircle size={18} /> : s.n}
//                   </div>
//                   <span
//                     className="text-xs font-semibold mt-1.5 whitespace-nowrap"
//                     style={{
//                       color: step >= s.n ? "#1e3a5f" : "rgba(30,58,95,0.4)",
//                     }}
//                   >
//                     {s.label}
//                   </span>
//                 </div>
//                 {i < 2 && (
//                   <div
//                     className="w-20 md:w-32 h-0.5 mx-3 mb-5 transition-all"
//                     style={{
//                       backgroundColor: step > s.n ? "#1e3a5f" : "#e8edf3",
//                     }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>

//           <form onSubmit={handleSubmit}>

//             {/* ===== STEP 1: اختر الخدمة ===== */}
//             {step === 1 && (
//               <div className="space-y-8">
//                 <div
//                   className="bg-white rounded-3xl p-8 border"
//                   style={{ borderColor: "#e8edf3" }}
//                 >
//                   <h2
//                     className="text-2xl font-black mb-2"
//                     style={{ color: "#0f1b3d" }}
//                   >
//                     ما الخدمة التي تحتاجها؟
//                   </h2>
//                   <p
//                     className="text-sm mb-7"
//                     style={{ color: "rgba(30,58,95,0.6)" }}
//                   >
//                     اختر نوع الخدمة المطلوبة
//                   </p>

//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                     {serviceCategories.map((cat) => {
//                       const Icon = cat.icon;
//                       const isSelected = formData.serviceCategory === cat.id;
//                       return (
//                         <button
//                           key={cat.id}
//                           type="button"
//                           onClick={() => handleCategorySelect(cat.id)}
//                           className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all hover:-translate-y-0.5 text-center"
//                           style={{
//                             backgroundColor: isSelected ? "#1e3a5f" : "white",
//                             borderColor: isSelected ? "#1e3a5f" : "#e8edf3",
//                           }}
//                         >
//                           <div
//                             className="w-12 h-12 rounded-xl flex items-center justify-center"
//                             style={{
//                               backgroundColor: isSelected
//                                 ? "rgba(232,237,243,0.2)"
//                                 : "#e8edf3",
//                             }}
//                           >
//                             <Icon
//                               size={24}
//                               style={{ color: isSelected ? "#e8edf3" : "#1e3a5f" }}
//                             />
//                           </div>
//                           <div>
//                             <div
//                               className="font-bold text-sm"
//                               style={{ color: isSelected ? "#ffffff" : "#0f1b3d" }}
//                             >
//                               {cat.title}
//                             </div>
//                             <div
//                               className="text-xs mt-0.5"
//                               style={{
//                                 color: isSelected
//                                   ? "rgba(232,237,243,0.7)"
//                                   : "rgba(30,58,95,0.5)",
//                               }}
//                             >
//                               {cat.desc}
//                             </div>
//                           </div>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* الخدمة الفرعية */}
//                 {formData.serviceCategory && (
//                   <div
//                     className="bg-white rounded-3xl p-8 border"
//                     style={{ borderColor: "#e8edf3" }}
//                   >
//                     <h3
//                       className="text-xl font-black mb-5"
//                       style={{ color: "#0f1b3d" }}
//                     >
//                       حدد نوع العمل
//                     </h3>
//                     <div className="grid grid-cols-2 gap-3">
//                       {subServices[formData.serviceCategory]?.map((sub) => {
//                         const isSelected = formData.subService === sub;
//                         return (
//                           <button
//                             key={sub}
//                             type="button"
//                             onClick={() =>
//                               setFormData({ ...formData, subService: sub })
//                             }
//                             className="flex items-center gap-3 p-4 rounded-xl border-2 text-right transition-all"
//                             style={{
//                               backgroundColor: isSelected ? "#e8edf3" : "white",
//                               borderColor: isSelected ? "#1e3a5f" : "#e8edf3",
//                             }}
//                           >
//                             <div
//                               className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
//                               style={{
//                                 borderColor: isSelected ? "#1e3a5f" : "#e8edf3",
//                                 backgroundColor: isSelected ? "#1e3a5f" : "white",
//                               }}
//                             >
//                               {isSelected && (
//                                 <div
//                                   className="w-2 h-2 rounded-full"
//                                   style={{ backgroundColor: "white" }}
//                                 />
//                               )}
//                             </div>
//                             <span
//                               className="text-sm font-semibold"
//                               style={{ color: isSelected ? "#0f1b3d" : "rgba(30,58,95,0.7)" }}
//                             >
//                               {sub}
//                             </span>
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 <button
//                   type="button"
//                   onClick={() => setStep(2)}
//                   disabled={!isStep1Valid}
//                   className="w-full font-bold py-4 rounded-2xl transition-all text-white text-lg"
//                   style={{
//                     backgroundColor: isStep1Valid ? "#1e3a5f" : "#e8edf3",
//                     color: isStep1Valid ? "white" : "rgba(30,58,95,0.4)",
//                     cursor: isStep1Valid ? "pointer" : "not-allowed",
//                   }}
//                 >
//                   التالي — بياناتك
//                 </button>
//               </div>
//             )}

//             {/* ===== STEP 2: البيانات الشخصية ===== */}
//             {step === 2 && (
//               <div className="space-y-6">
//                 <div
//                   className="bg-white rounded-3xl p-8 border"
//                   style={{ borderColor: "#e8edf3" }}
//                 >
//                   <h2
//                     className="text-2xl font-black mb-2"
//                     style={{ color: "#0f1b3d" }}
//                   >
//                     بياناتك الشخصية
//                   </h2>
//                   <p
//                     className="text-sm mb-7"
//                     style={{ color: "rgba(30,58,95,0.6)" }}
//                   >
//                     حتى نتمكن من التواصل معك وإرسال الفني
//                   </p>

//                   <div className="space-y-5">
//                     {/* الاسم */}
//                     <div>
//                       <label
//                         className="block text-sm font-bold mb-2"
//                         style={{ color: "#1e3a5f" }}
//                       >
//                         <User size={14} className="inline ml-1" />
//                         الاسم الكامل *
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.name}
//                         onChange={(e) =>
//                           setFormData({ ...formData, name: e.target.value })
//                         }
//                         placeholder="أدخل اسمك الكامل"
//                         className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all"
//                         style={{
//                           borderColor: "#e8edf3",
//                           backgroundColor: "#f8fafc",
//                           color: "#0f1b3d",
//                         }}
//                         onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
//                         onBlur={e => (e.target.style.borderColor = "#e8edf3")}
//                         required
//                       />
//                     </div>

//                     {/* الهاتف */}
//                     <div>
//                       <label
//                         className="block text-sm font-bold mb-2"
//                         style={{ color: "#1e3a5f" }}
//                       >
//                         <Phone size={14} className="inline ml-1" />
//                         رقم الهاتف *
//                       </label>
//                       <input
//                         type="tel"
//                         value={formData.phone}
//                         onChange={(e) =>
//                           setFormData({ ...formData, phone: e.target.value })
//                         }
//                         placeholder="01XXXXXXXXX"
//                         className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all"
//                         style={{
//                           borderColor: "#e8edf3",
//                           backgroundColor: "#f8fafc",
//                           color: "#0f1b3d",
//                         }}
//                         onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
//                         onBlur={e => (e.target.style.borderColor = "#e8edf3")}
//                         required
//                       />
//                     </div>

//                     {/* البريد */}
//                     <div>
//                       <label
//                         className="block text-sm font-bold mb-2"
//                         style={{ color: "#1e3a5f" }}
//                       >
//                         <Mail size={14} className="inline ml-1" />
//                         البريد الإلكتروني (اختياري)
//                       </label>
//                       <input
//                         type="email"
//                         value={formData.email}
//                         onChange={(e) =>
//                           setFormData({ ...formData, email: e.target.value })
//                         }
//                         placeholder="example@email.com"
//                         className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all"
//                         style={{
//                           borderColor: "#e8edf3",
//                           backgroundColor: "#f8fafc",
//                           color: "#0f1b3d",
//                         }}
//                         onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
//                         onBlur={e => (e.target.style.borderColor = "#e8edf3")}
//                       />
//                     </div>

//                     {/* المدينة */}
//                     <div>
//                       <label
//                         className="block text-sm font-bold mb-2"
//                         style={{ color: "#1e3a5f" }}
//                       >
//                         <MapPin size={14} className="inline ml-1" />
//                         المدينة *
//                       </label>
//                       <select
//                         value={formData.city}
//                         onChange={(e) =>
//                           setFormData({ ...formData, city: e.target.value })
//                         }
//                         className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all"
//                         style={{
//                           borderColor: "#e8edf3",
//                           backgroundColor: "#f8fafc",
//                           color: formData.city ? "#0f1b3d" : "rgba(30,58,95,0.4)",
//                         }}
//                         onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
//                         onBlur={e => (e.target.style.borderColor = "#e8edf3")}
//                         required
//                       >
//                         <option value="">اختر المدينة</option>
//                         <option value="المنيا">المنيا</option>
//                         <option value="القاهرة">القاهرة</option>
//                         <option value="الجيزة">الجيزة</option>
//                         <option value="أخرى">أخرى</option>
//                       </select>
//                     </div>

//                     {/* العنوان */}
//                     <div>
//                       <label
//                         className="block text-sm font-bold mb-2"
//                         style={{ color: "#1e3a5f" }}
//                       >
//                         <MapPin size={14} className="inline ml-1" />
//                         العنوان التفصيلي *
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.address}
//                         onChange={(e) =>
//                           setFormData({ ...formData, address: e.target.value })
//                         }
//                         placeholder="الحي، الشارع، رقم المبنى"
//                         className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all"
//                         style={{
//                           borderColor: "#e8edf3",
//                           backgroundColor: "#f8fafc",
//                           color: "#0f1b3d",
//                         }}
//                         onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
//                         onBlur={e => (e.target.style.borderColor = "#e8edf3")}
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex gap-3">
//                   <button
//                     type="button"
//                     onClick={() => setStep(1)}
//                     className="flex-1 font-bold py-4 rounded-2xl border transition-all"
//                     style={{
//                       borderColor: "#e8edf3",
//                       color: "#1e3a5f",
//                       backgroundColor: "white",
//                     }}
//                   >
//                     السابق
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setStep(3)}
//                     disabled={!isStep2Valid}
//                     className="flex-1 font-bold py-4 rounded-2xl transition-all text-white"
//                     style={{
//                       backgroundColor: isStep2Valid ? "#1e3a5f" : "#e8edf3",
//                       color: isStep2Valid ? "white" : "rgba(30,58,95,0.4)",
//                       cursor: isStep2Valid ? "pointer" : "not-allowed",
//                     }}
//                   >
//                     التالي — تفاصيل الطلب
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* ===== STEP 3: تفاصيل الطلب ===== */}
//             {step === 3 && (
//               <div className="space-y-6">
//                 <div
//                   className="bg-white rounded-3xl p-8 border"
//                   style={{ borderColor: "#e8edf3" }}
//                 >
//                   <h2
//                     className="text-2xl font-black mb-2"
//                     style={{ color: "#0f1b3d" }}
//                   >
//                     تفاصيل الطلب
//                   </h2>
//                   <p
//                     className="text-sm mb-7"
//                     style={{ color: "rgba(30,58,95,0.6)" }}
//                   >
//                     أخبرنا أكثر عن المشكلة أو الخدمة المطلوبة
//                   </p>

//                   <div className="space-y-6">
//                     {/* الأولوية */}
//                     <div>
//                       <label
//                         className="block text-sm font-bold mb-3"
//                         style={{ color: "#1e3a5f" }}
//                       >
//                         مستوى الأولوية
//                       </label>
//                       <div className="grid grid-cols-3 gap-3">
//                         {[
//                           { id: "urgent",    label: "عاجل",   icon: "🚨", desc: "خلال ساعات" },
//                           { id: "normal",    label: "عادي",   icon: "⏰", desc: "خلال يوم" },
//                           { id: "scheduled", label: "مجدول",  icon: "📅", desc: "تحديد موعد" },
//                         ].map((opt) => {
//                           const isSelected = formData.urgency === opt.id;
//                           return (
//                             <button
//                               key={opt.id}
//                               type="button"
//                               onClick={() =>
//                                 setFormData({ ...formData, urgency: opt.id })
//                               }
//                               className="flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all text-center"
//                               style={{
//                                 backgroundColor: isSelected ? "#e8edf3" : "white",
//                                 borderColor: isSelected ? "#1e3a5f" : "#e8edf3",
//                               }}
//                             >
//                               <span className="text-2xl">{opt.icon}</span>
//                               <span
//                                 className="font-bold text-sm"
//                                 style={{ color: "#0f1b3d" }}
//                               >
//                                 {opt.label}
//                               </span>
//                               <span
//                                 className="text-xs"
//                                 style={{ color: "rgba(30,58,95,0.5)" }}
//                               >
//                                 {opt.desc}
//                               </span>
//                             </button>
//                           );
//                         })}
//                       </div>
//                     </div>

//                     {/* وصف المشكلة */}
//                     <div>
//                       <label
//                         className="block text-sm font-bold mb-2"
//                         style={{ color: "#1e3a5f" }}
//                       >
//                         <FileText size={14} className="inline ml-1" />
//                         وصف المشكلة أو الطلب *
//                       </label>
//                       <textarea
//                         value={formData.description}
//                         onChange={(e) =>
//                           setFormData({ ...formData, description: e.target.value })
//                         }
//                         placeholder="اشرح المشكلة بالتفصيل... مثلاً: انقطع التيار الكهربائي في غرفة النوم منذ أمس"
//                         rows={5}
//                         className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all resize-none"
//                         style={{
//                           borderColor: "#e8edf3",
//                           backgroundColor: "#f8fafc",
//                           color: "#0f1b3d",
//                         }}
//                         onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
//                         onBlur={e => (e.target.style.borderColor = "#e8edf3")}
//                         required
//                       />
//                     </div>

//                     {/* رفع الصور */}
//                     <div>
//                       <label
//                         className="block text-sm font-bold mb-2"
//                         style={{ color: "#1e3a5f" }}
//                       >
//                         <Upload size={14} className="inline ml-1" />
//                         صور المشكلة (اختياري - حتى 5 صور)
//                       </label>

//                       {/* منطقة الرفع */}
//                       <label
//                         className="flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed cursor-pointer transition-all"
//                         style={{
//                           borderColor: "#e8edf3",
//                           backgroundColor: "#f8fafc",
//                         }}
//                         onMouseEnter={e => {
//                           (e.currentTarget as HTMLElement).style.borderColor = "#3b6fa0";
//                           (e.currentTarget as HTMLElement).style.backgroundColor = "#e8edf3";
//                         }}
//                         onMouseLeave={e => {
//                           (e.currentTarget as HTMLElement).style.borderColor = "#e8edf3";
//                           (e.currentTarget as HTMLElement).style.backgroundColor = "#f8fafc";
//                         }}
//                       >
//                         <Upload size={28} style={{ color: "#3b6fa0", marginBottom: "8px" }} />
//                         <span className="text-sm font-semibold" style={{ color: "#1e3a5f" }}>
//                           اضغط لرفع الصور
//                         </span>
//                         <span className="text-xs mt-1" style={{ color: "rgba(30,58,95,0.5)" }}>
//                           PNG, JPG حتى 10MB
//                         </span>
//                         <input
//                           type="file"
//                           accept="image/*"
//                           multiple
//                           onChange={handleImageUpload}
//                           className="hidden"
//                         />
//                       </label>

//                       {/* معاينة الصور */}
//                       {formData.images.length > 0 && (
//                         <div className="flex flex-wrap gap-3 mt-4">
//                           {formData.images.map((file, index) => (
//                             <div
//                               key={index}
//                               className="relative w-20 h-20 rounded-xl overflow-hidden border"
//                               style={{ borderColor: "#e8edf3" }}
//                             >
//                               <img
//                                 src={URL.createObjectURL(file)}
//                                 alt={`صورة ${index + 1}`}
//                                 className="w-full h-full object-cover"
//                               />
//                               <button
//                                 type="button"
//                                 onClick={() => removeImage(index)}
//                                 className="absolute top-1 left-1 w-5 h-5 rounded-full flex items-center justify-center text-white"
//                                 style={{ backgroundColor: "#0f1b3d" }}
//                               >
//                                 <X size={10} />
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* ملخص الطلب */}
//                 <div
//                   className="bg-white rounded-3xl p-6 border"
//                   style={{ borderColor: "#e8edf3" }}
//                 >
//                   <h3
//                     className="font-black mb-4"
//                     style={{ color: "#0f1b3d" }}
//                   >
//                     ملخص طلبك
//                   </h3>
//                   <div className="space-y-3">
//                     {[
//                       {
//                         label: "الخدمة",
//                         value: serviceCategories.find(
//                           (s) => s.id === formData.serviceCategory
//                         )?.title,
//                       },
//                       { label: "التخصص", value: formData.subService },
//                       { label: "الاسم",   value: formData.name },
//                       { label: "الهاتف",  value: formData.phone },
//                       { label: "المدينة", value: formData.city },
//                     ].map((item, i) => (
//                       <div
//                         key={i}
//                         className="flex justify-between text-sm py-2 border-b"
//                         style={{ borderColor: "#f8fafc" }}
//                       >
//                         <span style={{ color: "rgba(30,58,95,0.6)" }}>{item.label}</span>
//                         <span className="font-bold" style={{ color: "#0f1b3d" }}>
//                           {item.value || "—"}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="flex gap-3">
//                   <button
//                     type="button"
//                     onClick={() => setStep(2)}
//                     className="flex-1 font-bold py-4 rounded-2xl border transition-all"
//                     style={{
//                       borderColor: "#e8edf3",
//                       color: "#1e3a5f",
//                       backgroundColor: "white",
//                     }}
//                   >
//                     السابق
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={!formData.description}
//                     className="flex-1 font-bold py-4 rounded-2xl transition-all hover:scale-105 text-white flex items-center justify-center gap-2"
//                     style={{
//                       backgroundColor: formData.description ? "#1e3a5f" : "#e8edf3",
//                       color: formData.description ? "white" : "rgba(30,58,95,0.4)",
//                       cursor: formData.description ? "pointer" : "not-allowed",
//                     }}
//                   >
//                     <Send size={18} />
//                     إرسال الطلب
//                   </button>
//                 </div>
//               </div>
//             )}
//           </form>

//           {/* معلومات التواصل */}
//           <div
//             className="mt-10 grid sm:grid-cols-3 gap-4"
//           >
//             {[
//               { icon: Phone,   label: "اتصل بنا",   value: "+20 10 2568 6280", href: "tel:+201025686280" },
//               { icon: Mail,    label: "راسلنا",      value: "alhadigroup1998@gmail.com", href: "mailto:alhadigroup1998@gmail.com" },
//               { icon: MapPin,  label: "فروعنا",      value: "المنيا • القاهرة", href: "#" },
//             ].map(({ icon: Icon, label, value, href }, i) => (
//               <a
//                 key={i}
//                 href={href}
//                 className="flex items-center gap-3 p-4 rounded-2xl border text-center justify-center transition-all hover:shadow-md"
//                 style={{
//                   backgroundColor: "white",
//                   borderColor: "#e8edf3",
//                 }}
//               >
//                 <div
//                   className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
//                   style={{ backgroundColor: "#e8edf3" }}
//                 >
//                   <Icon size={18} style={{ color: "#1e3a5f" }} />
//                 </div>
//                 <div className="text-right">
//                   <div className="text-xs" style={{ color: "rgba(30,58,95,0.5)" }}>{label}</div>
//                   <div className="text-sm font-bold" style={{ color: "#0f1b3d" }}>{value}</div>
//                 </div>
//               </a>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }