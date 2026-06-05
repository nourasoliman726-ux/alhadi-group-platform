'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, getCurrentUserRole } from '@/lib/auth';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';

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
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #0f1b3d 0%, #1e3a5f 55%, #3b6fa0 100%)",
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        {/* اللوجو */}
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl"
            style={{
              background: "linear-gradient(135deg, #1e3a5f 0%, #3b6fa0 100%)",
            }}
          >
            <span className="text-white font-black text-3xl">ه</span>
          </div>
          <h1 className="text-2xl font-black mb-1" style={{ color: "#0f1b3d" }}>
            الهادي جروب
          </h1>
          <p className="text-sm" style={{ color: "rgba(30,58,95,0.6)" }}>
            لوحة التحكم
          </p>
        </div>

        {/* الفورم */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2"
          >
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* البريد الإلكتروني */}
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: "#1e3a5f" }}>
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail
                size={20}
                className="absolute right-4 top-4 text-gray-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pr-12 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1e3a5f] transition"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* كلمة المرور */}
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: "#1e3a5f" }}>
              كلمة المرور
            </label>
            <div className="relative">
              <Lock
                size={20}
                className="absolute right-4 top-4 text-gray-400"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pr-12 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1e3a5f] transition"
                placeholder="••••••••"
              />
            </div>
          </div>

                    {/* رابط التسجيل */}
          <div className="mt-6 text-center">
            <p style={{ color: "rgba(30,58,95,0.6)" }} className="text-sm">
              لا تملك حساباً؟{' '}
              <a
                href="/dashboard/signup"
                className="font-bold"
                style={{ color: "#1e3a5f" }}
              >
                سجل كفني جديد
              </a>
            </p>
          </div>

          {/* زر الدخول */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e3a5f] text-white font-bold py-3 rounded-lg hover:bg-[#152a47] transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                جاري التحميل...
              </>
            ) : (
              'دخول'
            )}
          </button>
        </form>

        {/* تلميح للتجربة */}
        <div
          className="mt-6 p-4 rounded-xl text-xs"
          style={{ backgroundColor: "#e8edf3", color: "#3b6fa0" }}
        >
          <p className="font-bold mb-2">للتجربة:</p>
          <p>🔹 Admin: admin@alhadi.com / admin123</p>
          <p>🔹 Technician: tech@alhadi.com / tech123</p>
        </div>
      </div>
    </div>
  );
}