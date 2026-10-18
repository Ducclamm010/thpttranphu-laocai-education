"use client";

import { useEffect, useState, useCallback, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

function ProfileContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Phân loại: "student" hoặc "teacher"
  const [role, setRole] = useState<"student" | "teacher">("student");

  // Form dữ liệu chi tiết
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    gender: "Nam",
    dob: "",
    citizenId: "",
    specificCode: "", // Mã học sinh hoặc Mã giáo viên
    phone: "",
    avatar: "",
    googleId: "",
  });

  const hasFetched = useRef(false);
// Xử lý gọi API lấy thông tin Google
  const handleGoogleCallback = useCallback(async (authCode: string) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/auth/google-callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: authCode }),
      });

      const data = await res.json();
      if (res.ok && data.profile) {
        setFormData((prev) => ({
          ...prev,
          email: data.profile.email,
          name: data.profile.name,
          avatar: data.profile.avatar,
          googleId: data.profile.googleId,
        }));
      } else {
        setErrorMsg(data.message || "Token hoặc mã xác thực không hợp lệ!");
      }
    } catch {
      // Đã loại bỏ biến error thừa
      setErrorMsg("Lỗi kết nối đến máy chủ xác thực.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!code) {
      // Dùng queueMicrotask để tránh lỗi gọi setState đồng bộ trong useEffect
      queueMicrotask(() => {
        setErrorMsg("Không tìm thấy mã xác thực từ Google.");
      });
      return;
    }

    if (!hasFetched.current) {
      hasFetched.current = true;
      handleGoogleCallback(code);
    }
  }, [code, handleGoogleCallback]);

  // 2. Validate và Gửi dữ liệu tạo tài khoản lên Backend
  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validate phía Client trước khi gửi
    if (!formData.citizenId || formData.citizenId.length < 9) {
      setErrorMsg("Căn cước công dân không hợp lệ.");
      return;
    }
    if (!formData.specificCode) {
      setErrorMsg(role === "student" ? "Vui lòng nhập Mã học sinh." : "Vui lòng nhập Mã giáo viên.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/user/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });

      const data = await res.json();
      if (res.ok) {
        // Tạo session thành công -> Chuyển hướng về trang chủ '/'
        router.push("/");
      } else {
        setErrorMsg(data.message || "Không thể khởi tạo tài khoản. Vui lòng kiểm tra lại thông tin.");
      }
    } catch (error) {
      setErrorMsg("Đã xảy ra lỗi trong quá trình lưu thông tin.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 py-6">
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-5">
        <div>
          <h1 className="text-xl font-bold font-heading text-(--text-primary)">
            Hoàn thiện Hồ sơ Khởi tạo
          </h1>
          <p className="text-xs text-(--text-muted) mt-1">
            Vui lòng chọn vai trò và điền chính xác thông tin cá nhân của bạn.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Lựa chọn Mục: Học sinh hay Giáo viên */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              role === "student"
                ? "bg-white text-(--brand-primary) shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            👨‍🎓 Học sinh
          </button>
          <button
            type="button"
            onClick={() => setRole("teacher")}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              role === "teacher"
                ? "bg-white text-(--brand-primary) shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            👩‍🏫 Giáo viên
          </button>
        </div>

        <form onSubmit={handleSubmitProfile} className="space-y-4">
          {/* Avatar & Email hiển thị */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-200 shrink-0">
              <Image
                src={formData.avatar || "https://via.placeholder.com/150"}
                alt="Avatar"
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] font-semibold text-slate-400">Email Google</p>
              <p className="text-xs font-mono text-(--text-primary) truncate">{formData.email || "Đang tải..."}</p>
            </div>
          </div>

          {/* Họ và tên */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--text-primary)">Họ và tên *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-(--brand-primary)"
              required
            />
          </div>

          {/* Giới tính & Ngày sinh */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--text-primary)">Giới tính *</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:outline-none focus:border-(--brand-primary)"
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--text-primary)">Ngày sinh *</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-(--brand-primary)"
                required
              />
            </div>
          </div>

          {/* Căn cước công dân */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--text-primary)">Căn cước công dân (CCCD) *</label>
            <input
              type="text"
              placeholder="Nhập số CCCD 12 chữ số"
              value={formData.citizenId}
              onChange={(e) => setFormData({ ...formData, citizenId: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-(--brand-primary)"
              required
            />
          </div>

          {/* Mã học sinh hoặc Mã giáo viên (Thay đổi theo role) */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--text-primary)">
              {role === "student" ? "Mã học sinh *" : "Mã giáo viên *"}
            </label>
            <input
              type="text"
              placeholder={role === "student" ? "VD: HS2026001" : "VD: GV2026001"}
              value={formData.specificCode}
              onChange={(e) => setFormData({ ...formData, specificCode: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-(--brand-primary)"
              required
            />
          </div>

          {/* Số điện thoại (Tùy chọn) */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--text-primary)">Số điện thoại (Tùy chọn)</label>
            <input
              type="tel"
              placeholder="VD: 0912345678"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-(--brand-primary)"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-action-primary w-full text-center py-2.5 rounded-xl font-semibold text-sm mt-2"
          >
            {loading ? "Đang xử lý hệ thống..." : "Hoàn tất & Vào trang chủ"}
          </button>
        </form>
      </div>
    </div>
  );
}

// Bọc Suspense để giải quyết triệt để lỗi useSearchParams của Next.js
export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Đang tải trang hồ sơ...</div>}>
      <ProfileContent />
    </Suspense>
  );
}