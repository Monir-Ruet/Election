import { ZodSchema } from "zod";
import { NextRequest, NextResponse } from "next/server";

export async function validateRequest<T>(
    req: NextRequest,
    schema: ZodSchema<T>
): Promise<
    | { success: true; data: T }
    | { success: false; response: NextResponse }
> {
    try {
        const body = await req.json();
        const result = schema.safeParse(body);

        if (!result.success) {
            const response = NextResponse.json(
                { errors: result.error.flatten().fieldErrors },
                { status: 400 }
            );
            return { success: false, response };
        }

        return { success: true, data: result.data };
    } catch (error) {
        return {
            success: false,
            response: NextResponse.json({ error: "Invalid JSON" }, { status: 400 }),
        };
    }
}
