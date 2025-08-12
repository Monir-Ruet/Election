import { NextRequest } from "next/server";
import { ElectionContract } from '@/lib/election';
import { validateRequest } from "@/lib/validate";
import { electionCreateSchema } from "@/schemas/elections/election-create-schema";
import { Result } from "@/lib/result";
import { convertObjectBigIntToString } from "@/lib/utils";
import { ContractError } from "@/types/error";
import { ElectionStructOutput } from "../../../../typechain-types/BCElection";
import { IElection } from "@/app/dashboard/election/_types/election";

export async function GET(req: NextRequest) {
    try {
        const type = Number(req.nextUrl.searchParams.get("type"));
        if (!type)
            return Result.json(400, "Invalid request");
        let elections: ElectionStructOutput[] = [];
        if (type == 1)
            elections = await ElectionContract.RunningElections();
        else if (type == 2)
            elections = await ElectionContract.ArchievedElections();
        else if (type == 3)
            elections = await ElectionContract.PendingElections();
        let convertedElections = convertObjectBigIntToString(elections);
        const mappedElections: IElection[] = convertedElections.map((e: any) => {
            return {
                id: Number(e[0]),
                startTime: Number(e[1]),
                endTime: Number(e[2]),
                voteCount: Number(e[3]),
                name: e[4],
                description: e[5],
            }
        })
        return Result.json(200, "success", mappedElections);
    } catch (error) {
        return Result.json(500, (error as ContractError)?.reason ?? 'Failure in fetching elections');
    }
}

export async function POST(req: NextRequest) {
    try {
        const validation = await validateRequest(req, electionCreateSchema);

        if (!validation.success) return validation.response;

        const { name, description, startTime, endTime } = validation.data;
        const u_startTime = Math.floor(new Date(startTime).getTime());
        const u_endTime = Math.floor(new Date(endTime).getTime());
        const tx = await ElectionContract.CreateElection(name, description, u_startTime, u_endTime);
        await tx.wait();
        if (!tx) throw new Error("Transaction failed");

        return Result.json(201, "Election created successfully", { txHash: tx.hash });
    } catch (error) {
        return Result.json(500, (error as ContractError)?.reason ?? 'Failed to create election');
    }
}