import { GetCandidatesByElectionId, GetElectionById } from "@/services/election-service";
import VoteForm from "./_components/vote-form";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export default async function Vote({
    searchParams
}: {
    searchParams:
    {
        electionId: string,
        nid: string
    }
}) {
    const { nid, electionId } = await searchParams;
    if (!nid || !electionId)
        redirect("/not-found")
    let election = (await GetElectionById(Number(electionId)))
    let candidates = (await GetCandidatesByElectionId(Number(electionId))).data
    if (!election || !candidates)
        redirect("/not-found")

    return (
        <VoteForm nid={nid} election={election} candidates={candidates} />
    );
}
