"use client";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import Link from "next/link";
import {
  Wrench, User, Phone, MapPin, FileText,
  Upload, CheckCircle, ChevronLeft, Send,
  Zap, HardHat, Building2, Camera, Network,
  Navigation, Loader2, Clock, AlertCircle, Home
} from "lucide-react";

const services = [
  { id: "electrical", label: "صيانة كهرباء", icon: Zap },
  { id: "cameras", label: "كاميرات مراقبة", icon: Camera },
  { id: "data", label: "اتصالات وData", icon: Network },
  { id: "contracting", label: "مقاولات عامة", icon: HardHat },
  { id: "real-estate", label: "تطوير عقاري", icon: Building2 },
  { id: "maintenance", label: "صيانة عامة", icon: Wrench },
];

const urgencyLevels = [
  { id: "normal", label: "عادي", icon: "⏰", color: "#3b6fa0" },
  { id: "urgent", label: "عاجل", icon: "⚡", color: "#f59e0b" },
  { id: "emergency", label: "طارئ", icon: "🚨", color: "#ef4444" },
];

const cities = [
  "الإسكندرية", "الإسماعيلية", "أسوان", "أسيوط", "الأقصر",
  "البحر الأحمر", "البحيرة", "الجيزة", "الدقهلية", "دمياط",
  "سوهاج", "السويس", "الشرقية", "شمال سيناء", "الغربية",
  "الفيوم", "القاهرة", "القليوبية", "قنا", "كفر الشيخ",
  "مطروح", "المنوفية", "المنيا", "الوادي الجديد",
  "بني سويف", "بورسعيد", "جنوب سيناء", "أخرى"
];

export default function RequestServicePage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    serviceType: "",
    urgency: "normal",
    description: "",
    latitude: "",
    longitude: "",
    locationLink: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [requestId, setRequestId] = useState<string>("");
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
      if (images.length + files.length > 5) {
        alert("يمكنك رفع 5 صور كحد أقصى");
        return;
      }
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
      urgency: "normal",
      description: "",
      latitude: "",
      longitude: "",
      locationLink: "",
    });
    setImages([]);
    setSuccess(false);
    setRequestId("");
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
      const coordsString = formData.latitude && formData.longitude 
        ? `${formData.latitude},${formData.longitude}` 
        : null;

      const insertData: any = {
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_address: formData.address,
        customer_city: formData.city,
        service_category: formData.serviceType,
        sub_service: formData.serviceType, // نفس القيمة كافتراضي
        urgency: formData.urgency,
        description: formData.description,
        status: 'pending',
      };

      if (formData.locationLink) {
        insertData.location_link = formData.locationLink;
      }
      if (coordsString) {
        insertData.location_coords = coordsString;
      }

      const { data: request, error: requestError } = await supabase
        .from('service_requests')
        .insert([insertData])
        .select()
        .single();

      if (requestError) {
        throw new Error(`خطأ في إرسال الطلب: ${requestError.message}`);
      }

      // رفع الصور
      if (images.length > 0 && request) {
        for (const image of images) {
          const fileExtension = image.name.split('.').pop();
          const fileName = `${request.id}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;
          
          const { error: uploadError } = await supabase.storage
            .from('service-images')
            .upload(fileName, image);

          if (uploadError) {
            console.warn('تحذير: فشل رفع إحدى الصور');
            continue;
          }

          const { data: urlData } = supabase.storage
            .from('service-images')
            .getPublicUrl(fileName);

          await supabase.from('request_images').insert([
            {
              request_id: request.id,
              image_url: urlData.publicUrl,
            },
          ]);
        }
      }

      setRequestId(request.id);
      setSuccess(true);
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error: any) {
      console.error('Error submitting request:', error);
      alert(error.message || 'حدث خطأ في إرسال الطلب. الرجاء المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
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

          {/* ===== 🎉 رسالة النجاح المحسّنة ===== */}
          {success ? (
            <div className="space-y-6">
              {/* Success Card */}
              <div
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl border-2 p-8 md:p-12 text-center relative overflow-hidden"
                style={{ borderColor: "#10b981" }}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <CheckCircle size={128} style={{ color: "#10b981" }} />
                </div>

                <div
                  className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center relative z-10"
                  style={{ backgroundColor: "#10b981" }}
                >
                  <CheckCircle size={40} className="text-white animate-bounce" />
                </div>

                <h2
                  className="text-3xl md:text-4xl font-black mb-3 relative z-10"
                  style={{ color: "#065f46" }}
                >
                  تم إرسال طلبك بنجاح! 🎉
                </h2>

                <p
                  className="text-lg leading-relaxed mb-6 max-w-2xl mx-auto relative z-10"
                  style={{ color: "#047857" }}
                >
                  شكراً لثقتك بنا! تم استلام طلبك وسيتواصل معك فريقنا المتخصص
                  <strong className="font-black"> خلال 30 دقيقة </strong>
                  لتحديد موعد الزيارة.
                </p>

                {/* Request Details */}
                <div
                  className="bg-white rounded-2xl p-6 mb-6 text-right max-w-md mx-auto relative z-10"
                  style={{ border: "2px solid #10b981" }}
                >
                  <h3 className="font-bold mb-4 text-center" style={{ color: "#065f46" }}>
                    📋 تفاصيل طلبك
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span style={{ color: "#047857" }}>رقم الطلب:</span>
                      <span className="font-mono font-bold" style={{ color: "#065f46" }}>
                        #{requestId.slice(0, 8)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: "#047857" }}>نوع الخدمة:</span>
                      <span className="font-bold" style={{ color: "#065f46" }}>
                        {services.find(s => s.id === formData.serviceType)?.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: "#047857" }}>الأولوية:</span>
                      <span className="font-bold" style={{ color: "#065f46" }}>
                        {urgencyLevels.find(u => u.id === formData.urgency)?.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: "#047857" }}>رقم التواصل:</span>
                      <span className="font-bold" dir="ltr" style={{ color: "#065f46" }}>
                        {formData.phone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info Boxes */}
                <div className="grid md:grid-cols-2 gap-4 mb-8 relative z-10">
                  <div
                    className="bg-white rounded-xl p-4 border-2"
                    style={{ borderColor: "#10b981" }}
                  >
                    <Clock size={24} className="mx-auto mb-2" style={{ color: "#059669" }} />
                    <p className="font-bold text-sm" style={{ color: "#065f46" }}>
                      وقت الاستجابة المتوقع
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#047857" }}>
                      خلال 30 دقيقة من الآن
                    </p>
                  </div>

                  <div
                    className="bg-white rounded-xl p-4 border-2"
                    style={{ borderColor: "#10b981" }}
                  >
                    <Phone size={24} className="mx-auto mb-2" style={{ color: "#059669" }} />
                    <p className="font-bold text-sm" style={{ color: "#065f46" }}>
                      طريقة التواصل
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#047857" }}>
                      مكالمة هاتفية مباشرة
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
                  <button
                    onClick={resetForm}
                    className="flex items-center gap-3 font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105 text-white shadow-lg"
                    style={{ backgroundColor: "#1e3a5f" }}
                  >
                    <Wrench size={20} />
                    طلب خدمة جديدة
                  </button>

                  <Link
                    href="/"
                    className="flex items-center gap-3 font-bold px-8 py-4 rounded-2xl border-2 transition-all hover:scale-105 bg-white shadow-md"
                    style={{ borderColor: "#10b981", color: "#065f46" }}
                  >
                    <Home size={20} />
                    العودة للرئيسية
                  </Link>
                </div>
              </div>

              {/* Additional Info */}
              <div
                className="bg-blue-50 rounded-2xl p-6 border text-right"
                style={{ borderColor: "#3b6fa0" }}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle size={24} className="flex-shrink-0 mt-1" style={{ color: "#3b6fa0" }} />
                  <div>
                    <h4 className="font-bold mb-2" style={{ color: "#1e3a5f" }}>
                      ماذا بعد؟
                    </h4>
                    <ul className="text-sm space-y-2" style={{ color: "#1e3a5f" }}>
                      <li className="flex items-start gap-2">
                        <span className="text-lg">1️⃣</span>
                        <span>سيتصل بك أحد ممثلي خدمة العملاء خلال 30 دقيقة</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-lg">2️⃣</span>
                        <span>سيتم تحديد موعد الزيارة بما يناسبك</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-lg">3️⃣</span>
                        <span>سيصلك فني متخصص في الموعد المحدد</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ===== النموذج الكلي ===== */
            <div
              className="bg-white rounded-3xl border p-8 md:p-10 shadow-lg"
              style={{ borderColor: "#e8edf3" }}
            >
              <form onSubmit={handleSubmit}>

                {/* ===== الخطوة 1: البيانات الشخصية ===== */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white shadow-md"
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
                        className="w-full px-4 py-3 rounded-xl border-2 transition-all outline-none focus:border-[#3b6fa0]"
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
                        className="w-full px-4 py-3 rounded-xl border-2 transition-all outline-none focus:border-[#3b6fa0]"
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
                        className="w-full px-4 py-3 rounded-xl border-2 transition-all outline-none focus:border-[#3b6fa0]"
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
                        className="w-full px-4 py-3 rounded-xl border-2 transition-all outline-none focus:border-[#3b6fa0]"
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
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all font-bold hover:scale-[1.02]"
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
                            className="text-xs underline mr-2 hover:text-[#047857]"
                            style={{ color: "#059669" }}
                          >
                            عرض على الخريطة
                          </a>
                        </>
                      ) : (
                        <>
                          <Navigation size={20} />
                          حدد موقعي الحالي (اختياري)
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
                      <p className="text-xs mt-2 text-center flex items-center justify-center gap-2" style={{ color: "#ef4444" }}>
                        <AlertCircle size={14} />
                        {locationError}
                      </p>
                    )}
                  </div>
                </div>

                {/* ===== الخطوة 2: نوع الخدمة ===== */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white shadow-md"
                      style={{ backgroundColor: "#1e3a5f" }}
                    >
                      2
                    </div>
                    <h2 className="text-2xl font-black" style={{ color: "#0f1b3d" }}>
                      نوع الخدمة والأولوية
                    </h2>
                  </div>

                  {/* نوع الخدمة */}
                  <div className="mb-6">
                    <label className="block font-bold mb-3 text-sm" style={{ color: "#1e3a5f" }}>
                      اختر نوع الخدمة *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {services.map((service) => {
                        const Icon = service.icon;
                        const isSelected = formData.serviceType === service.id;
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, serviceType: service.id })}
                            className="p-4 rounded-2xl border-2 transition-all text-right hover:scale-105"
                            style={{
                              borderColor: isSelected ? "#3b6fa0" : "#e8edf3",
                              backgroundColor: isSelected ? "rgba(59,111,160,0.1)" : "white",
                            }}
                          >
                            <Icon
                              size={28}
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

                  {/* مستوى الأولوية */}
                  <div>
                    <label className="block font-bold mb-3 text-sm" style={{ color: "#1e3a5f" }}>
                      مستوى الأولوية *
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {urgencyLevels.map((level) => {
                        const isSelected = formData.urgency === level.id;
                        return (
                          <button
                            key={level.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, urgency: level.id })}
                            className="p-4 rounded-2xl border-2 transition-all hover:scale-105"
                            style={{
                              borderColor: isSelected ? level.color : "#e8edf3",
                              backgroundColor: isSelected ? `${level.color}15` : "white",
                            }}
                          >
                            <div className="text-2xl mb-2">{level.icon}</div>
                            <div
                              className="font-bold text-sm"
                              style={{ color: isSelected ? level.color : "#1e3a5f" }}
                            >
                              {level.label}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* ===== الخطوة 3: وصف المشكلة ===== */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white shadow-md"
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
                      className="w-full px-4 py-3 rounded-xl border-2 transition-all outline-none resize-none focus:border-[#3b6fa0]"
                      style={{ borderColor: "#e8edf3", color: "#0f1b3d" }}
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-2 text-sm" style={{ color: "#1e3a5f" }}>
                      <Upload size={16} className="inline ml-2" />
                      إرفاق صور (اختياري - حتى 5 صور)
                    </label>
                    <div
                      className="border-2 border-dashed rounded-2xl p-8 text-center transition-all hover:border-[#3b6fa0] hover:bg-[#f8fafc] cursor-pointer"
                      style={{ borderColor: "#e8edf3" }}
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <Upload size={40} className="mx-auto mb-3" style={{ color: "#3b6fa0" }} />
                      <p className="font-semibold mb-1" style={{ color: "#1e3a5f" }}>
                        اضغط لرفع الصور
                      </p>
                      <p className="text-xs" style={{ color: "rgba(30,58,95,0.5)" }}>
                        يمكنك رفع حتى 5 صور (JPG, PNG) لتوضيح المشكلة
                      </p>
                    </div>

                    {images.length > 0 && (
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-4">
                        {images.map((image, index) => (
                          <div
                            key={index}
                            className="relative group rounded-xl overflow-hidden border-2"
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
                              className="absolute top-1 left-1 w-7 h-7 rounded-full flex items-center justify-center text-white bg-red-500 hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100 text-lg font-bold"
                            >
                              ×
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                              صورة {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* ===== زر الإرسال ===== */}
                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 font-bold px-8 py-5 rounded-2xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-xl disabled:hover:scale-100"
                    style={{ backgroundColor: "#1e3a5f" }}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={24} className="animate-spin" />
                        جاري إرسال الطلب...
                      </>
                    ) : (
                      <>
                        <Send size={24} />
                        إرسال الطلب
                      </>
                    )}
                  </button>

                  <p
                    className="text-xs text-center leading-relaxed px-4"
                    style={{ color: "rgba(30,58,95,0.6)" }}
                  >
                    🔒 بإرسال هذا النموذج، أنت توافق على{" "}
                    <Link href="/privacy" className="underline font-bold hover:text-[#3b6fa0]">
                      سياسة الخصوصية
                    </Link>
                    . بياناتك محمية بالكامل ولن تُستخدم إلا للتواصل معك بخصوص طلبك.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}