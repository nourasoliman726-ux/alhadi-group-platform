"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone, Mail, MapPin, Clock, Send,
  ChevronLeft, CheckCircle,
  MessageSquare, User, FileText
} from "lucide-react";
// Note: lucide-react doesn't export a Facebook icon in some versions
// We'll use an inline SVG where needed instead of importing Facebook

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isFormValid =
    formData.name !== "" &&
    formData.phone !== "" &&
    formData.message !== "";

  // ===== شاشة النجاح =====
  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6 py-20"
        style={{ backgroundColor: "#f8fafc" }}
      >
        <div className="max-w-lg w-full text-center">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "#e8edf3" }}
          >
            <CheckCircle size={48} style={{ color: "#1e3a5f" }} />
          </div>
          <h1 className="text-3xl font-black mb-4" style={{ color: "#0f1b3d" }}>
            تم إرسال رسالتك بنجاح! 📧
          </h1>
          <p
            className="text-lg leading-relaxed mb-8"
            style={{ color: "rgba(30,58,95,0.7)" }}
          >
            شكراً <strong>{formData.name}</strong>! تم استلام رسالتك وسنرد
            عليك في أقرب وقت على رقم{" "}
            <strong>{formData.phone}</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  phone: "",
                  email: "",
                  subject: "",
                  message: "",
                });
              }}
              className="flex-1 font-bold py-3 rounded-2xl border transition-all"
              style={{
                borderColor: "#e8edf3",
                color: "#1e3a5f",
                backgroundColor: "white",
              }}
            >
              إرسال رسالة أخرى
            </button>
            <Link
              href="/"
              className="flex-1 font-bold py-3 rounded-2xl text-center text-white transition-all hover:scale-105"
              style={{ backgroundColor: "#1e3a5f" }}
            >
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>

      {/* ===== Hero ===== */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0f1b3d 0%, #1e3a5f 55%, #3b6fa0 100%)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{
            backgroundColor: "#3b6fa0",
            transform: "translate(30%, -40%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-sm mb-8"
            style={{ color: "rgba(232,237,243,0.5)" }}
          >
            <Link href="/" style={{ color: "rgba(232,237,243,0.6)" }}>
              الرئيسية
            </Link>
            <ChevronLeft size={14} />
            <span style={{ color: "#e8edf3" }}>تواصل معنا</span>
          </div>

          <div className="text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 border mb-5"
              style={{
                backgroundColor: "rgba(59,111,160,0.25)",
                borderColor: "rgba(59,111,160,0.4)",
              }}
            >
              <MessageSquare size={15} style={{ color: "#e8edf3" }} />
              <span
                className="text-sm font-bold"
                style={{ color: "#e8edf3" }}
              >
                نحن هنا لمساعدتك
              </span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-black mb-4"
              style={{ color: "#ffffff" }}
            >
              تواصل معنا
            </h1>
            <p
              className="text-lg max-w-xl mx-auto"
              style={{ color: "rgba(232,237,243,0.7)" }}
            >
              فريقنا جاهز للرد على استفساراتك وخدمتك على مدار الساعة
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 50"
            fill="none"
            preserveAspectRatio="none"
            className="w-full"
          >
            <path
              d="M0 50L1440 50L1440 25C1200 0 960 0 720 12C480 25 240 35 0 25Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      {/* ===== المحتوى ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* ===== معلومات التواصل ===== */}
            <div className="lg:col-span-1 space-y-6">

              {/* بطاقة الاتصال */}
              <div
                className="bg-white rounded-3xl p-8 border"
                style={{ borderColor: "#e8edf3" }}
              >
                <h2
                  className="text-2xl font-black mb-6"
                  style={{ color: "#0f1b3d" }}
                >
                  معلومات التواصل
                </h2>

                <div className="space-y-5">
                  {/* الهاتف */}
                  {/* <a
                    href="tel:+201025686280"
                    className="flex items-start gap-4 p-4 rounded-xl border transition-all hover:shadow-md group"
                    style={{
                      backgroundColor: "#f8fafc",
                      borderColor: "#e8edf3",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: "#e8edf3" }}
                    >
                      <Phone size={20} style={{ color: "#1e3a5f" }} />
                    </div>
                    <div>
                      <div
                        className="text-xs mb-1"
                        style={{ color: "rgba(30,58,95,0.5)" }}
                      >
                        الهاتف
                      </div>
                      <div
                        className="font-bold"
                        style={{ color: "#0f1b3d" }}
                      >
                        +20 10 2568 6280
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "rgba(30,58,95,0.5)" }}
                      >
                        متاح 24/7
                      </div>
                    </div>
                  </a> */}

                  {/* البريد */}
                  <a
                    href="mailto:alhadigroup1998@gmail.com"
                    className="flex items-start gap-4 p-4 rounded-xl border transition-all hover:shadow-md group"
                    style={{
                      backgroundColor: "#f8fafc",
                      borderColor: "#e8edf3",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: "#e8edf3" }}
                    >
                      <Mail size={20} style={{ color: "#1e3a5f" }} />
                    </div>
                    <div className="min-w-0">
                      <div
                        className="text-xs mb-1"
                        style={{ color: "rgba(30,58,95,0.5)" }}
                      >
                        البريد الإلكتروني
                      </div>
                      <div
                        className="font-bold text-sm truncate"
                        style={{ color: "#0f1b3d" }}
                      >
                        alhadigroup1998@gmail.com
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "rgba(30,58,95,0.5)" }}
                      >
                        نرد خلال 24 ساعة
                      </div>
                    </div>
                  </a>

                  {/* المنيا */}
                  <div
                    className="flex items-start gap-4 p-4 rounded-xl border"
                    style={{
                      backgroundColor: "#f8fafc",
                      borderColor: "#e8edf3",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#e8edf3" }}
                    >
                      <MapPin size={20} style={{ color: "#1e3a5f" }} />
                    </div>
                    <div>
                      <div
                        className="text-xs mb-1"
                        style={{ color: "rgba(30,58,95,0.5)" }}
                      >
                        فرع المنيا
                      </div>
                      <div
                        className="font-bold"
                        style={{ color: "#0f1b3d" }}
                      >
                        المنيا، مصر
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "rgba(30,58,95,0.5)" }}
                      >
                        السبت – الخميس: 8ص – 8م
                      </div>
                    </div>
                  </div>

                  {/* القاهرة */}
                  <div
                    className="flex items-start gap-4 p-4 rounded-xl border"
                    style={{
                      backgroundColor: "#f8fafc",
                      borderColor: "#e8edf3",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#e8edf3" }}
                    >
                      <MapPin size={20} style={{ color: "#1e3a5f" }} />
                    </div>
                    <div>
                      <div
                        className="text-xs mb-1"
                        style={{ color: "rgba(30,58,95,0.5)" }}
                      >
                        فرع القاهرة
                      </div>
                      <div
                        className="font-bold"
                        style={{ color: "#0f1b3d" }}
                      >
                        القاهرة، مصر
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "rgba(30,58,95,0.5)" }}
                      >
                        السبت – الخميس: 8ص – 8م
                      </div>
                    </div>
                  </div>

                  {/* أوقات العمل */}
                  <div
                    className="flex items-start gap-4 p-4 rounded-xl border"
                    style={{
                      backgroundColor: "#f8fafc",
                      borderColor: "#e8edf3",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#e8edf3" }}
                    >
                      <Clock size={20} style={{ color: "#1e3a5f" }} />
                    </div>
                    <div>
                      <div
                        className="text-xs mb-1"
                        style={{ color: "rgba(30,58,95,0.5)" }}
                      >
                        ساعات العمل
                      </div>
                      <div
                        className="font-bold"
                        style={{ color: "#0f1b3d" }}
                      >
                        السبت – الخميس
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "rgba(30,58,95,0.5)" }}
                      >
                        من 8 صباحاً حتى 8 مساءً
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* السوشيال ميديا */}
              <div
                className="bg-white rounded-3xl p-8 border"
                style={{ borderColor: "#e8edf3" }}
              >
                <h3
                  className="text-xl font-black mb-5"
                  style={{ color: "#0f1b3d" }}
                >
                  تابعنا على
                </h3>

                <div className="space-y-3">
                  {/* فيسبوك */}
                  <a
                    href="https://www.facebook.com/share/1EF4CFbTfo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl border transition-all hover:shadow-md group"
                    style={{
                      backgroundColor: "#f8fafc",
                      borderColor: "#e8edf3",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: "#1877f2" }}
                    >
                      {/* <Facebook size={18} className="text-white" /> */}
                    </div>
                    <div>
                      <div
                        className="font-bold text-sm"
                        style={{ color: "#0f1b3d" }}
                      >
                        فيسبوك
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "rgba(30,58,95,0.5)" }}
                      >
                        تابع آخر الأخبار والعروض
                      </div>
                    </div>
                  </a>

                  {/* واتساب */}
                  <a
                    href="https://wa.me/201025686280"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl border transition-all hover:shadow-md group"
                    style={{
                      backgroundColor: "#f8fafc",
                      borderColor: "#e8edf3",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: "#25d366" }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                      </svg>
                    </div>
                    <div>
                      <div
                        className="font-bold text-sm"
                        style={{ color: "#0f1b3d" }}
                      >
                        واتساب
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "rgba(30,58,95,0.5)" }}
                      >
                        تواصل معنا فوراً
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* ===== نموذج التواصل ===== */}
            <div className="lg:col-span-2">
              <div
                className="bg-white rounded-3xl p-8 md:p-10 border"
                style={{ borderColor: "#e8edf3" }}
              >
                <h2
                  className="text-3xl font-black mb-2"
                  style={{ color: "#0f1b3d" }}
                >
                  أرسل لنا رسالة
                </h2>
                <p
                  className="mb-8"
                  style={{ color: "rgba(30,58,95,0.6)" }}
                >
                  املأ النموذج وسنرد عليك في أقرب وقت
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* الاسم */}
                  <div>
                    <label
                      className="block text-sm font-bold mb-2"
                      style={{ color: "#1e3a5f" }}
                    >
                      <User size={14} className="inline ml-1" />
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="أدخل اسمك"
                      className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all"
                      style={{
                        borderColor: "#e8edf3",
                        backgroundColor: "#f8fafc",
                        color: "#0f1b3d",
                      }}
                      onFocus={(e) =>
                        ((e.target as HTMLElement).style.borderColor = "#3b6fa0")
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLElement).style.borderColor = "#e8edf3")
                      }
                      required
                    />
                  </div>

                  {/* الهاتف والبريد */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-bold mb-2"
                        style={{ color: "#1e3a5f" }}
                      >
                        <Phone size={14} className="inline ml-1" />
                        رقم الهاتف *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="01XXXXXXXXX"
                        className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all"
                        style={{
                          borderColor: "#e8edf3",
                          backgroundColor: "#f8fafc",
                          color: "#0f1b3d",
                        }}
                        onFocus={(e) =>
                          ((e.target as HTMLElement).style.borderColor =
                            "#3b6fa0")
                        }
                        onBlur={(e) =>
                          ((e.target as HTMLElement).style.borderColor =
                            "#e8edf3")
                        }
                        required
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-bold mb-2"
                        style={{ color: "#1e3a5f" }}
                      >
                        <Mail size={14} className="inline ml-1" />
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="example@email.com"
                        className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all"
                        style={{
                          borderColor: "#e8edf3",
                          backgroundColor: "#f8fafc",
                          color: "#0f1b3d",
                        }}
                        onFocus={(e) =>
                          ((e.target as HTMLElement).style.borderColor =
                            "#3b6fa0")
                        }
                        onBlur={(e) =>
                          ((e.target as HTMLElement).style.borderColor =
                            "#e8edf3")
                        }
                      />
                    </div>
                  </div>

                  {/* الموضوع */}
                  <div>
                    <label
                      className="block text-sm font-bold mb-2"
                      style={{ color: "#1e3a5f" }}
                    >
                      <FileText size={14} className="inline ml-1" />
                      الموضوع
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="عن ماذا تريد أن تسأل؟"
                      className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all"
                      style={{
                        borderColor: "#e8edf3",
                        backgroundColor: "#f8fafc",
                        color: "#0f1b3d",
                      }}
                      onFocus={(e) =>
                        ((e.target as HTMLElement).style.borderColor = "#3b6fa0")
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLElement).style.borderColor = "#e8edf3")
                      }
                    />
                  </div>

                  {/* الرسالة */}
                  <div>
                    <label
                      className="block text-sm font-bold mb-2"
                      style={{ color: "#1e3a5f" }}
                    >
                      <MessageSquare size={14} className="inline ml-1" />
                      رسالتك *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="اكتب رسالتك هنا..."
                      rows={6}
                      className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all resize-none"
                      style={{
                        borderColor: "#e8edf3",
                        backgroundColor: "#f8fafc",
                        color: "#0f1b3d",
                      }}
                      onFocus={(e) =>
                        ((e.target as HTMLElement).style.borderColor = "#3b6fa0")
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLElement).style.borderColor = "#e8edf3")
                      }
                      required
                    />
                  </div>

                  {/* زر الإرسال */}
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full font-bold py-4 rounded-2xl transition-all hover:scale-105 text-white flex items-center justify-center gap-3 text-lg shadow-lg"
                    style={{
                      backgroundColor: isFormValid ? "#1e3a5f" : "#e8edf3",
                      color: isFormValid ? "white" : "rgba(30,58,95,0.4)",
                      cursor: isFormValid ? "pointer" : "not-allowed",
                    }}
                  >
                    <Send size={20} />
                    إرسال الرسالة
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* ===== الخرائط ===== */}
          <div className="mt-12">
            <h2
              className="text-3xl font-black mb-8 text-center"
              style={{ color: "#0f1b3d" }}
            >
              موقعنا على الخريطة
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* خريطة المنيا */}
              <div
                className="rounded-3xl overflow-hidden border"
                style={{ borderColor: "#e8edf3" }}
              >
                <div className="bg-white p-5 border-b" style={{ borderColor: "#e8edf3" }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "#e8edf3" }}
                    >
                      <MapPin size={20} style={{ color: "#1e3a5f" }} />
                    </div>
                    <div>
                      <div className="font-black" style={{ color: "#0f1b3d" }}>
                        فرع المنيا
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "rgba(30,58,95,0.5)" }}
                      >
                        المنيا، مصر
                      </div>
                    </div>
                  </div>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110567.89447684845!2d30.73!3d28.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14567c5e6c6c6c6f%3A0x0!2zMjjCsDA0JzQ4LjAiTiAzMMKwNDMnNDguMCJF!5e0!3m2!1sar!2seg!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* خريطة القاهرة */}
              <div
                className="rounded-3xl overflow-hidden border"
                style={{ borderColor: "#e8edf3" }}
              >
                <div className="bg-white p-5 border-b" style={{ borderColor: "#e8edf3" }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "#e8edf3" }}
                    >
                      <MapPin size={20} style={{ color: "#1e3a5f" }} />
                    </div>
                    <div>
                      <div className="font-black" style={{ color: "#0f1b3d" }}>
                        فرع القاهرة
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "rgba(30,58,95,0.5)" }}
                      >
                        القاهرة، مصر
                      </div>
                    </div>
                  </div>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221100.89447684845!2d31.23!3d30.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Egypt!5e0!3m2!1sen!2seg!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}