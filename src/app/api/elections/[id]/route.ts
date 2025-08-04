import { NextRequest } from "next/server";
import { ElectionContract } from '@/lib/election';
import { Result } from "@/lib/result";
import { convertObjectBigIntToString } from "@/lib/utils";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        if (!id)
            return Result.json(400, "NID is required");

        const election = await ElectionContract.ElectionById(id);

        if (!election || election.name === "") {
            return Result.json(404, "Election not found");
        }

        return Result.json(200, "success", convertObjectBigIntToString(election));
    }
    catch (error) {
        return Result.json(500, (error as any)?.reason ?? 'Failed to retrieve election');
    }
}
