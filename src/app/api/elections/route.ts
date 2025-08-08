import { NextRequest } from "next/server";
import { ElectionContract } from '@/lib/election';
import { validateRequest } from "@/lib/validate";
import { electionCreateSchema } from "@/schemas/elections/election-create-schema";
import { Result } from "@/lib/result";
import { convertObjectBigIntToString } from "@/lib/utils";
import { ContractError } from "@/types/error";

export async function GET(req: NextRequest, { params }: { params: { type: number } }) {
    try {
        let elections: any[] = [];
        if (params.type == 1)
            elections = await ElectionContract.RunningElections();
        else if (params.type == 2)
            elections = await ElectionContract.ArchievedElections();
        else if (params.type == 3)
            elections = await ElectionContract.PendingElections();
        return Result.json(200, "success", convertObjectBigIntToString(elections));
    } catch (error) {
        return Result.json(500, (error as ContractError)?.reason ?? 'Failure in fetching elections');
    }
}

export async function POST(req: NextRequest) {
    try {
        const validation = await validateRequest(req, electionCreateSchema);

        if (!validation.success) return validation.response;

        const { name, description, startDate, endDate } = validation.data;
        const u_startDate = Math.floor(new Date(startDate).getTime() / 1000);
        const u_endDate = Math.floor(new Date(endDate).getTime() / 1000);
        const tx = await ElectionContract.CreateElection(name, description, u_startDate, u_endDate);
        await tx.wait();
        if (!tx) throw new Error("Transaction failed");

        return Result.json(201, "Election created successfully", { txHash: tx.hash });
    } catch (error) {
        return Result.json(500, (error as ContractError)?.reason ?? 'Failed to create election');
    }
}