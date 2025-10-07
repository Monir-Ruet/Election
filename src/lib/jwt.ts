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

export type TokenType = "access" | "refresh";

export async function createTypedToken(
    payload: object,
    type: TokenType,
    expiresInSeconds: number
) {
    const alg = "HS256";
    return await new SignJWT({ ...(payload as JwtPayload), type })
        .setProtectedHeader({ alg })
        .setExpirationTime(Math.floor(Date.now() / 1000) + expiresInSeconds)
        .sign(secret);
}

export async function createAccessToken(payload: object, expiresInSeconds = 60 * 15) {
    return createTypedToken(payload, "access", expiresInSeconds);
}

export async function createRefreshToken(payload: object, expiresInSeconds = 60 * 60 * 24 * 30) {
    return createTypedToken(payload, "refresh", expiresInSeconds);
}

export async function verifyTokenOfType(token: string, expectedType?: TokenType) {
    try {
        const { payload } = await jwtVerify(token, secret);
        if (expectedType && (payload as JwtPayload & { type?: string }).type !== expectedType) {
            return null;
        }
        return payload;
    } catch (err) {
        console.log(err);
        return null;
    }
}