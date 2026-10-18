"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Outfit, Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import { Menu, X } from "lucide-react";
import "./globals.css";

/* ==========================================================================
   1. CẤU HÌNH TYPOGRAPHY
   ========================================================================== */
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

  // Xử lý ẩn/hiện Top Bar theo hướng cuộn trang (Scroll Direction)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Nếu cuộn xuống quá 10px -> Ẩn Top Bar
      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsTopBarVisible(false);
      } else {
        // Cuộn lên -> Hiện Top Bar
        setIsTopBarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${outfit.variable} ${beVietnamPro.variable} ${jetBrainsMono.variable}`}
    >
      <body className="min-h-dvh flex flex-col bg-(--surface-base) text-(--text-primary) selection:bg-[#0284C7]/20 relative">
        {/* ==================================================================
            1. TOP BAR (Cố định phía trên, ẩn/hiện khi cuộn)
           ================================================================== */}
        <header
          className={`fixed top-0 inset-x-0 z-40 bg-white border-b border-slate-200 transition-transform duration-300 ease-in-out ${
            isTopBarVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
            {/* Nút Menu gọi Left Bar */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="touch-target p-2 text-slate-700 hover:text-(--brand-primary) active:scale-95 transition-transform"
              aria-label="Mở menu điều hướng"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Tên Thương hiệu / Logo */}
            <Link
              href="/"
              className="font-heading font-bold text-base text-(--brand-primary) tracking-tight"
            >
              Lyneo Education
            </Link>

            {/* Nút Đăng nhập bằng Google */}
            <button
              type="button"
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
          </div>
        </header>

        {/* ==================================================================
            2. LEFT BAR (SIDEBAR DRAWER) & OVERLAY (Trượt từ trái sang)
           ================================================================== */}
        {/* Backdrop phủ nền mờ khi mở Left Bar */}
        <div
          onClick={() => setIsSidebarOpen(false)}
          className={`fixed inset-0 z-50 bg-slate-900/40 transition-opacity duration-300 ease-in-out ${
            isSidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          aria-hidden="true"
        />

        {/* Khung Left Bar - Tự động đóng khi chạm/bấm vào bất kỳ vị trí nào bên trong */}
        <aside
          onClick={() => setIsSidebarOpen(false)}
          className={`fixed top-0 bottom-0 left-0 z-50 w-72 max-w-[80vw] bg-white border-r border-slate-200 shadow-xl transition-transform duration-300 ease-in-out flex flex-col ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header của Left Bar */}
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

          {/* Vùng nội dung trong Left Bar (hiện chưa có gì) */}
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Nội dung menu sẽ được thêm vào đây sau */}
          </div>
        </aside>

        {/* ==================================================================
            3. KHUNG NỘI DUNG CHÍNH (MAIN CANVAS)
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