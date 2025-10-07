import { NextResponse, NextRequest } from "next/server";
import { verifyToken, verifyTokenOfType, createAccessToken } from "@/lib/jwt";
import { introspectAccessToken, isExternalAuthEnabled, refreshTokens } from "@/lib/auth-external";

export default async function middleware(req: NextRequest) {
    const access = req.cookies.get("session")?.value;
    const refresh = req.cookies.get("refresh")?.value;

    if (access) {
        if (isExternalAuthEnabled()) {
            if (await introspectAccessToken(access)) {
                return NextResponse.next();
            }
        } else if (await verifyToken(access)) {
            return NextResponse.next();
        }
    }

    if (refresh) {
        if (isExternalAuthEnabled()) {
            const tokens = await refreshTokens(refresh);
            if (tokens?.accessToken) {
                const res = NextResponse.next();
                const secure = process.env.NODE_ENV === "production";
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
        } else {
            const payload = await verifyTokenOfType(refresh, "refresh");
            if (payload && typeof payload !== "string") {
                const email = (payload as any).email as string | undefined;
                if (email) {
                    const newAccess = await createAccessToken({ email }, 60 * 15);
                    const res = NextResponse.next();
                    const secure = process.env.NODE_ENV === "production";
                    res.cookies.set("session", newAccess, {
                        httpOnly: true,
                        path: "/",
                        sameSite: "lax",
                        secure,
                        maxAge: 60 * 15,
                    });
                    return res;
                }
            }
        }
    }

    if (req.nextUrl.pathname.startsWith("/api"))
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
    matcher: ["/dashboard/:path*", "/"],
};
