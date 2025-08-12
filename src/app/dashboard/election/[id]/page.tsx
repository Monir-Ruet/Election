import { IElection } from "@/app/dashboard/election/_types/election";
import ElectionResultCards from "@/app/dashboard//election/[id]/_components/election-card-components";
import ElectionDetails from "@/app/dashboard/election/[id]/_components/election-information";
import { GetCandidatesByElectionId, GetElectionById } from "@/services/election-service";
import { Candidates } from "../../candidate/_components/candidates-table";
import { Result } from "@/lib/result";
import { NextResponse } from "next/server";
import { ICandidate } from "@/app/dashboard/candidate/types/candidate";


export default async function ElectionById({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let election: Result<IElection> = await GetElectionById(Number(id));
    let candidates: Result<ICandidate[]> = await GetCandidatesByElectionId(Number(id));
    if (!election?.data || !candidates?.data) {
        return NextResponse.redirect(new URL("/not found"))
    }
    let electionData = election.data;
    let candidatesData = candidates.data ?? [];

    return (
        <div className="min-h-screen py-8">
            <div className="flex flex-col gap-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <ElectionDetails election={electionData} />
                <div className="gap-5 flex flex-col">
                    <ElectionResultCards election={electionData} candidates={candidatesData} />
                </div>
                <div className="flex flex-col gap-5">
                    <p>Candidates</p>
                    <Candidates election={electionData} candidates={candidatesData} />
                </div>
            </div>
        </div>
    );
}
