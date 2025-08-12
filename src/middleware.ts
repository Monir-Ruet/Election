import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get("session")?.value;
    if (!token || !await verifyToken(token)) {
        if (req.nextUrl.pathname.startsWith("/api"))
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/((?!api|login).*)"],
};
