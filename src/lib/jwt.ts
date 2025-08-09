import { SignJWT } from "jose";
import { jwtVerify } from "jose";
import { JwtPayload } from "jsonwebtoken";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function createToken(payload: object, expiresIn = 60 * 60) {
    const alg = "HS256";

    return await new SignJWT(payload as JwtPayload)
        .setProtectedHeader({ alg })
        .setExpirationTime(Math.floor(Date.now() / 1000) + expiresIn)
        .sign(secret);
}


export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (err) {
        console.log(err);
        return null;
    }
}