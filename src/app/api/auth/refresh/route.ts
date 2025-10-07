import { NextRequest, NextResponse } from "next/server";
import { createAccessToken, createRefreshToken, verifyTokenOfType } from "@/lib/jwt";
import { JwtPayload } from "jsonwebtoken";
import { isExternalAuthEnabled, refreshTokens } from "@/lib/auth-external";

export async function POST(req: NextRequest) {
  const existingRefresh = req.cookies.get("refresh")?.value;
  if (!existingRefresh) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const secure = process.env.NODE_ENV === "production";
  const res = NextResponse.json({ success: true });

  if (isExternalAuthEnabled()) {
    const tokens = await refreshTokens(existingRefresh);
    if (!tokens?.accessToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    res.cookies.set("session", tokens.accessToken, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure,
      maxAge: tokens.expiresIn || 60 * 15,
    });
    if (tokens.refreshToken) {
      res.cookies.set("refresh", tokens.refreshToken, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure,
        maxAge: 60 * 60 * 24 * 30,
      });
    }
    return res;
  }

  const payload = await verifyTokenOfType(existingRefresh, "refresh");
  if (!payload || typeof payload === "string") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = (payload as JwtPayload).email as string | undefined;
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessionToken = await createAccessToken({ email }, 60 * 15);
  const refreshToken = await createRefreshToken({ email }, 60 * 60 * 24 * 30);

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
