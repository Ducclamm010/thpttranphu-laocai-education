"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Outfit, Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import { Menu, X, LogOut, User as UserIcon, Shield } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Quản lý trạng thái người dùng
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const supabase = createClient();

  // 1. Kiểm tra & Lắng nghe trạng thái đăng nhập từ Supabase
  useEffect(() => {
    async function getUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    }

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  // 2. Xử lý ẩn/hiện Top Bar khi cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsTopBarVisible(false);
      } else {
        setIsTopBarVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Xử lý Đăng nhập Google
  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID; // Lấy từ Google Cloud Console
    const redirectUri = `${window.location.origin}/profile`;
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile`;
    
    // Chuyển hướng người dùng sang trang chọn tài khoản của Google
    window.location.href = googleAuthUrl;
    };

  // Xử lý Đăng xuất
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsProfileMenuOpen(false);
  };

  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${outfit.variable} ${beVietnamPro.variable} ${jetBrainsMono.variable}`}
    >
      <body className="min-h-dvh flex flex-col bg-(--surface-base) text-(--text-primary) selection:bg-[#0284C7]/20 relative">
        {/* ==================================================================
            1. TOP BAR
           ================================================================== */}
        <header
          className={`fixed top-0 inset-x-0 z-40 bg-white border-b border-slate-200 transition-transform duration-300 ease-in-out ${
            isTopBarVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
            {/* Nút Menu Left Bar */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="touch-target p-2 text-slate-700 hover:text-(--brand-primary) active:scale-95 transition-transform"
              aria-label="Mở menu điều hướng"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo Thương hiệu */}
            <Link
              href="/"
              className="font-heading font-bold text-base text-(--brand-primary) tracking-tight"
            >
              Lyneo Education
            </Link>

            {/* VÙNG HIỂN THỊ ĐỘNG: NÚT ĐĂNG NHẬP / AVATAR NGƯỜI DÙNG */}
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
            ) : user ? (
              /* ĐÃ ĐĂNG NHẬP: Hiển thị Avatar + Tên + Quyền */
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 active:scale-95 transition-all"
                >
                <Image
                  src={
                    user.user_metadata?.avatar_url ||
                    "https://via.placeholder.com/150"
                  }
                  alt={user.user_metadata?.full_name || "User Avatar"}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
                </button>

                {/* Dropdown Menu Cá nhân khi bấm vào Avatar */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-2 border-b border-slate-100 space-y-0.5">
                      <p className="font-semibold text-xs text-(--text-primary) truncate">
                        {user.user_metadata?.full_name || "Học sinh"}
                      </p>
                      <p className="text-[11px] text-(--text-muted) truncate">
                        {user.email}
                      </p>
                      {/* Badge Quyền (Role) */}
                      <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-md bg-sky-50 text-(--brand-primary) text-[10px] font-semibold">
                        <Shield className="w-3 h-3" />
                        <span>Học sinh</span>
                      </span>
                    </div>

                    <div className="pt-1 space-y-0.5">
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-slate-500" />
                        <span>Trang cá nhân</span>
                      </Link>

                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* CHƯA ĐĂNG NHẬP: Hiển thị Nút Đăng nhập Google */
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 active:scale-95 text-xs font-semibold text-slate-700 transition-all"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Đăng nhập</span>
              </button>
            )}
          </div>
        </header>

        {/* ==================================================================
            2. LEFT BAR & OVERLAY
           ================================================================== */}
        <div
          onClick={() => setIsSidebarOpen(false)}
          className={`fixed inset-0 z-50 bg-slate-900/40 transition-opacity duration-300 ease-in-out ${
            isSidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          aria-hidden="true"
        />

        <aside
          onClick={() => setIsSidebarOpen(false)}
          className={`fixed top-0 bottom-0 left-0 z-50 w-72 max-w-[80vw] bg-white border-r border-slate-200 shadow-xl transition-transform duration-300 ease-in-out flex flex-col ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-14 px-4 border-b border-slate-100 flex items-center justify-between shrink-0">
            <span className="font-heading font-bold text-sm text-(--text-primary)">
              Menu ứng dụng
            </span>
            <button
              type="button"
              className="touch-target p-1 text-slate-400 hover:text-slate-600"
              aria-label="Đóng menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {/* Nội dung menu tùy chọn ở đây */}
          </div>
        </aside>

        {/* ==================================================================
            3. KHUNG NỘI DUNG CHÍNH
           ================================================================== */}
        <main
          id="main-content"
          className="flex-1 w-full max-w-md mx-auto px-4 pt-18 pb-8"
        >
          {children}
        </main>
      </body>
    </html>
  );
}