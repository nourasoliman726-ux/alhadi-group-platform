"use client";

import { useState } from "react";
import {
  ClipboardList, CheckCircle, Clock, XCircle,
  Users, LogOut, Bell, Settings, Search,
  Wrench, TrendingUp, Eye, Phone, MapPin,
  ChevronLeft, AlertCircle, Mail, Filter,
  BarChart2, MessageSquare, UserPlus, X
} from "lucide-react";

// ===== بيانات تجريبية =====
const mockRequests = [
  {
    id: "1",
    client_name:      "أحمد محمد",
    client_phone:     "01012345678",
    client_address:   "شارع النيل، المنيا",
    client_city:      "المنيا",
    service_category: "electricity",
    sub_service:      "إصلاح أعطال",
    description:      "انقطع التيار الكهربائي في الصالة",
    urgency:          "urgent",
    status:           "pending",
    technician_id:    null,
    created_at:       "2025-01-15T10:30:00Z",
  },
  {
    id: "2",
    client_name:      "سارة أحمد",
    client_phone:     "01198765432",
    client_address:   "حي الزهراء، المنيا",
    client_city:      "المنيا",
    service_category: "cameras",
    sub_service:      "تركيب كاميرات",
    description:      "تركيب 4 كاميرات مراقبة للفيلا",
    urgency:          "normal",
    status:           "assigned",
    technician_id:    "t1",
    created_at:       "2025-01-14T09:00:00Z",
  },
  {
    id: "3",
    client_name:      "محمود علي",
    client_phone:     "01234567890",
    client_address:   "شارع الجمهورية، القاهرة",
    client_city:      "القاهرة",
    service_category: "data",
    sub_service:      "تمديد شبكات",
    description:      "تمديد شبكة إنترنت لمكتب 3 غرف",
    urgency:          "scheduled",
    status:           "in_progress",
    technician_id:    "t2",
    created_at:       "2025-01-13T14:00:00Z",
  },
  {
    id: "4",
    client_name:      "فاطمة حسن",
    client_phone:     "01567891234",
    client_address:   "حي المعادي، القاهرة",
    client_city:      "القاهرة",
    service_category: "electricity",
    sub_service:      "تبديل كابلات",
    description:      "تبديل كابلات المطبخ",
    urgency:          "normal",
    status:           "completed",
    technician_id:    "t1",
    created_at:       "2025-01-12T11:00:00Z",
  },
  {
    id: "5",
    client_name:      "كريم عبدالله",
    client_phone:     "01098765432",
    client_address:   "شارع البحر، المنيا",
    client_city:      "المنيا",
    service_category: "contracting",
    sub_service:      "تشطيبات سكنية",
    description:      "تشطيب شقة 3 غرف كامل",
    urgency:          "normal",
    status:           "pending",
    technician_id:    null,
    created_at:       "2025-01-15T08:00:00Z",
  },
];

const mockTechnicians = [
  {
    id:           "t1",
    name:         "محمد الفني",
    phone:        "01011111111",
    specialty:    ["كهرباء", "كاميرات"],
    city:         "المنيا",
    is_available: true,
    rating:       4.9,
    total_orders: 45,
  },
  {
    id:           "t2",
    name:         "علي السيد",
    phone:        "01022222222",
    specialty:    ["اتصالات", "Data"],
    city:         "القاهرة",
    is_available: true,
    rating:       4.7,
    total_orders: 32,
  },
  {
    id:           "t3",
    name:         "خالد عمر",
    phone:        "01033333333",
    specialty:    ["مقاولات", "تشطيبات"],
    city:         "المنيا",
    is_available: false,
    rating:       4.8,
    total_orders: 28,
  },
];

const mockMessages = [
  {
    id:        "m1",
    name:      "رامي حسن",
    phone:     "01044444444",
    subject:   "استفسار عن خدمة",
    message:   "أريد الاستفسار عن أسعار تركيب كاميرات المراقبة",
    is_read:   false,
    created_at: "2025-01-15T12:00:00Z",
  },
  {
    id:        "m2",
    name:      "نور محمد",
    phone:     "01055555555",
    subject:   "طلب عرض سعر",
    message:   "أحتاج عرض سعر لتشطيب شقة 150 متر",
    is_read:   true,
    created_at: "2025-01-14T10:00:00Z",
  },
];

// ===== الإعدادات =====
const statusConfig = {
  pending:     { label: "انتظار",   color: "#f59e0b", bg: "#fef3c7", icon: Clock },
  assigned:    { label: "مسند",     color: "#3b82f6", bg: "#dbeafe", icon: Users },
  in_progress: { label: "تنفيذ",    color: "#8b5cf6", bg: "#ede9fe", icon: Wrench },
  completed:   { label: "مكتمل",   color: "#10b981", bg: "#d1fae5", icon: CheckCircle },
  cancelled:   { label: "ملغي",     color: "#ef4444", bg: "#fee2e2", icon: XCircle },
};

const urgencyConfig = {
  urgent:    { label: "عاجل",   color: "#ef4444", bg: "#fee2e2" },
  normal:    { label: "عادي",   color: "#3b6fa0", bg: "#e8edf3" },
  scheduled: { label: "مجدول", color: "#10b981", bg: "#d1fae5" },
};

const categoryLabels: Record<string, string> = {
  electricity:  "كهرباء",
  cameras:      "كاميرات",
  data:         "اتصالات",
  maintenance:  "صيانة",
  contracting:  "مقاولات",
  realestate:   "عقاري",
};

type Request     = typeof mockRequests[0];
type Technician  = typeof mockTechnicians[0];
type Message     = typeof mockMessages[0];
type ActiveSection = "dashboard" | "requests" | "technicians" | "messages" | "settings";

export default function AdminDashboard() {
  const [isLoggedIn,     setIsLoggedIn]     = useState(false);
  const [loginData,      setLoginData]      = useState({ email: "", password: "" });
  const [loginError,     setLoginError]     = useState("");
  const [activeSection,  setActiveSection]  = useState<ActiveSection>("dashboard");
  const [requests,       setRequests]       = useState(mockRequests);
  const [technicians]                       = useState(mockTechnicians);
  const [messages,       setMessages]       = useState(mockMessages);
  const [selectedReq,    setSelectedReq]    = useState<Request | null>(null);
  const [selectedMsg,    setSelectedMsg]    = useState<Message | null>(null);
  const [searchQuery,    setSearchQuery]    = useState("");
  const [statusFilter,   setStatusFilter]   = useState("all");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignReqId,    setAssignReqId]    = useState("");

  // ===== تسجيل الدخول =====
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      loginData.email    === "admin@alhadi.com" &&
      loginData.password === "admin123"
    ) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("بيانات الدخول غير صحيحة");
    }
  };

  // ===== الإحصائيات =====
  const stats = {
    total:       requests.length,
    pending:     requests.filter((r) => r.status === "pending").length,
    inProgress:  requests.filter((r) => r.status === "in_progress").length,
    completed:   requests.filter((r) => r.status === "completed").length,
    assigned:    requests.filter((r) => r.status === "assigned").length,
    technicians: technicians.length,
    available:   technicians.filter((t) => t.is_available).length,
    unreadMsgs:  messages.filter((m) => !m.is_read).length,
  };

  // ===== فلترة الطلبات =====
  const filteredRequests = requests.filter((r) => {
    const matchSearch =
      r.client_name.includes(searchQuery) ||
      r.client_phone.includes(searchQuery) ||
      r.client_city.includes(searchQuery);
    const matchStatus =
      statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // ===== تحديث الحالة =====
  const updateStatus = (id: string, status: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    if (selectedReq?.id === id) {
      setSelectedReq((prev) => prev ? { ...prev, status } : null);
    }
  };

  // ===== إسناد الفني =====
  const assignTechnician = (reqId: string, techId: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? { ...r, technician_id: techId, status: "assigned" }
          : r
      )
    );
    setShowAssignModal(false);
    if (selectedReq?.id === reqId) {
      setSelectedReq((prev) =>
        prev ? { ...prev, technician_id: techId, status: "assigned" } : null
      );
    }
  };

  // ===== قراءة الرسالة =====
  const markAsRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
    );
  };

  // ===== شاشة تسجيل الدخول =====
  if (!isLoggedIn) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{
          background:
            "linear-gradient(135deg, #0f1b3d 0%, #1e3a5f 55%, #3b6fa0 100%)",
        }}
      >
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl border"
              style={{
                background:
                  "linear-gradient(135deg, #1e3a5f 0%, #3b6fa0 100%)",
                borderColor: "rgba(232,237,243,0.2)",
              }}
            >
              <span className="text-white font-black text-3xl">ه</span>
            </div>
            <h1 className="text-2xl font-black text-white mb-1">
              الهادي جروب
            </h1>
            <p
              className="text-sm"
              style={{ color: "rgba(232,237,243,0.6)" }}
            >
              لوحة تحكم الإدارة
            </p>
          </div>

          <div
            className="rounded-3xl p-8 border"
            style={{ backgroundColor: "white", borderColor: "rgba(232,237,243,0.2)" }}
          >
            <h2 className="text-xl font-black mb-6" style={{ color: "#0f1b3d" }}>
              تسجيل دخول الإدارة
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-bold mb-2"
                  style={{ color: "#1e3a5f" }}
                >
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  placeholder="admin@alhadi.com"
                  className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none"
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
              <div>
                <label
                  className="block text-sm font-bold mb-2"
                  style={{ color: "#1e3a5f" }}
                >
                  كلمة المرور
                </label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none"
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

              {loginError && (
                <div
                  className="flex items-center gap-2 p-3 rounded-xl text-sm"
                  style={{ backgroundColor: "#fee2e2", color: "#dc2626" }}
                >
                  <AlertCircle size={16} />
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full font-bold py-4 rounded-2xl text-white transition-all hover:scale-105"
                style={{ backgroundColor: "#1e3a5f" }}
              >
                دخول لوحة الإدارة
              </button>
            </form>

            <div
              className="mt-5 p-3 rounded-xl text-xs text-center"
              style={{ backgroundColor: "#e8edf3", color: "#3b6fa0" }}
            >
              للتجربة: admin@alhadi.com / admin123
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#f8fafc" }}>

      {/* ===== Sidebar ===== */}
      <aside
        className="w-64 min-h-screen flex flex-col sticky top-0 h-screen border-l"
        style={{ backgroundColor: "white", borderColor: "#e8edf3" }}
      >
        {/* اللوجو */}
        <div
          className="p-6 border-b"
          style={{ borderColor: "#e8edf3" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #1e3a5f 0%, #3b6fa0 100%)",
              }}
            >
              <span className="text-white font-black">ه</span>
            </div>
            <div>
              <div
                className="font-black text-sm"
                style={{ color: "#0f1b3d" }}
              >
                الهادي جروب
              </div>
              <div className="text-xs" style={{ color: "#3b6fa0" }}>
                لوحة الإدارة
              </div>
            </div>
          </div>
        </div>

        {/* القائمة */}
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: "dashboard",   label: "الرئيسية",   icon: BarChart2,    badge: 0 },
            { id: "requests",    label: "الطلبات",     icon: ClipboardList, badge: stats.pending },
            { id: "technicians", label: "الفنيون",     icon: Users,         badge: 0 },
            { id: "messages",    label: "الرسائل",     icon: MessageSquare, badge: stats.unreadMsgs },
            { id: "settings",    label: "الإعدادات",   icon: Settings,      badge: 0 },
          ].map((item) => {
            const Icon    = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as ActiveSection)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-semibold"
                style={{
                  backgroundColor: isActive ? "#1e3a5f" : "transparent",
                  color: isActive ? "white" : "rgba(30,58,95,0.7)",
                }}
              >
                <Icon size={18} />
                <span className="flex-1 text-right">{item.label}</span>
                {item.badge > 0 && (
                  <span
                    className="text-xs font-black px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: isActive
                        ? "rgba(232,237,243,0.3)"
                        : "#ef4444",
                      color: "white",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* معلومات المدير */}
        <div
          className="p-4 border-t"
          style={{ borderColor: "#e8edf3" }}
        >
          <div
            className="flex items-center gap-3 p-3 rounded-xl mb-3"
            style={{ backgroundColor: "#f8fafc" }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#e8edf3" }}
            >
              <Users size={16} style={{ color: "#1e3a5f" }} />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="text-xs font-black truncate"
                style={{ color: "#0f1b3d" }}
              >
                مدير النظام
              </div>
              <div
                className="text-xs truncate"
                style={{ color: "rgba(30,58,95,0.5)" }}
              >
                admin@alhadi.com
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border transition-colors"
            style={{
              borderColor: "#e8edf3",
              color: "#1e3a5f",
              backgroundColor: "white",
            }}
          >
            <LogOut size={15} />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* ===== المحتوى الرئيسي ===== */}
      <main className="flex-1 overflow-auto">

        {/* Header */}
        <header
          className="sticky top-0 z-30 px-6 h-16 flex items-center justify-between border-b"
          style={{
            backgroundColor: "white",
            borderColor: "#e8edf3",
          }}
        >
          <h1
            className="font-black text-lg"
            style={{ color: "#0f1b3d" }}
          >
            {activeSection === "dashboard"   && "لوحة التحكم"}
            {activeSection === "requests"    && "إدارة الطلبات"}
            {activeSection === "technicians" && "إدارة الفنيين"}
            {activeSection === "messages"    && "الرسائل"}
            {activeSection === "settings"    && "الإعدادات"}
          </h1>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                className="w-9 h-9 rounded-xl flex items-center justify-center border"
                style={{ borderColor: "#e8edf3", backgroundColor: "#f8fafc" }}
              >
                <Bell size={17} style={{ color: "#1e3a5f" }} />
              </button>
              {(stats.pending + stats.unreadMsgs) > 0 && (
                <div
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-black"
                  style={{ backgroundColor: "#ef4444" }}
                >
                  {stats.pending + stats.unreadMsgs}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-6">

          {/* ===== Dashboard ===== */}
          {activeSection === "dashboard" && (
            <div className="space-y-6">

              {/* إحصائيات */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "إجمالي الطلبات", value: stats.total,       icon: ClipboardList, color: "#1e3a5f", bg: "#e8edf3" },
                  { label: "قيد الانتظار",   value: stats.pending,     icon: Clock,         color: "#f59e0b", bg: "#fef3c7" },
                  { label: "قيد التنفيذ",    value: stats.inProgress,  icon: Wrench,        color: "#8b5cf6", bg: "#ede9fe" },
                  { label: "مكتملة",         value: stats.completed,   icon: CheckCircle,   color: "#10b981", bg: "#d1fae5" },
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={i}
                      className="bg-white rounded-2xl p-5 border"
                      style={{ borderColor: "#e8edf3" }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: s.bg }}
                        >
                          <Icon size={20} style={{ color: s.color }} />
                        </div>
                        <TrendingUp size={14} style={{ color: "rgba(30,58,95,0.25)" }} />
                      </div>
                      <div
                        className="text-3xl font-black mb-1"
                        style={{ color: "#0f1b3d" }}
                      >
                        {s.value}
                      </div>
                      <div
                        className="text-xs font-medium"
                        style={{ color: "rgba(30,58,95,0.55)" }}
                      >
                        {s.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* صف ثاني */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: "الفنيون المتاحون", value: `${stats.available}/${stats.technicians}`, icon: Users,         color: "#3b6fa0", bg: "#e8edf3" },
                  { label: "رسائل غير مقروءة", value: stats.unreadMsgs,                          icon: MessageSquare, color: "#f59e0b", bg: "#fef3c7" },
                  { label: "طلبات مسندة",       value: stats.assigned,                            icon: UserPlus,      color: "#10b981", bg: "#d1fae5" },
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={i}
                      className="bg-white rounded-2xl p-5 border"
                      style={{ borderColor: "#e8edf3" }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: s.bg }}
                        >
                          <Icon size={20} style={{ color: s.color }} />
                        </div>
                      </div>
                      <div
                        className="text-3xl font-black mb-1"
                        style={{ color: "#0f1b3d" }}
                      >
                        {s.value}
                      </div>
                      <div
                        className="text-xs font-medium"
                        style={{ color: "rgba(30,58,95,0.55)" }}
                      >
                        {s.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* آخر الطلبات */}
              <div
                className="bg-white rounded-2xl border"
                style={{ borderColor: "#e8edf3" }}
              >
                <div
                  className="flex items-center justify-between p-5 border-b"
                  style={{ borderColor: "#e8edf3" }}
                >
                  <h3
                    className="font-black"
                    style={{ color: "#0f1b3d" }}
                  >
                    آخر الطلبات
                  </h3>
                  <button
                    onClick={() => setActiveSection("requests")}
                    className="text-sm font-semibold flex items-center gap-1"
                    style={{ color: "#3b6fa0" }}
                  >
                    عرض الكل
                    <ChevronLeft size={14} />
                  </button>
                </div>
                <div className="divide-y" style={{ borderColor: "#f8fafc" }}>
                  {requests.slice(0, 4).map((req) => {
                    const status = statusConfig[req.status as keyof typeof statusConfig];
                    const StatusIcon = status.icon;
                    return (
                      <div
                        key={req.id}
                        className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => {
                          setActiveSection("requests");
                          setSelectedReq(req);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: "#e8edf3" }}
                          >
                            <Wrench size={16} style={{ color: "#1e3a5f" }} />
                          </div>
                          <div>
                            <div
                              className="font-bold text-sm"
                              style={{ color: "#0f1b3d" }}
                            >
                              {req.client_name}
                            </div>
                            <div
                              className="text-xs"
                              style={{ color: "rgba(30,58,95,0.5)" }}
                            >
                              {categoryLabels[req.service_category]} — {req.client_city}
                            </div>
                          </div>
                        </div>
                        <div
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                          style={{
                            backgroundColor: status.bg,
                            color: status.color,
                          }}
                        >
                          <StatusIcon size={11} />
                          {status.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ===== الطلبات ===== */}
          {activeSection === "requests" && (
            <div className="grid lg:grid-cols-3 gap-6">

              {/* القائمة */}
              <div className="lg:col-span-2 space-y-4">

                {/* البحث والفلترة */}
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search
                      size={16}
                      className="absolute top-1/2 right-3 -translate-y-1/2"
                      style={{ color: "rgba(30,58,95,0.4)" }}
                    />
                    <input
                      type="text"
                      placeholder="بحث بالاسم أو الهاتف أو المدينة..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pr-10 pl-4 py-3 rounded-xl border text-sm outline-none"
                      style={{
                        borderColor: "#e8edf3",
                        backgroundColor: "white",
                        color: "#0f1b3d",
                      }}
                      onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
                      onBlur={e => (e.target.style.borderColor = "#e8edf3")}
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 rounded-xl border text-sm outline-none"
                    style={{
                      borderColor: "#e8edf3",
                      backgroundColor: "white",
                      color: "#0f1b3d",
                    }}
                  >
                    <option value="all">كل الحالات</option>
                    <option value="pending">انتظار</option>
                    <option value="assigned">مسند</option>
                    <option value="in_progress">تنفيذ</option>
                    <option value="completed">مكتمل</option>
                    <option value="cancelled">ملغي</option>
                  </select>
                </div>

                {/* الطلبات */}
                <div
                  className="bg-white rounded-2xl border overflow-hidden"
                  style={{ borderColor: "#e8edf3" }}
                >
                  {filteredRequests.length === 0 ? (
                    <div className="py-16 text-center">
                      <Filter
                        size={40}
                        className="mx-auto mb-3"
                        style={{ color: "#e8edf3" }}
                      />
                      <p style={{ color: "rgba(30,58,95,0.4)" }}>
                        لا توجد نتائج
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y" style={{ borderColor: "#f8fafc" }}>
                      {filteredRequests.map((req) => {
                        const status  = statusConfig[req.status as keyof typeof statusConfig];
                        const urgency = urgencyConfig[req.urgency as keyof typeof urgencyConfig];
                        const StatusIcon = status.icon;
                        const tech = technicians.find((t) => t.id === req.technician_id);

                        return (
                          <div
                            key={req.id}
                            className="p-5 hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => setSelectedReq(req)}
                            style={{
                              borderRight: selectedReq?.id === req.id
                                ? "3px solid #1e3a5f"
                                : "3px solid transparent",
                            }}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                  <span
                                    className="font-black text-sm"
                                    style={{ color: "#0f1b3d" }}
                                  >
                                    {req.client_name}
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
                                <div
                                  className="text-xs font-semibold mb-1.5"
                                  style={{ color: "#3b6fa0" }}
                                >
                                  {categoryLabels[req.service_category]} — {req.sub_service}
                                </div>
                                <div className="flex items-center gap-3 text-xs"
                                  style={{ color: "rgba(30,58,95,0.5)" }}
                                >
                                  <span className="flex items-center gap-1">
                                    <MapPin size={11} />
                                    {req.client_city}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock size={11} />
                                    {new Date(req.created_at).toLocaleDateString("ar-EG")}
                                  </span>
                                  {tech && (
                                    <span className="flex items-center gap-1">
                                      <Users size={11} />
                                      {tech.name}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold flex-shrink-0"
                                style={{
                                  backgroundColor: status.bg,
                                  color: status.color,
                                }}
                              >
                                <StatusIcon size={11} />
                                {status.label}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* تفاصيل الطلب */}
              <div>
                {selectedReq ? (
                  <div
                    className="bg-white rounded-2xl border sticky top-20"
                    style={{ borderColor: "#e8edf3" }}
                  >
                    <div
                      className="flex items-center justify-between p-5 border-b"
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
                      {(() => {
                        const status = statusConfig[selectedReq.status as keyof typeof statusConfig];
                        const StatusIcon = status.icon;
                        return (
                          <div
                            className="flex items-center gap-2 px-4 py-3 rounded-xl"
                            style={{ backgroundColor: status.bg }}
                          >
                            <StatusIcon size={18} style={{ color: status.color }} />
                            <span className="font-black" style={{ color: status.color }}>
                              {status.label}
                            </span>
                          </div>
                        );
                      })()}

                      {/* بيانات العميل */}
                      <div>
                        <h4
                          className="text-xs font-bold mb-3 uppercase tracking-widest"
                          style={{ color: "rgba(30,58,95,0.4)" }}
                        >
                          بيانات العميل
                        </h4>
                        <div className="space-y-2.5">
                          {[
                            { icon: Users,  label: "الاسم",   value: selectedReq.client_name },
                            { icon: Phone,  label: "الهاتف",  value: selectedReq.client_phone },
                            { icon: MapPin, label: "العنوان", value: `${selectedReq.client_address}، ${selectedReq.client_city}` },
                          ].map(({ icon: Icon, label, value }, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: "#e8edf3" }}
                              >
                                <Icon size={14} style={{ color: "#1e3a5f" }} />
                              </div>
                              <div>
                                <div className="text-xs" style={{ color: "rgba(30,58,95,0.5)" }}>
                                  {label}
                                </div>
                                <div className="text-sm font-bold" style={{ color: "#0f1b3d" }}>
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
                          {[
                            { l: "الخدمة",   v: categoryLabels[selectedReq.service_category] },
                            { l: "التخصص",   v: selectedReq.sub_service },
                            { l: "الأولوية", v: urgencyConfig[selectedReq.urgency as keyof typeof urgencyConfig].label },
                          ].map(({ l, v }, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span style={{ color: "rgba(30,58,95,0.5)" }}>{l}</span>
                              <span className="font-bold" style={{ color: "#0f1b3d" }}>{v}</span>
                            </div>
                          ))}
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
                          style={{ backgroundColor: "#f8fafc", color: "rgba(30,58,95,0.8)" }}
                        >
                          {selectedReq.description}
                        </p>
                      </div>

                      {/* الفني المسند */}
                      <div>
                        <h4
                          className="text-xs font-bold mb-3 uppercase tracking-widest"
                          style={{ color: "rgba(30,58,95,0.4)" }}
                        >
                          الفني المسند
                        </h4>
                        {selectedReq.technician_id ? (
                          <div
                            className="flex items-center gap-3 p-3 rounded-xl"
                            style={{ backgroundColor: "#d1fae5" }}
                          >
                            <div
                              className="w-9 h-9 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: "#10b981" }}
                            >
                              <Users size={16} className="text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-sm" style={{ color: "#065f46" }}>
                                {technicians.find((t) => t.id === selectedReq.technician_id)?.name}
                              </div>
                              <div className="text-xs" style={{ color: "#059669" }}>
                                تم الإسناد
                              </div>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setAssignReqId(selectedReq.id);
                              setShowAssignModal(true);
                            }}
                            className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm text-white transition-all hover:scale-105"
                            style={{ backgroundColor: "#1e3a5f" }}
                          >
                            <UserPlus size={16} />
                            إسناد فني
                          </button>
                        )}
                      </div>

                      {/* تحديث الحالة */}
                      <div className="space-y-2">
                        <h4
                          className="text-xs font-bold mb-3 uppercase tracking-widest"
                          style={{ color: "rgba(30,58,95,0.4)" }}
                        >
                          تحديث الحالة
                        </h4>
                        {selectedReq.status !== "completed" &&
                          selectedReq.status !== "cancelled" && (
                          <>
                            {selectedReq.status === "pending" && (
                              <button
                                onClick={() => updateStatus(selectedReq.id, "in_progress")}
                                className="w-full font-bold py-2.5 rounded-xl text-sm text-white"
                                style={{ backgroundColor: "#8b5cf6" }}
                              >
                                بدء التنفيذ
                              </button>
                            )}
                            {selectedReq.status === "in_progress" && (
                              <button
                                onClick={() => updateStatus(selectedReq.id, "completed")}
                                className="w-full font-bold py-2.5 rounded-xl text-sm text-white"
                                style={{ backgroundColor: "#10b981" }}
                              >
                                إتمام الطلب
                              </button>
                            )}
                            <button
                              onClick={() => updateStatus(selectedReq.id, "cancelled")}
                              className="w-full font-bold py-2.5 rounded-xl text-sm border"
                              style={{
                                borderColor: "#fee2e2",
                                color: "#ef4444",
                                backgroundColor: "#fff5f5",
                              }}
                            >
                              إلغاء الطلب
                            </button>
                          </>
                        )}
                      </div>

                      {/* اتصال */}
                      <a
                        href={`tel:${selectedReq.client_phone}`}
                        className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm"
                        style={{ backgroundColor: "#e8edf3", color: "#1e3a5f" }}
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
                    <p style={{ color: "rgba(30,58,95,0.4)" }}>
                      اختر طلباً لعرض تفاصيله
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===== الفنيون ===== */}
          {activeSection === "technicians" && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {technicians.map((tech) => (
                  <div
                    key={tech.id}
                    className="bg-white rounded-2xl border p-6 hover:shadow-md transition-shadow"
                    style={{ borderColor: "#e8edf3" }}
                  >
                    {/* الهيدر */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: "#e8edf3" }}
                        >
                          <Users size={22} style={{ color: "#1e3a5f" }} />
                        </div>
                        <div>
                          <div
                            className="font-black"
                            style={{ color: "#0f1b3d" }}
                          >
                            {tech.name}
                          </div>
                          <div
                            className="text-xs"
                            style={{ color: "rgba(30,58,95,0.5)" }}
                          >
                            {tech.city}
                          </div>
                        </div>
                      </div>
                      <div
                        className="px-2.5 py-1 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: tech.is_available ? "#d1fae5" : "#fee2e2",
                          color: tech.is_available ? "#10b981" : "#ef4444",
                        }}
                      >
                        {tech.is_available ? "متاح" : "مشغول"}
                      </div>
                    </div>

                    {/* التخصصات */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tech.specialty.map((s, i) => (
                        <span
                          key={i}
                          className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: "#e8edf3", color: "#1e3a5f" }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* إحصائيات */}
                    <div
                      className="grid grid-cols-2 gap-3 p-3 rounded-xl mb-4"
                      style={{ backgroundColor: "#f8fafc" }}
                    >
                      <div className="text-center">
                        <div
                          className="text-lg font-black"
                          style={{ color: "#0f1b3d" }}
                        >
                          {tech.total_orders}
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: "rgba(30,58,95,0.5)" }}
                        >
                          طلب منجز
                        </div>
                      </div>
                      <div className="text-center">
                        <div
                          className="text-lg font-black"
                          style={{ color: "#f59e0b" }}
                        >
                          {tech.rating}⭐
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: "rgba(30,58,95,0.5)" }}
                        >
                          التقييم
                        </div>
                      </div>
                    </div>

                    {/* اتصال */}
                    <a
                      href={`tel:${tech.phone}`}
                      className="w-full flex items-center justify-center gap-2 font-bold py-2.5 rounded-xl text-sm border transition-colors"
                      style={{
                        borderColor: "#e8edf3",
                        color: "#1e3a5f",
                        backgroundColor: "white",
                      }}
                    >
                      <Phone size={15} />
                      {tech.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== الرسائل ===== */}
          {activeSection === "messages" && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div
                className="bg-white rounded-2xl border overflow-hidden"
                style={{ borderColor: "#e8edf3" }}
              >
                <div
                  className="p-5 border-b"
                  style={{ borderColor: "#e8edf3" }}
                >
                  <h3 className="font-black" style={{ color: "#0f1b3d" }}>
                    رسائل التواصل
                  </h3>
                </div>
                <div className="divide-y" style={{ borderColor: "#f8fafc" }}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-5 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedMsg(msg);
                        markAsRead(msg.id);
                      }}
                      style={{
                        borderRight: selectedMsg?.id === msg.id
                          ? "3px solid #1e3a5f"
                          : "3px solid transparent",
                        backgroundColor: !msg.is_read ? "#f0f4ff" : "white",
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: "#e8edf3" }}
                          >
                            <Users size={18} style={{ color: "#1e3a5f" }} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className="font-black text-sm"
                                style={{ color: "#0f1b3d" }}
                              >
                                {msg.name}
                              </span>
                              {!msg.is_read && (
                                <div
                                  className="w-2 h-2 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: "#3b6fa0" }}
                                />
                              )}
                            </div>
                            <div
                              className="text-xs font-semibold"
                              style={{ color: "#3b6fa0" }}
                            >
                              {msg.subject}
                            </div>
                            <p
                              className="text-xs truncate mt-0.5"
                              style={{ color: "rgba(30,58,95,0.5)" }}
                            >
                              {msg.message}
                            </p>
                          </div>
                        </div>
                        <div
                          className="text-xs flex-shrink-0"
                          style={{ color: "rgba(30,58,95,0.4)" }}
                        >
                          {new Date(msg.created_at).toLocaleDateString("ar-EG")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* تفاصيل الرسالة */}
              {selectedMsg ? (
                <div
                  className="bg-white rounded-2xl border p-6"
                  style={{ borderColor: "#e8edf3" }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-black" style={{ color: "#0f1b3d" }}>
                      {selectedMsg.subject}
                    </h3>
                    <button
                      onClick={() => setSelectedMsg(null)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "#e8edf3" }}
                    >
                      <X size={14} style={{ color: "#1e3a5f" }} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {[
                      { icon: Users, label: "المرسل", value: selectedMsg.name },
                      { icon: Phone, label: "الهاتف",  value: selectedMsg.phone },
                    ].map(({ icon: Icon, label, value }, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: "#e8edf3" }}
                        >
                          <Icon size={15} style={{ color: "#1e3a5f" }} />
                        </div>
                        <div>
                          <div className="text-xs" style={{ color: "rgba(30,58,95,0.5)" }}>
                            {label}
                          </div>
                          <div className="font-bold text-sm" style={{ color: "#0f1b3d" }}>
                            {value}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div
                      className="p-4 rounded-xl"
                      style={{ backgroundColor: "#f8fafc" }}
                    >
                      <div
                        className="text-xs font-bold mb-2"
                        style={{ color: "rgba(30,58,95,0.4)" }}
                      >
                        الرسالة
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "rgba(30,58,95,0.8)" }}
                      >
                        {selectedMsg.message}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={`tel:${selectedMsg.phone}`}
                        className="flex-1 flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm text-white"
                        style={{ backgroundColor: "#1e3a5f" }}
                      >
                        <Phone size={15} />
                        اتصل
                      </a>
                      <a
                        href={`https://wa.me/2${selectedMsg.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm text-white"
                        style={{ backgroundColor: "#25d366" }}
                      >
                        <MessageSquare size={15} />
                        واتساب
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="bg-white rounded-2xl border p-10 text-center"
                  style={{ borderColor: "#e8edf3" }}
                >
                  <Mail
                    size={40}
                    className="mx-auto mb-3"
                    style={{ color: "#e8edf3" }}
                  />
                  <p style={{ color: "rgba(30,58,95,0.4)" }}>
                    اختر رسالة لعرض تفاصيلها
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ===== الإعدادات ===== */}
          {activeSection === "settings" && (
            <div className="max-w-2xl space-y-6">
              {[
                {
                  title: "معلومات الشركة",
                  fields: [
                    { label: "اسم الشركة",         value: "الهادي جروب",               type: "text" },
                    { label: "رقم الهاتف",          value: "+20 10 2568 6280",           type: "tel" },
                    { label: "البريد الإلكتروني",  value: "alhadigroup1998@gmail.com",  type: "email" },
                  ],
                },
                {
                  title: "الفروع",
                  fields: [
                    { label: "الفرع الأول",  value: "المنيا، مصر",   type: "text" },
                    { label: "الفرع الثاني", value: "القاهرة، مصر",  type: "text" },
                  ],
                },
              ].map((section, si) => (
                <div
                  key={si}
                  className="bg-white rounded-2xl border p-6"
                  style={{ borderColor: "#e8edf3" }}
                >
                  <h3
                    className="font-black mb-5"
                    style={{ color: "#0f1b3d" }}
                  >
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.fields.map((field, fi) => (
                      <div key={fi}>
                        <label
                          className="block text-sm font-bold mb-2"
                          style={{ color: "#1e3a5f" }}
                        >
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          defaultValue={field.value}
                          className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                          style={{
                            borderColor: "#e8edf3",
                            backgroundColor: "#f8fafc",
                            color: "#0f1b3d",
                          }}
                          onFocus={e => (e.target.style.borderColor = "#3b6fa0")}
                          onBlur={e => (e.target.style.borderColor = "#e8edf3")}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="mt-5 font-bold px-6 py-2.5 rounded-xl text-sm text-white transition-all hover:scale-105"
                    style={{ backgroundColor: "#1e3a5f" }}
                  >
                    حفظ التغييرات
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ===== Modal إسناد الفني ===== */}
      {showAssignModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backgroundColor: "rgba(15,27,61,0.5)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-lg" style={{ color: "#0f1b3d" }}>
                اختر الفني المناسب
              </h3>
              <button
                onClick={() => setShowAssignModal(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#e8edf3" }}
              >
                <X size={16} style={{ color: "#1e3a5f" }} />
              </button>
            </div>

            <div className="space-y-3">
              {technicians
                .filter((t) => t.is_available)
                .map((tech) => (
                  <button
                    key={tech.id}
                    onClick={() => assignTechnician(assignReqId, tech.id)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border text-right transition-all hover:shadow-md"
                    style={{ borderColor: "#e8edf3" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "#1e3a5f")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "#e8edf3")}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#e8edf3" }}
                    >
                      <Users size={20} style={{ color: "#1e3a5f" }} />
                    </div>
                    <div className="flex-1">
                      <div className="font-black text-sm" style={{ color: "#0f1b3d" }}>
                        {tech.name}
                      </div>
                      <div className="text-xs" style={{ color: "rgba(30,58,95,0.5)" }}>
                        {tech.specialty.join(" • ")} — {tech.city}
                      </div>
                    </div>
                    <div className="text-xs font-bold" style={{ color: "#f59e0b" }}>
                      {tech.rating}⭐
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}