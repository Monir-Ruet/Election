import { NextRequest } from "next/server";
import { ElectionContract } from '@/lib/election';
import { Result } from "@/lib/result";
import { convertObjectBigIntToString } from "@/lib/utils";
import { ContractError } from '@/types/error';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        if (!id)
            return Result.json(400, "NID is required");

        const election = await ElectionContract.ElectionById(id);

        if (!election || election.name === "") {
            return Result.json(404, "Election not found");
        }
        let e = convertObjectBigIntToString(election);
        let mappedElection = {
            id: Number(e[0]),
            startTime: Number(e[1]),
            endTime: Number(e[2]),
            voterCount: Number(e[3]),
            name: e[4],
            description: e[5],
        }
        return Result.json(200, "success", mappedElection);
    }
    catch (error) {
        return Result.json(500, (error as ContractError)?.reason ?? 'Failed to retrieve election');
    }
}
