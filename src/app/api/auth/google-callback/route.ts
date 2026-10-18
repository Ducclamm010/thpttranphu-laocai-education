import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { message: "Thiếu mã xác thực (code) từ Google." },
        { status: 400 }
      );
    }

    // 1. Đổi code lấy Google Access Token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/profile`,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || !tokenData.access_token) {
      return NextResponse.json(
        { message: "Mã xác thực Google không hợp lệ hoặc đã hết hạn." },
        { status: 400 }
      );
    }

    // 2. Lấy thông tin tài khoản người dùng từ Google
    const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const userData = await userRes.json();

    if (!userRes.ok || !userData.email) {
      return NextResponse.json(
        { message: "Không thể lấy thông tin người dùng từ Google." },
        { status: 400 }
      );
    }

    // Trả về thông tin profile tạm thời cho Client hiển thị lên form
    return NextResponse.json({
      profile: {
        email: userData.email,
        name: userData.name,
        avatar: userData.picture,
        googleId: userData.sub,
      },
    });
  } catch (error) {
    console.error("Lỗi khi xử lý callback Google:", error);
    return NextResponse.json(
      { message: "Lỗi hệ thống khi xử lý xác thực Google." },
      { status: 500 }
    );
  }
}