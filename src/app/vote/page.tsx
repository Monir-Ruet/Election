import { GetCandidatesByElectionId, GetElectionById } from "@/services/election-service";
import VoteForm from "./_components/vote-form";
import { redirect } from "next/navigation";

export default async function Vote({
    searchParams
}: {
    searchParams:
    Promise<
        {
            electionId: string,
            nid: string
        }>
}) {
    const { nid, electionId } = await searchParams;
    if (!nid || !electionId)
        redirect("/not-found")
    const election = (await GetElectionById(Number(electionId))).data
    const candidates = (await GetCandidatesByElectionId(Number(electionId))).data
    if (!election || !candidates)
        redirect("/not-found")

    return (
        <VoteForm nid={nid} election={election} candidates={candidates} />
    );
}
