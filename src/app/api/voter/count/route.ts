import { ElectionContract } from "@/lib/election";
import { Result } from "@/lib/result";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const votersCount = await ElectionContract.VoterCount();
        return Result.json(200, "success", votersCount.toString());
    } catch (error) {
        return Result.json(500, 'Failed to fetch voter count');
    }
}