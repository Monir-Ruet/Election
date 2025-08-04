import { NextRequest } from "next/server";
import { ElectionContract } from '@/lib/election';
import { Result } from "@/lib/result";

export async function GET(req: NextRequest, { params }: { params: { nid: string } }) {
    try {
        const { nid } = await params;
        if (!nid)
            return Result.json(400, "NID is required");

        const voter = await ElectionContract.VoterByNid(nid);

        if (!voter || voter.name === "") {
            return Result.json(404, "Voter not found");
        }

        return Result.json(200, "success", voter);
    }
    catch (error) {
        return Result.json(500, (error as any)?.reason ?? 'Failed to retrieve voter');
    }
}
