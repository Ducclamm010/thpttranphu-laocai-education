# GEMINI.md - Phân tích & Tổng quan Dự án

## 1. Tổng quan Dự án (Project Overview)
- **Tên dự án:** `thpttranphu-laocai-education`
- **Mục tiêu:** Nền tảng web giáo dục và thông tin dành cho Trường THPT Trần Phú - Lào Cai.
- **Hiện trạng:** Dự án vừa được khởi tạo bằng `create-next-app` sử dụng **Next.js 16 (App Router)** kết hợp với **React 19**, **Tailwind CSS v4**, và **TypeScript**.

---

## 2. Công nghệ & Thư viện (Tech Stack)

### Core Framework & Libraries
- **Framework:** Next.js `16.4.0` (App Router)
- **UI Library:** React `19.3.0` & React DOM `19.3.0`
- **Language:** TypeScript `^5` (Configured strict mode, path alias `@/*` -> `./src/*`)

### Styling & Design System
- **CSS Framework:** Tailwind CSS `^4` (Configured via `@import "tailwindcss";` & Turbopack loader)
- **Typography:** Google Geist Sans (`--font-geist-sans`) & Geist Mono (`--font-geist-mono`)

### Build Tools & Performance
- **Bundler / Compiler:** Turbopack & React Compiler (`babel-plugin-react-compiler`)
- **Experimental / Advanced Next.js features:**
  - `cacheComponents: true`
  - `partialPrefetching: true`
  - `reactCompiler: true`

### Code Quality & Linting
- **Linter:** ESLint `^9` (`eslint-config-next`)

---

## 3. Cấu trúc Thư mục Dự án (Project Structure)

```text
thpttranphu-laocai-education/
├── .agents/                 # Thư viện AI Agent Skills hỗ trợ phát triển dự án
├── public/                  # Tài nguyên tĩnh (Logos, SVGs, Images, Icons)
│   ├── favicon.ico
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   └── app/                 # Next.js App Router
│       ├── favicon.ico
│       ├── globals.css      # Cấu hình Tailwind CSS v4 & CSS Variables
│       ├── layout.tsx       # Root Layout tích hợp Fonts & Base HTML structure
│       └── page.tsx         # Trang chủ hiện tại (Trang mẫu mặc định)
├── GEMINI.md                # Tài liệu tổng quan & phân tích dự án
├── next.config.ts           # Cấu hình Next.js (React Compiler, Turbopack, Prefetching)
├── package.json             # Danh sách dependencies & scripts
├── tsconfig.json            # Cấu hình TypeScript
└── eslint.config.mjs        # Cấu hình ESLint
```

---

## 4. Scripts & Lệnh Thường Dùng (Available Scripts)

Trong `package.json`:
- `npm run dev`: Khởi chạy môi trường phát triển (Development Server với Turbopack).
- `npm run build`: Biên dịch và tối ưu ứng dụng cho môi trường Production.
- `npm run start`: Chạy ứng dụng Production sau khi đã build.
- `npm run lint`: Kiểm tra lỗi cú pháp và tiêu chuẩn code với ESLint.

---

## 5. Hướng phát triển & Đề xuất tiếp theo (Roadmap & Next Steps)

1. **Thiết lập Kiến trúc Trang Web Giáo Dục:**
   - **Xây dựng Router & Trang chính:** Trang chủ, Giới thiệu nhà trường, Tin tức - Sự kiện, Đội ngũ giáo viên, Tuyển sinh, Hoạt động đoàn đội, Liên hệ.
   - **Xây dựng Components dùng chung:** Header/Navbar, Footer, Banner/Hero Section, Card bài viết, Sidebar tin tức.

2. **Quản lý Dữ liệu & CMS:**
   - Tích hợp CMS (Strapi, Payload CMS, Sanity) hoặc xây dựng REST/GraphQL API / Server Actions cho bài viết, thông báo, lịch công tác.

3. **Giao diện & Trải nghiệm Người dùng (UI/UX):**
   - Thiết kế nhận diện thương hiệu theo tông màu trường THPT Trần Phú - Lào Cai.
   - Tối ưu Responsive trên Mobile, Tablet và Desktop.
   - Hỗ trợ Dark Mode / Light Mode tốt hơn.

4. **SEO & Tối ưu hóa:**
   - Cấu hình OpenGraph metadata, Dynamic Metadata cho từng trang bài viết/tin tức.
