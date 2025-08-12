import { IVoter } from "@/app/dashboard/voter/_types/Voter";
import api from "@/lib/axios";
import { Result } from "@/lib/result";

export async function getVoters(offset: number) {
    try {
        const res = await api.get(`/api/voter`, {
            params: { offset },
        });
        return res.data ?? [];
    } catch (err) {
        return []
    }
}

export async function VoterByNid(nid: string): Promise<IVoter | null> {
    try {
        const res = await api.get(`/api/voter/${nid}`)
        const voterResult: Result<IVoter, unknown> = res.data;
        if (voterResult.status == 200 && voterResult.data)
            return voterResult.data;
        return null;
    } catch (err) {
        return null
    }
}

export async function Vote(nid: string, electionId: string, candidateId: string) {
    try {
        const res = await api.get(`/api/voter/${nid}`)
        const voterResult: Result<IVoter, unknown> = res.data;
        if (voterResult.status == 200)
            return true;
        return false;
    } catch (err) {
        return false;
    }
}