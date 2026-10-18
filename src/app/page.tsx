import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6 md:space-y-10">
      {/* 1. HERO BANNER */}
      <section className="glass-card p-5 sm:p-8 border border-slate-200 bg-white rounded-2xl shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-(--brand-primary) text-xs sm:text-sm font-semibold">
            <span>✨ THPT Trần Phú – Lào Cai</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold font-heading text-(--text-primary) leading-tight">
            Không gian học tập & Quản lý tập trung
          </h1>

          <p className="text-sm sm:text-base text-(--text-secondary) leading-relaxed">
            Hệ thống hỗ trợ học sinh theo dõi tiến độ học tập, nộp bài tập trực tiếp qua Google Drive và duy trì thói quen tập trung hiệu quả mỗi ngày.
          </p>

          {/* Cụm nút thao tác */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/dashboard"
              className="btn-action-primary w-full sm:w-auto text-center"
            >
              Vào Bảng điều khiển ➔
            </Link>
            <Link
              href="/courses"
              className="touch-target border border-slate-300 bg-white text-(--text-primary) font-semibold text-sm rounded-xl px-5 py-2.5 hover:bg-slate-50 text-center w-full sm:w-auto transition-colors"
            >
              Xem Lớp học của tôi
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CHỈ SỐ TỔNG QUAN (METRIC CARDS) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-card p-4 border border-slate-200 bg-white">
          <p className="text-xs text-(--text-muted) font-medium">Lớp đang tham gia</p>
          <p className="text-2xl font-bold font-mono text-(--brand-primary) mt-1">05</p>
          <span className="text-[11px] text-slate-500 mt-1 block">Học kỳ 1 • 2026</span>
        </div>

        <div className="glass-card p-4 border border-slate-200 bg-white">
          <p className="text-xs text-(--text-muted) font-medium">Bài tập cần nộp</p>
          <p className="text-2xl font-bold font-mono text-(--action-primary) mt-1">02</p>
          <span className="text-[11px] text-amber-600 font-medium mt-1 block">Hạn trong 24h</span>
        </div>

        <div className="glass-card p-4 border border-slate-200 bg-white">
          <p className="text-xs text-(--text-muted) font-medium">Điểm trung bình</p>
          <p className="text-2xl font-bold font-mono text-(--accent-success) mt-1">8.6</p>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">Xếp loại: Giỏi</span>
        </div>

        <div className="glass-card p-4 border border-slate-200 bg-white">
          <p className="text-xs text-(--text-muted) font-medium">Thời gian tập trung</p>
          <p className="text-2xl font-bold font-mono text-(--accent-focus) mt-1">120m</p>
          <span className="text-[11px] text-slate-500 mt-1 block">Tuần này</span>
        </div>
      </section>

      {/* 3. TÁC VỤ NHANH DÀNH CHO DI ĐỘNG */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold font-heading text-(--text-primary)">
          Thao tác nhanh
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="/submit-assignment"
            className="glass-card p-4 border border-slate-200 bg-white flex items-center justify-between hover:border-(--brand-primary) transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-sky-50 text-(--brand-primary) flex items-center justify-center text-xl shrink-0">
                📤
              </span>
              <div>
                <h3 className="font-semibold text-sm text-(--text-primary) group-hover:text-(--brand-primary)">
                  Nộp bài qua Drive
                </h3>
                <p className="text-xs text-(--text-muted)">Tải file PDF, DOCX, XLSX</p>
              </div>
            </div>
            <span className="text-slate-400 font-mono text-sm">➔</span>
          </a>

          <a
            href="/schedule"
            className="glass-card p-4 border border-slate-200 bg-white flex items-center justify-between hover:border-(--brand-primary) transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shrink-0">
                📅
              </span>
              <div>
                <h3 className="font-semibold text-sm text-(--text-primary) group-hover:text-(--brand-primary)">
                  Lịch kiểm tra
                </h3>
                <p className="text-xs text-(--text-muted)">Cập nhật theo tuần</p>
              </div>
            </div>
            <span className="text-slate-400 font-mono text-sm">➔</span>
          </a>

          <a
            href="/focus"
            className="glass-card p-4 border border-slate-200 bg-white flex items-center justify-between hover:border-(--brand-primary) transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0">
                ⏱️
              </span>
              <div>
                <h3 className="font-semibold text-sm text-(--text-primary) group-hover:text-(--brand-primary)">
                  Đồng hồ Pomodoro
                </h3>
                <p className="text-xs text-(--text-muted)">Chế độ Deep Focus 25 phút</p>
              </div>
            </div>
            <span className="text-slate-400 font-mono text-sm">➔</span>
          </a>
        </div>
      </section>

      {/* 4. DANH SÁCH BÀI TẬP MỚI NHẤT */}
      <section className="glass-card p-4 sm:p-6 border border-slate-200 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold font-heading text-(--text-primary)">
            Bài tập gần đây
          </h2>
          <Link
            href="/assignments"
            className="text-xs sm:text-sm font-semibold text-(--brand-primary) hover:underline"
          >
            Xem tất cả
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="font-semibold text-sm text-(--text-primary)">
                Toán học 10: Thực hành Thuật toán Tra cứu Đồ thị
              </p>
              <p className="text-xs text-(--text-muted)">Môn Tin học • Lớp 10A1</p>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
              <span className="text-xs font-mono font-medium text-(--action-primary) bg-red-50 px-2 py-1 rounded">
                Hạn: 23:59 Hôm nay
              </span>
              <a
                href="/submit"
                className="text-xs font-semibold text-white bg-(--action-primary) px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
              >
                Nộp ngay
              </a>
            </div>
          </div>

          <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="font-semibold text-sm text-(--text-primary)">
                Ngữ Văn 10: Phân tích Tác phẩm Văn học Dân gian
              </p>
              <p className="text-xs text-(--text-muted)">Môn Ngữ Văn • Lớp 10A1</p>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
              <span className="text-xs font-mono font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
                Hạn: 20/10/2026
              </span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
                Đã nộp
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}