'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, getCurrentUserRole } from '@/lib/auth';
import { Mail, Lock, Loader2, AlertCircle, Wrench, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. تسجيل الدخول
      await signIn(email, password);

      // 2. الحصول على الدور
      const role = await getCurrentUserRole();

      // 3. التوجيه بناءً على الدور
      if (role === 'admin') {
        router.push('/dashboard/admin');
      } else if (role === 'technician') {
        router.push('/dashboard/technician');
      } else {
        setError('حساب غير صحيح');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'فشل تسجيل الدخول. تحقق من البريد وكلمة المرور.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 pt-32 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f1b3d 0%, #1e3a5f 60%, #3b6fa0 100%)",
      }}
    >
      {/* خلفية ديكورية */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: "#3b6fa0", transform: "translate(30%, -40%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: "#1e3a5f", transform: "translate(-30%, 40%)" }}
      />

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 md:p-10 relative z-10">
        {/* زر العودة للرئيسية - محسّن */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold mb-8 px-4 py-2.5 rounded-xl transition-all hover:scale-105 hover:shadow-md"
          style={{ 
            color: "#3b6fa0",
            backgroundColor: "rgba(59,111,160,0.1)",
            border: "2px solid rgba(59,111,160,0.2)"
          }}
        >
          <Home size={18} />
          العودة للرئيسية
        </Link>

        {/* اللوجو المتطابق مع Navbar & Footer */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4 group">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3b6fa0] to-[#1e3a5f] rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden border-2 border-[#3b6fa0]/20 group-hover:scale-110 transition-transform duration-300">
                {/* أيقونة المفتاح الإنجليزي */}
                <Wrench className="text-white w-8 h-8 group-hover:rotate-12 transition-transform duration-300" strokeWidth={2.5} />
                
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
          </Link>
          
          <h1 className="text-2xl md:text-3xl font-black mb-2" style={{ color: "#0f1b3d" }}>
            منصة الهادي جروب
          </h1>
          <p className="text-sm font-semibold mb-1" style={{ color: "#3b6fa0" }}>
            للخدمات الفنية
          </p>
          <p className="text-xs" style={{ color: "rgba(30,58,95,0.5)" }}>
            لوحة التحكم - دخول الفنيين
          </p>
        </div>

        {/* رسالة الخطأ */}
        {error && (
          <div
            className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-3 animate-shake"
          >
            <AlertCircle size={20} className="flex-shrink-0" />
            <span className="text-sm font-semibold">{error}</span>
          </div>
        )}

        {/* الفورم */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* البريد الإلكتروني */}
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: "#1e3a5f" }}>
              <Mail size={16} className="inline ml-2 mb-0.5" />
              البريد الإلكتروني
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                dir="ltr"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#3b6fa0] transition-all text-left"
                style={{ color: "#0f1b3d" }}
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* كلمة المرور */}
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: "#1e3a5f" }}>
              <Lock size={16} className="inline ml-2 mb-0.5" />
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                dir="ltr"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#3b6fa0] transition-all text-left"
                style={{ color: "#0f1b3d" }}
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* زر الدخول */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#1e3a5f] to-[#3b6fa0] text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                جاري التحميل...
              </>
            ) : (
              <>
                <Wrench size={20} />
                دخول لوحة التحكم
              </>
            )}
          </button>
        </form>

        {/* رابط التسجيل */}
        <div className="mt-8 text-center">
          <div
            className="h-px w-full mb-6"
            style={{ background: "linear-gradient(to left, transparent, #e8edf3, transparent)" }}
          />
          <p style={{ color: "rgba(30,58,95,0.6)" }} className="text-sm">
            لا تملك حساباً؟{' '}
            <Link
              href="/dashboard/signup"
              className="font-bold hover:underline transition-all inline-flex items-center gap-1"
              style={{ color: "#3b6fa0" }}
            >
              سجل كفني جديد
              <ArrowRight size={14} />
            </Link>
          </p>
        </div>



        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs" style={{ color: "rgba(30,58,95,0.4)" }}>
            © 2024 منصة الهادي جروب - جميع الحقوق محفوظة
          </p>
        </div>
      </div>

      {/* CSS للأنيميشن */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}