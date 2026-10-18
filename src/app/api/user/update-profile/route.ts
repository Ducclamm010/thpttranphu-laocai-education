import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Sử dụng Service Role Key nếu cần quyền ghi dữ liệu bảo mật, hoặc Anon Key nếu cấu hình RLS cho phép
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, gender, dob, citizenId, specificCode, phone, role, googleId } = body;

    // Kiểm tra dữ liệu bắt buộc phía Server
    if (!email || !citizenId || !specificCode || !role || !googleId) {
      return NextResponse.json(
        { message: "Vui lòng cung cấp đầy đủ thông tin bắt buộc." },
        { status: 400 }
      );
    }

    // Kiểm tra xem CCCD hoặc Mã định danh (Học sinh/Giáo viên) đã tồn tại trong database chưa
    const { data: existingUser, error: checkError } = await supabase
      .from("profiles")
      .select("id, google_id")
      .or(`citizen_id.eq.${citizenId},specific_code.eq.${specificCode}`)
      .maybeSingle();

    if (checkError) {
        return NextResponse.json(
            { message: "Lỗi kiểm tra cơ sở dữ liệu: " + checkError.message },
            { status: 500 }
        );
    }

    if (existingUser) {
      return NextResponse.json(
        { message: "Căn cước công dân hoặc Mã định danh này đã tồn tại trong hệ thống." },
        { status: 400 }
      );
    }

    // Tiến hành lưu bản ghi mới vào bảng `profiles` trên Supabase
    const { error: insertError } = await supabase.from("profiles").insert([
      {
        google_id: googleId,
        email,
        full_name: name,
        gender,
        dob,
        citizen_id: citizenId,
        specific_code: specificCode,
        phone: phone || null,
        role, // 'student' hoặc 'teacher'
      },
    ]);

    if (insertError) {
      return NextResponse.json(
        { message: "Lỗi cơ sở dữ liệu: " + insertError.message },
        { status: 500 }
      );
    }

    // Tạo Session/Cookie bảo mật cho người dùng sau khi hoàn tất tạo tài khoản
    const response = NextResponse.json({
      success: true,
      message: "Khởi tạo tài khoản thành công!",
    });

    response.cookies.set("lyneo_session", googleId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // Phiên làm việc kéo dài 7 ngày
    });

    return response;
  } catch (error) {
    console.error("Lỗi khi xử lý POST /api/user/update-profile:", error);
    return NextResponse.json(
      { message: "Đã xảy ra lỗi nội bộ trên máy chủ." },
      { status: 500 }
    );
  }
}