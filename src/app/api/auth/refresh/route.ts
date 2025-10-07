import { NextRequest, NextResponse } from "next/server";
import { createAccessToken, createRefreshToken, verifyTokenOfType } from "@/lib/jwt";
import { JwtPayload } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const refresh = req.cookies.get("refresh")?.value;
  if (!refresh) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyTokenOfType(refresh, "refresh");
  if (!payload || typeof payload === "string") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = (payload as JwtPayload).email as string | undefined;
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessionToken = await createAccessToken({ email }, 60 * 15);
  const refreshToken = await createRefreshToken({ email }, 60 * 60 * 24 * 30);

  const res = NextResponse.json({ success: true });
  const secure = process.env.NODE_ENV === "production";
  res.cookies.set("session", sessionToken, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure,
    maxAge: 60 * 15,
  });
  res.cookies.set("refresh", refreshToken, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure,
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
