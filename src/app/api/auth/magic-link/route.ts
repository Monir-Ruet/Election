import { NextRequest, NextResponse } from "next/server";
import { createToken } from "@/lib/jwt";
import { Nodemailer } from "@/lib/nodemailer";

export async function POST(req: NextRequest) {
    const { email } = await req.json();

    const token = await createToken({ email }, 60 * 5);
    const link = `${req.nextUrl.origin}/api/auth/callback?token=${token}`;
    const nodemailer = new Nodemailer();

    await nodemailer.sendMail(
        email,
        "Your Magic Sign-In Link",
        `<p>Click to sign in:</p><a href="${link}">${link}</a>`,
    );

    return NextResponse.json({ success: true });
}
