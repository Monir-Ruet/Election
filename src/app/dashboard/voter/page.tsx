import { getVoters } from "@/services/voter-service";
import AddVoterModal from "./_components/voter-modal";
import { Voters } from "./_components/voters-table";

export default async function Voter() {
    const voters = (await getVoters(0)).data;

    return (
        <div className="w-full">
            <AddVoterModal voter={undefined} />
            {
                voters && voters.length > 0 &&
                (
                    <div className="mt-10">
                        <h1 className="text-2xl font-bold mb-4">Voter</h1>
                        <Voters voters={voters} />
                    </div>
                )
            }
        </div>
    );
}