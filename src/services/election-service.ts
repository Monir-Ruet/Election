import { IElection } from "@/app/dashboard/election/_types/election";
import api from "@/lib/axios";
import { Result } from "@/lib/result";
import { ca } from "zod/v4/locales";

export async function CreateElection(election: unknown) {
    try {
        const response = await api.post<Result>("/api/elections", election, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status != 201)
            return false;
        return true;
    }
    catch {
        return false
    }

}

export async function UpdateElection(election: unknown) {
    try {
        const response = await api.put<Result>("/api/elections", election, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status != 201)
            return false;
        return true;
    } catch {
        return false
    }

}

export async function CreateCandidate(candidate: unknown) {
    try {
        const response = await api.post<Result>("/api/candidates", JSON.stringify(candidate), {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status != 201)
            return false;
        return true;
    } catch {
        return false
    }

}

export async function UpdateCandidate(candidate: unknown) {
    try {
        const response = await api.put<Result>("/api/candidates", JSON.stringify(candidate), {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status != 201)
            return false;
        return true;
    } catch {
        return false
    }
}

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