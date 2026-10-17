import type { Metadata, Viewport } from "next";
import { Outfit, Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* ==========================================================================
   1. CẤU HÌNH TYPOGRAPHY (HỖ TRỢ TIẾNG VIỆT & LẬP TRÌNH)
   ========================================================================== */
const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hệ thống Quản lý Trường học & Học tập Tập trung",
    template: "%s | Ocean Focus",
  },
  description:
    "Không gian học tập, quản trị và làm việc tập trung theo triết lý Warm Chill, Ocean Brand & Deep Focus.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F5" },
    { media: "(prefers-color-scheme: dark)", color: "#0B132B" },
  ],
};

/* ==========================================================================
   2. SCRIPT KHÔI PHỤC TÙY CHỌN TỨC THÌ (TRÁNH NHẤP NHÁY GIAO DIỆN)
   Chỉ lưu/đọc tùy chọn không nhạy cảm: theme, fontSize, audioOptIn.
   Tuyệt đối không khởi tạo AudioContext hoặc tải âm thanh khi tải trang.
   ========================================================================== */
const preferenceRestoreScript = `
(function () {
  try {
    var root = document.documentElement;
    var savedTheme = localStorage.getItem("ui-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      root.setAttribute("data-theme", savedTheme);
    }
    var savedFontScale = localStorage.getItem("ui-font-scale");
    if (savedFontScale) {
      root.style.setProperty("--user-font-scale", savedFontScale);
    }
    var savedAudioOptIn = localStorage.getItem("ui-audio-opt-in");
    root.setAttribute("data-audio-opt-in", savedAudioOptIn === "true" ? "true" : "false");
  } catch (e) {
    // Fallback an toàn về mặc định của ứng dụng nếu localStorage bị chặn
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${outfit.variable} ${beVietnamPro.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: preferenceRestoreScript }}
        />
      </head>
      <body className="min-h-dvh flex flex-col selection:bg-[#0284C7]/20">
        {/* Skip link hỗ trợ điều hướng bàn phím và trình đọc màn hình */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 glass-surface px-4 py-2 rounded-xl font-medium"
        >
          Chuyển đến nội dung chính
        </a>

        {/* Lớp nền chuyển sắc dịu nhẹ (Coral & Amber, blur 70-100px) */}
        <div className="ambient-canvas" aria-hidden="true">
          <div className="ambient-blob ambient-blob--coral" />
          <div className="ambient-blob ambient-blob--amber" />
        </div>

        {/* ==================================================================
            ĐIỀU HƯỚNG DESKTOP (≥1024px) & TABLET (768px–1023px)
            Desktop: Header dạng viên thuốc nổi (floating pill-shaped) với 3 phân vùng.
            Tablet: Thanh điều hướng kính gọn gàng giữ đủ các tác vụ chính/phụ.
           ================================================================== */}
        <header className="sticky top-4 z-40 hidden md:flex justify-center px-4 lg:px-8 pointer-events-none">
          <div
            className="glass-surface pointer-events-auto w-full max-w-6xl rounded-full px-4 py-2 flex items-center justify-between gap-4"
            role="navigation"
            aria-label="Điều hướng chính trên máy tính và máy tính bảng"
          >
            {/* Vùng Trái (Left Zone): Thương hiệu, Bật/tắt âm thanh (Opt-in), Đổi giao diện */}
            <div className="flex items-center gap-2">
              <a
                href="/"
                className="font-heading font-bold text-lg px-3 py-1.5 rounded-full text-[var(--brand-primary)] hover:text-[var(--brand-hover)] transition-colors"
              >
                OceanSchool
              </a>

              <div className="h-4 w-[1px] bg-slate-400/25 mx-1" aria-hidden="true" />

              {/* Nút bật/tắt âm thanh: Opt-in, chỉ khởi tạo Web Audio API khi người dùng chủ động nhấn */}
              <button
                type="button"
                className="touch-target spring-interactive rounded-full px-3 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                aria-label="Bật hoặc tắt âm thanh phản hồi (Mặc định tắt)"
                aria-pressed="false"
                title="Âm thanh (Opt-in)"
              >
                <span aria-hidden="true">🔇</span>
                <span className="hidden xl:inline ml-1.5">Âm thanh</span>
              </button>

              {/* Nút chuyển đổi giao diện Sáng / Tối */}
              <button
                type="button"
                className="touch-target spring-interactive rounded-full px-3 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                aria-label="Chuyển đổi giao diện Sáng hoặc Tối"
                title="Đổi giao diện Sáng/Tối"
              >
                <span aria-hidden="true">🌗</span>
              </button>
            </div>

            {/* Vùng Giữa (Center Zone): Đồng hồ tập trung (Focus Timer) & Điều hướng chính */}
            <div className="flex items-center gap-1 lg:gap-2">
              <div
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-sm font-mono"
                aria-label="Đồng hồ phiên tập trung"
              >
                <span
                  className="inline-block w-2 h-2 rounded-full bg-[var(--accent-focus)]"
                  aria-hidden="true"
                />
                <span className="font-medium">25:00</span>
              </div>

              <nav aria-label="Danh mục chính" className="flex items-center gap-1">
                <a
                  href="/dashboard"
                  className="touch-target spring-interactive px-3.5 rounded-full text-sm font-medium text-[var(--text-primary)] hover:text-[var(--brand-primary)]"
                >
                  Tổng quan
                </a>
                <a
                  href="/courses"
                  className="touch-target spring-interactive px-3.5 rounded-full text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  Lớp học
                </a>
                <a
                  href="/schedule"
                  className="touch-target spring-interactive px-3.5 rounded-full text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  Lịch biểu
                </a>
              </nav>
            </div>

            {/* Vùng Phải (Right Zone): Trạng thái người dùng & Công cụ nhanh */}
            <div className="flex items-center gap-2 secondary-chrome">
              <button
                type="button"
                className="touch-target spring-interactive rounded-full px-3 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                aria-label="Bật chế độ Deep Focus"
              >
                Chế độ Tập trung
              </button>

              <button
                type="button"
                className="btn-action-primary text-sm !rounded-full !py-2 !px-4"
              >
                Bắt đầu học
              </button>
            </div>
          </div>
        </header>

        {/* ==================================================================
            KHUNG NỘI DUNG CHÍNH (MAIN CANVAS)
            Chừa khoảng trống phía dưới trên thiết bị di động cho thanh điều hướng đáy.
           ================================================================== */}
        <main
          id="main-content"
          className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-28 md:pb-12"
        >
          {children}
        </main>

        {/* ==================================================================
            ĐIỀU HƯỚNG DI ĐỘNG (<768px)
            Thanh điều hướng kính cố định dưới đáy, mọi điểm chạm >= 44x44px.
           ================================================================== */}
        <nav
          aria-label="Điều hướng di động"
          className="md:hidden fixed bottom-0 inset-x-0 z-40 px-3 pb-3 pt-1 pointer-events-none"
        >
          <div className="glass-surface pointer-events-auto rounded-2xl px-2 py-1.5 flex items-center justify-around">
            <a
              href="/dashboard"
              className="touch-target spring-interactive flex-col gap-0.5 px-3 py-1 rounded-xl text-xs font-medium text-[var(--brand-primary)]"
            >
              <span aria-hidden="true" className="text-base">🏠</span>
              <span>Tổng quan</span>
            </a>

            <a
              href="/courses"
              className="touch-target spring-interactive flex-col gap-0.5 px-3 py-1 rounded-xl text-xs font-medium text-[var(--text-muted)]"
            >
              <span aria-hidden="true" className="text-base">📚</span>
              <span>Lớp học</span>
            </a>

            <button
              type="button"
              className="touch-target spring-interactive flex-col gap-0.5 px-3 py-1 rounded-xl text-xs font-mono font-medium text-[var(--accent-focus)]"
              aria-label="Mở đồng hồ tập trung 25 phút"
            >
              <span aria-hidden="true" className="text-base">⏱️</span>
              <span>25:00</span>
            </button>

            <button
              type="button"
              className="touch-target spring-interactive flex-col gap-0.5 px-3 py-1 rounded-xl text-xs font-medium text-[var(--text-muted)]"
              aria-label="Cài đặt âm thanh và giao diện"
            >
              <span aria-hidden="true" className="text-base">⚙️</span>
              <span>Tùy chỉnh</span>
            </button>
          </div>
        </nav>
      </body>
    </html>
  );
}