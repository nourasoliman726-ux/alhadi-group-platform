"use client";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import Link from "next/link";
import {
  Wrench, User, Phone, MapPin, FileText,
  Upload, CheckCircle, ChevronLeft, Send,
  Zap, HardHat, Building2, Camera, Network,
  Navigation, Loader2
} from "lucide-react";

const services = [
  { id: "electrical", label: "صيانة كهرباء", icon: Zap },
  { id: "cameras", label: "كاميرات مراقبة", icon: Camera },
  { id: "data", label: "اتصالات وData", icon: Network },
  { id: "contracting", label: "مقاولات عامة", icon: HardHat },
  { id: "real-estate", label: "تطوير عقاري", icon: Building2 },
  { id: "maintenance", label: "صيانة عامة", icon: Wrench },
];

const cities = [
  "الإسكندرية",
  "الإسماعيلية",
  "أسوان",
  "أسيوط",
  "الأقصر",
  "البحر الأحمر",
  "البحيرة",
  "الجيزة",
  "الدقهلية",
  "دمياط",

  "سوهاج",
  "السويس",
  "الشرقية",
  "شمال سيناء",
  "الغربية",
  "الفيوم",
  "القاهرة",
  "القليوبية",
  "قنا",
  "كفر الشيخ",
  "مطروح",
  "المنوفية",
  "المنيا",
  "الوادي الجديد",
  "بني سويف",
  "بورسعيد",
  "جنوب سيناء",
  "أخرى"
];

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
        const googleMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;

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
    
    if (!formData.serviceType) {
      alert("الرجاء اختيار نوع الخدمة المطلوبة أولاً.");
      return;
    }

    setLoading(true);

    try {
      // تركيب الإحداثيات إذا وُجدت
      const coordsString = formData.latitude && formData.longitude 
        ? `${formData.latitude},${formData.longitude}` 
        : null;

      // تجهيز الكائن الذي سيتم إرساله للـ Database
      const insertData: any = {
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_address: formData.address,
        customer_city: formData.city,
        service_category: formData.serviceType, 
        description: formData.description,
        status: 'pending',
      };

      // إضافة الحقول الاختيارية فقط إذا كانت تحتوي على قيم لتجنب أخطاء الـ Schema
      if (formData.locationLink) {
        insertData.location_link = formData.locationLink;
      }
      if (coordsString) {
        insertData.location_coords = coordsString;
      }

      // 1. إدخال الطلب في قاعدة البيانات
      const { data: request, error: requestError } = await supabase
        .from('service_requests')
        .insert([insertData])
        .select()
        .single();

      // إذا حدث خطأ أثناء إدخال البيانات في الجدول، سيتم الإمساك به هنا فوراً
      if (requestError) {
        throw new Error(`[خطأ في الجدول]: ${requestError.message} (${requestError.details || 'لا توجد تفاصيل إضافية'})`);
      }

      // 2. رفع الصور من مصفوفة الـ images المنفصلة
      if (images.length > 0 && request) {
        for (const image of images) {
          const fileExtension = image.name.split('.').pop();
          const fileName = `${request.id}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;
          
          const { error: uploadError } = await supabase.storage
            .from('service-images')
            .upload(fileName, image);

          if (uploadError) {
            throw new Error(`[خطأ في رفع الصورة]: ${uploadError.message}`);
          }

          // جلب رابط الصورة العام بعد الرفع بنجاح
          const { data: urlData } = supabase.storage
            .from('service-images')
            .getPublicUrl(fileName);

          const { error: imgTableError } = await supabase.from('request_images').insert([
            {
              request_id: request.id,
              image_url: urlData.publicUrl,
            },
          ]);

          if (imgTableError) {
            throw new Error(`[خطأ في جدول الصور]: ${imgTableError.message}`);
          }
        }
      }

      setSuccess(true);
    } catch (error: any) {
      console.error('Error submitting request:', error);
      // هنا قمنا بتعديل الـ Alert ليخبرك بالسبب الحقيقي والعمود المسبب للمشكلة فوراً!
      alert(error.message || 'حدث خطأ غير متوقع في إرسال الطلب. الرجاء المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   if (!formData.serviceType) {
  //     alert("الرجاء اختيار نوع الخدمة المطلوبة أولاً.");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     // تركيب الإحداثيات إذا وُجدت
  //     const coordsString = formData.latitude && formData.longitude 
  //       ? `${formData.latitude},${formData.longitude}` 
  //       : null;

  //     // 1. إدخال الطلب في قاعدة البيانات ومطابقة الأسماء الصحيحة للجدول
  //     const { data: request, error: requestError } = await supabase
  //       .from('service_requests')
  //       .insert([
  //         {
  //           customer_name: formData.name,
  //           customer_phone: formData.phone,
  //           customer_address: formData.address,
  //           customer_city: formData.city,
  //           service_category: formData.serviceType, // تم التعديل لتطابق الـ State
  //           sub_service: formData.serviceType,      // القيمة الافتراضية للفرعي
  //           description: formData.description,
  //           urgency: 'normal',
  //           location_link: formData.locationLink || null,
  //           location_coords: coordsString,
  //           status: 'pending',
  //         },
  //       ])
  //       .select()
  //       .single();

  //     if (requestError) throw requestError;

  //     // 2. رفع الصور من مصفوفة الـ images المنفصلة
  //     if (images.length > 0 && request) {
  //       for (const image of images) {
  //         const fileExtension = image.name.split('.').pop();
  //         const fileName = `${request.id}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;
          
  //         const { error: uploadError } = await supabase.storage
  //           .from('service-images')
  //           .upload(fileName, image);

  //         if (!uploadError) {
  //           // جلب رابط الصورة العام بعد الرفع بنجاح
  //           const { data: urlData } = supabase.storage
  //             .from('service-images')
  //             .getPublicUrl(fileName);

  //           await supabase.from('request_images').insert([
  //             {
  //               request_id: request.id,
  //               image_url: urlData.publicUrl,
  //             },
  //           ]);
  //         } else {
  //           console.error('تنبيّه: فشل رفع إحدى الصور:', uploadError);
  //         }
  //       }
  //     }

  //     setSuccess(true);
  //   } catch (error) {
  //     console.error('Error submitting request:', error);
  //     alert('حدث خطأ في إرسال الطلب. الرجاء المحاولة مرة أخرى.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

          {/* ===== 🎉 رسالة النجاح ===== */}
          {success ? (
            <div
              className="bg-white rounded-3xl border p-12 md:p-16 text-center"
              style={{ borderColor: "#10b981" }}
            >
              <div
                className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce"
                style={{ backgroundColor: "rgba(16,185,129,0.15)" }}
              >
                <CheckCircle size={48} style={{ color: "#10b981" }} />
              </div>

              <h2
                className="text-3xl md:text-4xl font-black mb-4"
                style={{ color: "#065f46" }}
              >
                🎉 تم إرسال طلبك بنجاح!
              </h2>

              <p
                className="text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
                style={{ color: "#047857" }}
              >
                شكراً لك! سيتواصل معك فريقنا خلال <strong>30 دقيقة</strong> لتحديد موعد الزيارة.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={resetForm}
                  className="flex items-center gap-3 font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105 text-white"
                  style={{ backgroundColor: "#1e3a5f" }}
                >
                  <Wrench size={20} />
                  اطلب خدمة مرة أخرى
                </button>

                <Link
                  href="/"
                  className="flex items-center gap-3 font-bold px-8 py-4 rounded-2xl border transition-all"
                  style={{ borderColor: "#10b981", color: "#065f46" }}
                >
                  <ChevronLeft size={20} />
                  العودة للرئيسية
                </Link>
              </div>
            </div>
          ) : (
            /* ===== النموذج الكلي ===== */
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
                        backgroundColor: formData.locationLink ? "rgba(16,185,129,0.1)" : "white",
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
                          onClick={() => setFormData({ ...formData, serviceType: service.id })}
                          className="p-4 rounded-2xl border transition-all text-right"
                          style={{
                            borderColor: isSelected ? "#3b6fa0" : "#e8edf3",
                            backgroundColor: isSelected ? "rgba(59,111,160,0.08)" : "white",
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
                              className="absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center text-white bg-red-500 bg-opacity-90 transition-opacity"
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
        </div>
      </section>
    </div>
  );
};