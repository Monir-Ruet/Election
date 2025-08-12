import { NextRequest } from "next/server";
import { ElectionContract } from '@/lib/election';
import { Result } from "@/lib/result";
import { ContractError } from "@/types/error";
import { convertObjectBigIntToString } from "@/lib/utils";
import { IVoter } from "@/app/dashboard/voter/_types/Voter";

export async function GET(req: NextRequest, { params }: { params: Promise<{ nid: string }> }) {
    try {
        const { nid } = await params;
        if (!nid)
            return Result.json(400, "NID is required");

        const voter = await ElectionContract.VoterByNid(nid);

        if (!voter || voter.name === "") {
            return Result.json(404, "Voter not found");
        }

        let convertedVoter = convertObjectBigIntToString(voter);
        const mappedVoter: IVoter = {
            nid: convertedVoter[0],
            name: convertedVoter[1],
            image: convertedVoter[2]
        }

        return Result.json(200, "success", mappedVoter);
    }
    catch (error) {
        return Result.json(500, (error as ContractError)?.reason ?? 'Failed to retrieve voter');
    }
}
