import { NextRequest, NextResponse } from "next/server";
import { verifyToken, createAccessToken, createRefreshToken } from "@/lib/jwt";
import { JwtPayload } from "jsonwebtoken";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    const payload = await verifyToken(token);
    if (!payload || typeof payload === 'string' || !(payload as JwtPayload).email)
        return NextResponse.redirect(new URL("/login", req.url));

    const email = (payload as JwtPayload).email as string;
    const sessionToken = await createAccessToken({ email }, 60 * 15);
    const refreshToken = await createRefreshToken({ email }, 60 * 60 * 24 * 30);

    const redirectUrl = new URL("/", req.url);
    const res = NextResponse.redirect(redirectUrl);
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
