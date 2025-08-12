import api from "@/lib/axios";

export async function fetchElections(type: number) {
    try {
        const res = await api.get(`/api/elections`, {
            params: { type },
        });
        return res.data ?? [];
    } catch (err) {
        return []
    }
}

export async function GetElectionById(id: number) {
    try {
        const res = await api.get(`/api/elections/${id}`);
        return res.data;
    } catch (err) {
        return null;
    }
}

export async function GetCandidatesByElectionId(electionId: number) {
    try {
        const res = await api.get(`/api/candidates`, {
            params: { electionId },
        });
        return res.data ?? [];
    } catch (err) {
        return []
    }
}

export async function GetVoterCount() {
    try {
        const res = await api.get(`/api/voters/count`);
        return res.data;
    } catch (err) {
        return 0;
    }
}