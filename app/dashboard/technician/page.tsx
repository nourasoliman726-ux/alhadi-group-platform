'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import {
  ClipboardList, CheckCircle, Clock, XCircle,
  LogOut, Bell, User, Phone, MapPin,
  ChevronLeft, Eye, AlertCircle, Wrench,
  TrendingUp, Star, X, Loader2
} from 'lucide-react';
import {
  getTechnicianRequests,
  updateRequestStatus,
  addTechnicianNote,
  getDashboardStats,
} from '@/lib/api';
import { signOut, getCurrentUser, getTechnicianData } from '@/lib/auth';

import { useRouter } from 'next/navigation';

const statusConfig = {
  pending:     { label: "قيد الانتظار",  color: "#f59e0b", bg: "#fef3c7", icon: Clock },
  assigned:    { label: "تم الإسناد",    color: "#3b82f6", bg: "#dbeafe", icon: User },
  in_progress: { label: "قيد التنفيذ",   color: "#8b5cf6", bg: "#ede9fe", icon: Wrench },
  completed:   { label: "مكتمل",         color: "#10b981", bg: "#d1fae5", icon: CheckCircle },
  cancelled:   { label: "ملغي",          color: "#ef4444", bg: "#fee2e2", icon: XCircle },
};

const urgencyConfig = {
  urgent:    { label: "عاجل",   color: "#ef4444", bg: "#fee2e2" },
  normal:    { label: "عادي",   color: "#3b6fa0", bg: "#e8edf3" },
  scheduled: { label: "مجدول", color: "#10b981", bg: "#d1fae5" },
};

const categoryLabels: Record<string, string> = {
  electricity:  "كهرباء",
  cameras:      "كاميرات مراقبة",
  data:         "اتصالات وData",
  maintenance:  "صيانة عامة",
  contracting:  "مقاولات",
  realestate:   "تطوير عقاري",
};

type Request = any;
type Technician = any;

export default function TechnicianDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  
  // البيانات
  const [requests, setRequests] = useState<Request[]>([]);
  const [technician, setTechnician] = useState<Technician | null>(null);
  const [stats, setStats] = useState({ all: 0, pending: 0, in_progress: 0, completed: 0 });
  
  // UI
  const [selectedReq, setSelectedReq] = useState<Request | null>(null);
  const [note, setNote] = useState("");
  const [loadingAction, setLoadingAction] = useState("");

  // تحميل البيانات
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const user = await getCurrentUser();
        
        if (!user) {
          router.push('/dashboard/login');
          return;
        }

        const techData = await getTechnicianData(user.id);
        setTechnician(techData);

        const reqData = await getTechnicianRequests(techData.id);
        setRequests(reqData || []);

        const statsData = {
          all: reqData?.length || 0,
          pending: reqData?.filter((r) => r.status === 'pending').length || 0,
          in_progress: reqData?.filter((r) => r.status === 'in_progress').length || 0,
          completed: reqData?.filter((r) => r.status === 'completed').length || 0,
        };
        setStats(statsData);
      } catch (error) {
        console.error('Error loading data:', error);
        alert('حدث خطأ في تحميل البيانات');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [router]);

const handleStatusUpdate = async (id: string, status: string) => {
  try {
    setLoadingAction(`status-${id}`);
    await updateRequestStatus(id, status);
    
    setRequests((prevRequests: Request[]) => {
      const updated = prevRequests.map((r) => (r.id === id ? { ...r, status } : r));
      setStats({
        all: updated.length,
        pending: updated.filter((r) => r.status === 'pending').length,
        in_progress: updated.filter((r) => r.status === 'in_progress').length,
        completed: updated.filter((r) => r.status === 'completed').length,
      });
      return updated;
    });
    
    setSelectedReq((prevReq: Request | null) => 
      prevReq?.id === id ? { ...prevReq, status } : prevReq
    );

  } catch (error) {
    console.error('Error updating status:', error);
    alert('حدث خطأ في تحديث الحالة');
  } finally {
    setLoadingAction("");
  }
};

const handleAddNote = async (id: string) => {
  if (!note.trim()) {
    alert('أضف ملاحظة أولاً');
    return;
  }
  try {
    setLoadingAction(`note-${id}`);
    await addTechnicianNote(id, note);
    
    setRequests((prevRequests: Request[]) =>
      prevRequests.map((r) => (r.id === id ? { ...r, technician_notes: note } : r))
    );
    
    setSelectedReq((prevReq: Request | null) =>
      prevReq?.id === id ? { ...prevReq, technician_notes: note } : prevReq
    );
    
    setNote("");
    alert('تم حفظ الملاحظة');
  } catch (error) {
    console.error('Error adding note:', error);
    alert('حدث خطأ في حفظ الملاحظة');
  } finally {
    setLoadingAction("");
  }
};

  // تسجيل الخروج
  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/dashboard/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // فلترة الطلبات
  const filtered = activeTab === "all"
    ? requests
    : requests.filter((r) => r.status === activeTab);

  if (isLoading) {
    return (
      <ProtectedRoute requiredRole="technician">
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: "#f8fafc" }}
        >
          <Loader2 className="animate-spin" size={40} style={{ color: "#1e3a5f" }} />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRole="technician">
      <div className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>

        {/* ===== Header ===== */}
        <header
          className="sticky top-0 z-40 border-b"
          style={{ backgroundColor: "white", borderColor: "#e8edf3" }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
            {/* اللوجو */}
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #1e3a5f 0%, #3b6fa0 100%)",
                }}
              >
                <span className="text-white font-black text-sm">ه</span>
              </div>
              <div>
                <div className="font-black text-sm" style={{ color: "#0f1b3d" }}>
                  الهادي جروب
                </div>
                <div className="text-xs" style={{ color: "#3b6fa0" }}>
                  بوابة الفنيين
                </div>
              </div>
            </div>

            {/* يمين */}
            <div className="flex items-center gap-3">
              {/* إشعارات */}
              <div className="relative">
                <button
                  className="w-9 h-9 rounded-xl flex items-center justify-center border transition-colors"
                  style={{ borderColor: "#e8edf3", backgroundColor: "#f8fafc" }}
                >
                  <Bell size={17} style={{ color: "#1e3a5f" }} />
                </button>
                {stats.pending > 0 && (
                  <div
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-black"
                    style={{ backgroundColor: "#ef4444" }}
                  >
                    {stats.pending}
                  </div>
                )}
              </div>

              {/* معلومات الفني */}
              {technician && (
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border hidden md:flex"
                  style={{ borderColor: "#e8edf3", backgroundColor: "#f8fafc" }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#e8edf3" }}
                  >
                    <User size={14} style={{ color: "#1e3a5f" }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold" style={{ color: "#0f1b3d" }}>
                      {technician.full_name}
                    </div>
                    <div className="text-xs" style={{ color: "rgba(30,58,95,0.5)" }}>
                      {technician.specialty} • {technician.is_available ? 'متاح' : 'مشغول'}
                    </div>
                  </div>
                </div>
              )}

              {/* تسجيل الخروج */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold transition-colors"
                style={{
                  borderColor: "#e8edf3",
                  color: "#1e3a5f",
                  backgroundColor: "#f8fafc",
                }}
              >
                <LogOut size={15} />
                <span className="hidden md:block">خروج</span>
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

          {/* ===== الإحصائيات ===== */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "إجمالي الطلبات", value: stats.all,         icon: ClipboardList, color: "#1e3a5f", bg: "#e8edf3" },
              { label: "قيد الانتظار",   value: stats.pending,     icon: Clock,         color: "#f59e0b", bg: "#fef3c7" },
              { label: "قيد التنفيذ",    value: stats.in_progress, icon: Wrench,        color: "#8b5cf6", bg: "#ede9fe" },
              { label: "مكتملة",         value: stats.completed,   icon: CheckCircle,   color: "#10b981", bg: "#d1fae5" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 border"
                  style={{ borderColor: "#e8edf3" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: s.bg }}
                    >
                      <Icon size={20} style={{ color: s.color }} />
                    </div>
                    <TrendingUp size={14} style={{ color: "rgba(30,58,95,0.3)" }} />
                  </div>
                  <div
                    className="text-3xl font-black mb-1"
                    style={{ color: "#0f1b3d" }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-xs font-medium"
                    style={{ color: "rgba(30,58,95,0.6)" }}
                  >
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">

            {/* ===== قائمة الطلبات ===== */}
            <div className="lg:col-span-2">
              <div
                className="bg-white rounded-2xl border overflow-hidden"
                style={{ borderColor: "#e8edf3" }}
              >
                {/* تبويبات */}
                <div
                  className="flex gap-1 p-3 border-b"
                  style={{ borderColor: "#e8edf3", backgroundColor: "#f8fafc" }}
                >
                  {[
                    { id: "all",         label: "الكل",         count: stats.all },
                    { id: "pending",     label: "انتظار",       count: stats.pending },
                    { id: "in_progress", label: "تنفيذ",        count: stats.in_progress },
                    { id: "completed",   label: "مكتمل",        count: stats.completed },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all flex-1 justify-center"
                      style={{
                        backgroundColor: activeTab === tab.id ? "#1e3a5f" : "transparent",
                        color: activeTab === tab.id ? "white" : "rgba(30,58,95,0.6)",
                      }}
                    >
                      {tab.label}
                      <span
                        className="px-1.5 py-0.5 rounded-full text-xs font-black"
                        style={{
                          backgroundColor: activeTab === tab.id
                            ? "rgba(232,237,243,0.2)"
                            : "#e8edf3",
                          color: activeTab === tab.id ? "white" : "#1e3a5f",
                        }}
                      >
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* الطلبات */}
                <div className="divide-y" style={{ borderColor: "#f8fafc" }}>
                  {filtered.length === 0 ? (
                    <div className="py-16 text-center">
                      <ClipboardList
                        size={40}
                        className="mx-auto mb-3"
                        style={{ color: "#e8edf3" }}
                      />
                      <p style={{ color: "rgba(30,58,95,0.4)" }}>
                        لا توجد طلبات
                      </p>
                    </div>
                  ) : (
                    filtered.map((req) => {
                      const status  = statusConfig[req.status as keyof typeof statusConfig];
                      const urgency = urgencyConfig[req.urgency as keyof typeof urgencyConfig];
                      const StatusIcon = status.icon;

                      return (
                        <div
                          key={req.id}
                          className="p-5 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => setSelectedReq(req)}
                          style={{
                            backgroundColor: selectedReq?.id === req.id ? "#f8fafc" : "white",
                            borderRight: selectedReq?.id === req.id ? "3px solid #1e3a5f" : "3px solid transparent",
                          }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              {/* العميل والخدمة */}
                              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                <span
                                  className="font-black text-sm"
                                  style={{ color: "#0f1b3d" }}
                                >
                                  {req.customer_name}
                                </span>
                                <span
                                  className="text-xs px-2 py-0.5 rounded-full font-semibold"
                                  style={{
                                    backgroundColor: urgency.bg,
                                    color: urgency.color,
                                  }}
                                >
                                  {urgency.label}
                                </span>
                              </div>

                              {/* الخدمة */}
                              <div
                                className="text-xs font-semibold mb-2"
                                style={{ color: "#3b6fa0" }}
                              >
                                {categoryLabels[req.service_category] || req.service_category} — {req.sub_service}
                              </div>

                              {/* الوصف */}
                              <p
                                className="text-xs leading-relaxed mb-3 line-clamp-2"
                                style={{ color: "rgba(30,58,95,0.6)" }}
                              >
                                {req.description}
                              </p>

                              {/* الموقع والتاريخ */}
                              <div className="flex items-center gap-4 text-xs"
                                style={{ color: "rgba(30,58,95,0.5)" }}
                              >
                                <span className="flex items-center gap-1">
                                  <MapPin size={11} />
                                  {req.customer_city}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock size={11} />
                                  {new Date(req.created_at).toLocaleDateString("ar-EG")}
                                </span>
                              </div>
                            </div>

                            {/* الحالة */}
                            <div className="flex flex-col items-end gap-2 flex-shrink-0">
                              <div
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold"
                                style={{
                                  backgroundColor: status.bg,
                                  color: status.color,
                                }}
                              >
                                <StatusIcon size={12} />
                                {status.label}
                              </div>
                              <button
                                className="flex items-center gap-1 text-xs font-semibold"
                                style={{ color: "#3b6fa0" }}
                              >
                                <Eye size={12} />
                                تفاصيل
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* ===== تفاصيل الطلب ===== */}
            <div>
              {selectedReq ? (
                <div
                  className="bg-white rounded-2xl border sticky top-24"
                  style={{ borderColor: "#e8edf3" }}
                >
                  {/* هيدر */}
                  <div
                    className="p-5 border-b flex items-center justify-between"
                    style={{ borderColor: "#e8edf3" }}
                  >
                    <h3
                      className="font-black"
                      style={{ color: "#0f1b3d" }}
                    >
                      تفاصيل الطلب
                    </h3>
                    <button
                      onClick={() => setSelectedReq(null)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "#e8edf3" }}
                    >
                      <X size={14} style={{ color: "#1e3a5f" }} />
                    </button>
                  </div>

                  <div className="p-5 space-y-5 max-h-screen overflow-y-auto">
                    {/* الحالة */}
                    <div>
                      {(() => {
                        const status = statusConfig[selectedReq.status as keyof typeof statusConfig];
                        const StatusIcon = status.icon;
                        return (
                          <div
                            className="flex items-center gap-2 px-4 py-3 rounded-xl"
                            style={{ backgroundColor: status.bg }}
                          >
                            <StatusIcon size={18} style={{ color: status.color }} />
                            <span
                              className="font-black"
                              style={{ color: status.color }}
                            >
                              {status.label}
                            </span>
                          </div>
                        );
                      })()}
                    </div>

                    {/* معلومات العميل */}
                    <div>
                      <h4
                        className="text-xs font-bold mb-3 uppercase tracking-widest"
                        style={{ color: "rgba(30,58,95,0.4)" }}
                      >
                        معلومات العميل
                      </h4>
                      <div className="space-y-2.5">
                        {[
                          { icon: User,   label: "الاسم",   value: selectedReq.customer_name },
                          { icon: Phone,  label: "الهاتف",  value: selectedReq.customer_phone },
                          { icon: MapPin, label: "العنوان", value: `${selectedReq.customer_address} — ${selectedReq.customer_city}` },
                        ].map(({ icon: Icon, label, value }, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ backgroundColor: "#e8edf3" }}
                            >
                              <Icon size={14} style={{ color: "#1e3a5f" }} />
                            </div>
                            <div>
                              <div
                                className="text-xs"
                                style={{ color: "rgba(30,58,95,0.5)" }}
                              >
                                {label}
                              </div>
                              <div
                                className="text-sm font-bold"
                                style={{ color: "#0f1b3d" }}
                              >
                                {value}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* تفاصيل الخدمة */}
                    <div>
                      <h4
                        className="text-xs font-bold mb-3 uppercase tracking-widest"
                        style={{ color: "rgba(30,58,95,0.4)" }}
                      >
                        تفاصيل الخدمة
                      </h4>
                      <div
                        className="rounded-xl p-4 space-y-2"
                        style={{ backgroundColor: "#f8fafc" }}
                      >
                        <div className="flex justify-between text-sm">
                          <span style={{ color: "rgba(30,58,95,0.5)" }}>الخدمة</span>
                          <span
                            className="font-bold"
                            style={{ color: "#0f1b3d" }}
                          >
                            {categoryLabels[selectedReq.service_category] || selectedReq.service_category}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span style={{ color: "rgba(30,58,95,0.5)" }}>التخصص</span>
                          <span
                            className="font-bold"
                            style={{ color: "#0f1b3d" }}
                          >
                            {selectedReq.sub_service}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span style={{ color: "rgba(30,58,95,0.5)" }}>الأولوية</span>
                          <span
                            className="font-bold"
                            style={{
                              color: urgencyConfig[selectedReq.urgency as keyof typeof urgencyConfig].color,
                            }}
                          >
                            {urgencyConfig[selectedReq.urgency as keyof typeof urgencyConfig].label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* الوصف */}
                    <div>
                      <h4
                        className="text-xs font-bold mb-2 uppercase tracking-widest"
                        style={{ color: "rgba(30,58,95,0.4)" }}
                      >
                        وصف المشكلة
                      </h4>
                      <p
                        className="text-sm leading-relaxed p-4 rounded-xl"
                        style={{
                          backgroundColor: "#f8fafc",
                          color: "rgba(30,58,95,0.8)",
                        }}
                      >
                        {selectedReq.description}
                      </p>
                    </div>

                    {/* ملاحظات الفني */}
                    <div>
                      <h4
                        className="text-xs font-bold mb-3 uppercase tracking-widest"
                        style={{ color: "rgba(30,58,95,0.4)" }}
                      >
                        ملاحظاتي
                      </h4>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="أضف ملاحظاتك عن العمل..."
                        className="w-full p-3 rounded-xl border text-sm outline-none resize-none"
                        style={{
                          borderColor: "#e8edf3",
                          backgroundColor: "#f8fafc",
                          color: "#0f1b3d",
                          minHeight: "80px",
                        }}
                        rows={3}
                      />
                      <button
                        onClick={() => handleAddNote(selectedReq.id)}
                        disabled={loadingAction === `note-${selectedReq.id}` || !note.trim()}
                        className="w-full mt-2 font-bold py-2 rounded-xl text-sm text-white flex items-center justify-center gap-2 transition-all"
                        style={{
                          backgroundColor: note.trim() ? "#3b6fa0" : "#ccc",
                          cursor: note.trim() ? "pointer" : "not-allowed",
                        }}
                      >
                        {loadingAction === `note-${selectedReq.id}` && (
                          <Loader2 size={14} className="animate-spin" />
                        )}
                        حفظ الملاحظة
                      </button>
                    </div>

                    {/* أزرار تحديث الحالة */}
                    <div>
                      <h4
                        className="text-xs font-bold mb-3 uppercase tracking-widest"
                        style={{ color: "rgba(30,58,95,0.4)" }}
                      >
                        تحديث الحالة
                      </h4>
                      <div className="space-y-2">
                        {selectedReq.status === "pending" || selectedReq.status === "assigned" ? (
                          <button
                            onClick={() => handleStatusUpdate(selectedReq.id, "in_progress")}
                            disabled={loadingAction === `status-${selectedReq.id}`}
                            className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm text-white transition-all hover:scale-105"
                            style={{ backgroundColor: "#8b5cf6" }}
                          >
                            {loadingAction === `status-${selectedReq.id}` && (
                              <Loader2 size={14} className="animate-spin" />
                            )}
                            <Wrench size={16} />
                            بدء التنفيذ
                          </button>
                        ) : null}

                        {selectedReq.status === "in_progress" ? (
                          <button
                            onClick={() => handleStatusUpdate(selectedReq.id, "completed")}
                            disabled={loadingAction === `status-${selectedReq.id}`}
                            className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm text-white transition-all hover:scale-105"
                            style={{ backgroundColor: "#10b981" }}
                          >
                            {loadingAction === `status-${selectedReq.id}` && (
                              <Loader2 size={14} className="animate-spin" />
                            )}
                            <CheckCircle size={16} />
                            إتمام الخدمة
                          </button>
                        ) : null}

                        {selectedReq.status !== "completed" &&
                          selectedReq.status !== "cancelled" ? (
                          <button
                            onClick={() => handleStatusUpdate(selectedReq.id, "cancelled")}
                            disabled={loadingAction === `status-${selectedReq.id}`}
                            className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm transition-all border"
                            style={{
                              borderColor: "#fee2e2",
                              color: "#ef4444",
                              backgroundColor: "#fff5f5",
                            }}
                          >
                            {loadingAction === `status-${selectedReq.id}` && (
                              <Loader2 size={14} className="animate-spin" />
                            )}
                            <XCircle size={16} />
                            رفض الطلب
                          </button>
                        ) : null}

                        {selectedReq.status === "completed" && (
                          <div
                            className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold"
                            style={{
                              backgroundColor: "#d1fae5",
                              color: "#10b981",
                            }}
                          >
                            <Star size={16} />
                            تم إتمام الخدمة بنجاح
                          </div>
                        )}
                      </div>
                    </div>

                    {/* زر الاتصال */}
                    <a
                      href={`tel:${selectedReq.customer_phone}`}
                      className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm transition-all"
                      style={{
                        backgroundColor: "#e8edf3",
                        color: "#1e3a5f",
                      }}
                    >
                      <Phone size={16} />
                      اتصل بالعميل
                    </a>
                  </div>
                </div>
              ) : (
                <div
                  className="bg-white rounded-2xl border p-10 text-center"
                  style={{ borderColor: "#e8edf3" }}
                >
                  <Eye
                    size={40}
                    className="mx-auto mb-3"
                    style={{ color: "#e8edf3" }}
                  />
                  <p
                    className="font-semibold"
                    style={{ color: "rgba(30,58,95,0.4)" }}
                  >
                    اختر طلباً لعرض تفاصيله
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}