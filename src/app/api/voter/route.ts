import { NextRequest } from "next/server";
import { ElectionContract } from '@/lib/election';
import { validateRequest } from "@/lib/validate";
import { voterSchema } from "@/schemas/voters/voter-schema";
import { Result } from "@/lib/result";
import { ContractError } from "@/types/error";
import { IVoter } from "@/app/dashboard/voter/_types/Voter";

export async function GET(req: NextRequest) {
    try {
        const offset = Number(req.nextUrl.searchParams.get("offset"));
        if (typeof offset != 'number')
            return Result.json(400, "Invalid request");
        const voters = await ElectionContract.GetVoters(offset);
        const mappedVoters: IVoter[] = voters.map(v => {
            return {
                nid: v[0],
                name: v[1],
                image: v[2]
            }
        })
        return Result.json(200, "success", mappedVoters);
    } catch (error) {
        return Result.json(500, (error as ContractError)?.reason ?? 'Failed to register voter');
    }
}

export async function POST(req: NextRequest) {
    try {
        const validation = await validateRequest(req, voterSchema);
        if (!validation.success) return validation.response;

        const { nid, name } = validation.data;
        const tx = await ElectionContract.RegisterVoter(nid, name, "");
        await tx.wait();
        if (!tx) throw new Error("Transaction failed");

        return Result.json(201, `Voter registation with nid ${nid} and name ${name} successful`, { transactionHash: tx.hash });
    }
    catch (error) {
        return Result.json(500, (error as ContractError)?.reason ?? 'Failed to register voter');
    }
}

export async function PUT(req: NextRequest) {
    try {
        const validation = await validateRequest(req, voterSchema);
        if (!validation.success) return validation.response;

        const { nid, name, image } = validation.data;
        const tx = await ElectionContract.UpdateVoter(nid, name, image ?? "");
        await tx.wait();
        if (!tx) throw new Error("Transaction failed");

        return Result.json(201, `Voter updated with nid ${nid} and name ${name} successfull`, { transactionHash: tx.hash });
    }
    catch (error) {
        return Result.json(500, (error as ContractError)?.reason ?? 'Failed to register voter');
    }
}