'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUpWithRole } from '@/lib/auth';
import { Mail, Lock, User, Phone, MapPin, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    specialty: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const specialties = [
    { value: 'electricity', label: 'كهرباء' },
    { value: 'cameras', label: 'كاميرات مراقبة' },
    { value: 'data', label: 'اتصالات و Data' },
    { value: 'maintenance', label: 'صيانة عامة' },
    { value: 'contracting', label: 'مقاولات' },
  ];

  const cities = [
    { value: 'المنيا', label: 'المنيا' },
    { value: 'القاهرة', label: 'القاهرة' },
    { value: 'الجيزة', label: 'الجيزة' },
    { value: 'الإسكندرية', label: 'الإسكندرية' },
    { value: 'أسوان', label: 'أسوان' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // التحقق من البيانات
    if (!formData.fullName.trim()) {
      setError('الاسم الكامل مطلوب');
      return;
    }

    if (!formData.phone.trim()) {
      setError('رقم الهاتف مطلوب');
      return;
    }

    if (!/^01[0-2]\d{8}$/.test(formData.phone)) {
      setError('رقم الهاتف غير صحيح (يجب أن يبدأ بـ 01 و يكون 11 رقم)');
      return;
    }

    if (!formData.city) {
      setError('اختر المدينة');
      return;
    }

    if (!formData.specialty) {
      setError('اختر التخصص');
      return;
    }

    if (!formData.email.trim()) {
      setError('البريد الإلكتروني مطلوب');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('البريد الإلكتروني غير صحيح');
      return;
    }

    if (formData.password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }

    setLoading(true);

    try {
      await signUpWithRole(
        formData.email,
        formData.password,
        'technician',
        formData.fullName,
        formData.phone,
        formData.specialty,
        formData.city
      );
      
     
      router.push('/dashboard/technician');
    } catch (err: any) {
      setError(err.message || 'فشل التسجيل. حاول مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        background: "linear-gradient(135deg, #0f1b3d 0%, #1e3a5f 55%, #3b6fa0 100%)",
      }}
    >
      <div className="w-full max-w-md">
        {/* اللوجو */}
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl border"
            style={{
              background: "linear-gradient(135deg, #1e3a5f 0%, #3b6fa0 100%)",
              borderColor: "rgba(232,237,243,0.2)",
            }}
          >
            <span className="text-white font-black text-3xl">ه</span>
          </div>
          <h1 className="text-2xl font-black text-white mb-1">
            الهادي جروب
          </h1>
          <p style={{ color: "rgba(232,237,243,0.6)" }} className="text-sm">
            تسجيل فنيين جدد
          </p>
        </div>

        {/* فورم التسجيل */}
        <div
          className="rounded-3xl p-8 border shadow-2xl"
          style={{
            backgroundColor: "white",
            borderColor: "rgba(232,237,243,0.2)",
          }}
        >
          <h2
            className="text-xl font-black mb-1"
            style={{ color: "#0f1b3d" }}
          >
            تسجيل جديد
          </h2>
          <p
            className="text-sm mb-6"
            style={{ color: "rgba(30,58,95,0.6)" }}
          >
            أنشئ حسابك كفني الآن
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* الاسم الكامل */}
            <div>
              <label
                className="block text-sm font-bold mb-2"
                style={{ color: "#1e3a5f" }}
              >
                الاسم الكامل
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(30,58,95,0.4)" }}
                />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="أحمد محمد علي"
                  className="w-full pr-10 pl-4 py-3 rounded-xl border text-sm outline-none transition-colors"
                  style={{
                    borderColor: "#e8edf3",
                    backgroundColor: "#f8fafc",
                    color: "#0f1b3d",
                  }}
                  onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
                  onBlur={e => (e.target.style.borderColor = "#e8edf3")}
                  required
                />
              </div>
            </div>

            {/* رقم الهاتف */}
            <div>
              <label
                className="block text-sm font-bold mb-2"
                style={{ color: "#1e3a5f" }}
              >
                رقم الهاتف
              </label>
              <div className="relative">
                <Phone
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(30,58,95,0.4)" }}
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01012345678"
                  className="w-full pr-10 pl-4 py-3 rounded-xl border text-sm outline-none transition-colors"
                  style={{
                    borderColor: "#e8edf3",
                    backgroundColor: "#f8fafc",
                    color: "#0f1b3d",
                  }}
                  onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
                  onBlur={e => (e.target.style.borderColor = "#e8edf3")}
                  required
                />
              </div>
            </div>

            {/* المدينة */}
            <div>
              <label
                className="block text-sm font-bold mb-2"
                style={{ color: "#1e3a5f" }}
              >
                المدينة
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors"
                style={{
                  borderColor: "#e8edf3",
                  backgroundColor: "#f8fafc",
                  color: "#0f1b3d",
                }}
                required
              >
                <option value="">اختر المدينة</option>
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </div>

            {/* التخصص */}
            <div>
              <label
                className="block text-sm font-bold mb-2"
                style={{ color: "#1e3a5f" }}
              >
                التخصص
              </label>
              <select
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors"
                style={{
                  borderColor: "#e8edf3",
                  backgroundColor: "#f8fafc",
                  color: "#0f1b3d",
                }}
                required
              >
                <option value="">اختر التخصص</option>
                {specialties.map((spec) => (
                  <option key={spec.value} value={spec.value}>
                    {spec.label}
                  </option>
                ))}
              </select>
            </div>

            {/* البريد الإلكتروني */}
            <div>
              <label
                className="block text-sm font-bold mb-2"
                style={{ color: "#1e3a5f" }}
              >
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(30,58,95,0.4)" }}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full pr-10 pl-4 py-3 rounded-xl border text-sm outline-none transition-colors"
                  style={{
                    borderColor: "#e8edf3",
                    backgroundColor: "#f8fafc",
                    color: "#0f1b3d",
                  }}
                  onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
                  onBlur={e => (e.target.style.borderColor = "#e8edf3")}
                  required
                />
              </div>
            </div>

            {/* كلمة المرور */}
            <div>
              <label
                className="block text-sm font-bold mb-2"
                style={{ color: "#1e3a5f" }}
              >
                كلمة المرور
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(30,58,95,0.4)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(30,58,95,0.4)" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pr-10 pl-10 py-3 rounded-xl border text-sm outline-none transition-colors"
                  style={{
                    borderColor: "#e8edf3",
                    backgroundColor: "#f8fafc",
                    color: "#0f1b3d",
                  }}
                  onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
                  onBlur={e => (e.target.style.borderColor = "#e8edf3")}
                  required
                />
              </div>
              <p className="text-xs mt-1" style={{ color: "rgba(30,58,95,0.5)" }}>
                يجب أن تكون 6 أحرف على الأقل
              </p>
            </div>

            {/* تأكيد كلمة المرور */}
            <div>
              <label
                className="block text-sm font-bold mb-2"
                style={{ color: "#1e3a5f" }}
              >
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(30,58,95,0.4)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(30,58,95,0.4)" }}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pr-10 pl-10 py-3 rounded-xl border text-sm outline-none transition-colors"
                  style={{
                    borderColor: "#e8edf3",
                    backgroundColor: "#f8fafc",
                    color: "#0f1b3d",
                  }}
                  onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
                  onBlur={e => (e.target.style.borderColor = "#e8edf3")}
                  required
                />
              </div>
            </div>

            {/* رسالة الخطأ */}
            {error && (
              <div
                className="flex items-center gap-2 p-3 rounded-xl text-sm"
                style={{ backgroundColor: "#fee2e2", color: "#dc2626" }}
              >
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* زر التسجيل */}
            <button
              type="submit"
              disabled={loading}
              className="w-full font-bold py-4 rounded-2xl text-white transition-all hover:scale-105 flex items-center justify-center gap-2 mt-6"
              style={{
                backgroundColor: loading ? "#ccc" : "#1e3a5f",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  جاري التسجيل...
                </>
              ) : (
                'تسجيل حساب جديد'
              )}
            </button>
          </form>

          {/* رابط تسجيل الدخول */}
          <div className="mt-6 text-center">
            <p style={{ color: "rgba(30,58,95,0.6)" }} className="text-sm">
              لديك حساب بالفعل؟{' '}
              <a
                href="/dashboard/login"
                className="font-bold"
                style={{ color: "#1e3a5f" }}
              >
                سجل دخول هنا
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}