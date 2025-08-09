import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get("session")?.value;
    if (!token || !await verifyToken(token)) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
