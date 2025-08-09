import { NextRequest, NextResponse } from "next/server";
import { verifyToken, createToken } from "@/lib/jwt";
import { JwtPayload } from "jsonwebtoken";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    const payload = await verifyToken(token);
    if (!payload || typeof payload === 'string' || !(payload as JwtPayload).email)
        return NextResponse.redirect(new URL("/login", req.url));

    const sessionToken = await createToken({ email: (payload as JwtPayload).email }, 15 * 60);
    const redirectUrl = new URL("/dashboard", req.url);
    const res = NextResponse.redirect(redirectUrl);
    res.cookies.set("session", sessionToken, { httpOnly: true, path: "/" });
    return res;
}
