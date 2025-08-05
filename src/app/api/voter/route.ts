import { NextRequest } from "next/server";
import { ElectionContract } from '@/lib/election';
import { validateRequest } from "@/lib/validate";
import { voterRegisterSchema } from "@/schemas/voters/voter-register-schema";
import { Result } from "@/lib/result";
import { ContractError } from "@/types/error";

export async function POST(req: NextRequest) {
    try {
        const validation = await validateRequest(req, voterRegisterSchema);
        if (!validation.success) return validation.response;

        const { nid, name } = validation.data;
        const tx = await ElectionContract.RegisterVoter(nid, name, "");
        await tx.wait();
        if (!tx) throw new Error("Transaction failed");

        return Result.json(201, `Voter registation with nid ${nid} and name ${name} successfull`, { transactionHash: tx.hash });
    }
    catch (error) {
        return Result.json(500, (error as ContractError)?.reason ?? 'Failed to register voter');
    }
}

export async function PUT(req: NextRequest) {
    try {
        const validation = await validateRequest(req, voterRegisterSchema);
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