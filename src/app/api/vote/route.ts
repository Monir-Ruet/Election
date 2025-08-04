import { ElectionContract } from "@/lib/election";
import { Result } from "@/lib/result";
import { validateRequest } from "@/lib/validate";
import { voteSchema } from "@/schemas/vote/vote-schema";
import { NextRequest } from "next/server";

export default async function POST(req: NextRequest) {
    try {
        const validation = await validateRequest(req, voteSchema);
        if (!validation.success) return validation.response;
        const { nid, electionId, candidateId } = validation.data;
        const tx = await ElectionContract.Vote(nid, electionId, candidateId);
        await tx.wait();
        if (!tx) throw new Error("Transaction failed");
        return Result.json(201, `Vote successful`, { transactionHash: tx.hash });
    } catch (error) {
        return Result.json(500, (error as any)?.reason ?? 'Voting Failed, Please try again.');
    }
}