import { ElectionContract } from "@/lib/election";
import { Result } from "@/lib/result";
import { convertObjectBigIntToString } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    {
        params,
    }: {
        params: {
            eId: string;
            cId: string;
        };
    }
) {
    try {
        const { eId, cId } = params;
        if (!eId || !cId) {
            return Result.json(400, "Election ID and Candidate ID are required");
        }
        const candidate = await ElectionContract.CandidateById(eId, cId);
        if (!candidate || candidate[1] === "") {
            return Result.json(404, "Candidate not found");
        }
        return Result.json(201, `success`, convertObjectBigIntToString(candidate));
    } catch (error) {
        return Result.json(500, (error as any)?.reason ?? 'Failed to retrieve voter');
    }
}