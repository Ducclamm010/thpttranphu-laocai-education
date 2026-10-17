'use client';

import React from 'react';

export default function DashboardPage() {
  // Hàm khởi tạo luồng OAuth gửi request tới Backend hoặc Google
  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/api/auth/callback/google`;
    const scope = 'email profile';
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + 
      `client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent(scope)}` +
      `&access_type=offline` +
      `&prompt=consent`;

    window.location.href = googleAuthUrl;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Topbar */}
      <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur px-6 flex items-center justify-between">
        <div className="font-bold text-xl text-indigo-400">Lyneo Dashboard</div>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm shadow-md"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12.24 10.285V13.4h6.887c-.66 2.134-2.613 3.615-5.26 3.615-3.328 0-6.026-2.721-6.026-6.026s2.698-6.026 6.026-6.026c1.47 0 2.809.53 3.844 1.405l2.42-2.42C18.66 2.502 15.61 1.5 12.24 1.5 6.467 1.5 1.785 6.182 1.785 11.955S6.467 22.41 12.24 22.41c6.51 0 11.1-4.582 11.1-10.955 0-.74-.076-1.39-.185-2.025H12.24z"/>
          </svg>
          Đăng nhập với Google
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-6xl w-full mx-auto space-y-6">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-2">Trang Dashboard Test Backend</h1>
          <p className="text-slate-400">
            Bấm nút <strong>Đăng nhập với Google</strong> ở Topbar để test luồng OAuth gửi mã <code className="bg-slate-900 px-2 py-1 rounded text-indigo-300">code</code> về Backend API.
          </p>
        </div>

        {/* Khối hiển thị thông số test */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/30 border border-slate-800 rounded-lg p-5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Trạng thái</span>
            <p className="text-lg font-medium text-emerald-400 mt-1">Chưa xác thực</p>
          </div>
          <div className="bg-slate-800/30 border border-slate-800 rounded-lg p-5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Callback Target</span>
            <p className="text-sm font-mono text-slate-300 mt-1 truncate">/api/auth/callback/google</p>
          </div>
          <div className="bg-slate-800/30 border border-slate-800 rounded-lg p-5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Redirect Target</span>
            <p className="text-sm font-mono text-slate-300 mt-1 truncate">/profile</p>
          </div>
        </div>
      </main>
    </div>
  );
}