'use client';

import React from 'react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-xl p-6 text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
          ✓
        </div>
        <h2 className="text-xl font-bold">Xác thực thành công!</h2>
        <p className="text-slate-400 text-sm">
          Backend đã xử lý Google Code thành công và điều hướng về trang <code className="text-indigo-400">/profile</code>.
        </p>
        <a 
          href="/dashboard" 
          className="inline-block mt-4 text-sm text-indigo-400 hover:text-indigo-300 underline"
        >
          ← Quay lại Dashboard
        </a>
      </div>
    </div>
  );
}