import { ICandidate } from "@/app/dashboard/candidate/types/candidate";
import { ElectionContract } from "@/lib/election";
import { Result } from "@/lib/result";
import { convertObjectBigIntToString } from "@/lib/utils";
import { validateRequest } from "@/lib/validate";
import { candidateCreateSchema } from "@/schemas/candidates/candidate-create-schema";
import { candidateUpdateSchema } from "@/schemas/candidates/candidate-update-schema";
import { ContractError } from "@/types/error";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const electionId = Number(req.nextUrl.searchParams.get("electionId"));
        if (!electionId || isNaN(electionId))
            return Result.json(400, "Invalid request");
        const candidates = await ElectionContract.CandidatesByElection(electionId);
        let convertedCandidates = convertObjectBigIntToString(candidates);
        const mappedCandidates: ICandidate[] = convertedCandidates.map((e: any) => {
            return {
                voteCount: Number(e[0]),
                id: Number(e[1]),
                active: e[2],
                name: e[3],
                image: e[4],
            }
        })
        return Result.json(200, "success", mappedCandidates);
    } catch (error) {
        return Result.json(500, (error as ContractError)?.reason ?? 'Failed to retrieve candidates');
    }
}

export async function POST(req: NextRequest) {
    const validation = await validateRequest(req, candidateCreateSchema);
    if (!validation.success) return validation.response;
    const { name, electionId, image, active } = validation.data;

    try {
        const tx = await ElectionContract.CreateCandidate(electionId, name, image ?? "", active ?? true);
        await tx.wait();
        if (!tx) throw new Error("Transaction failed");
        return Result.json(201, `Candidate registration with name ${name} successful`, { transactionHash: tx.hash });
    } catch (error) {
        return Result.json(500, (error as ContractError)?.reason ?? `Failed to create a candidate for election ID ${electionId}`);
    }
}

export async function PUT(req: NextRequest) {
    const validation = await validateRequest(req, candidateUpdateSchema);
    if (!validation.success) return validation.response;
    const { name, electionId, candidateId, image, active } = validation.data;

    try {
        const tx = await ElectionContract.UpdateCandidate(electionId, candidateId, name, image, active);
        await tx.wait();
        if (!tx) throw new Error("Transaction failed");
        return Result.json(201, `Candidate registration with name ${name} successful`, { transactionHash: tx.hash });
    } catch (error) {
        return Result.json(500, (error as ContractError)?.reason ?? `Failed to create a candidate for election ID ${electionId}`);
    }
}