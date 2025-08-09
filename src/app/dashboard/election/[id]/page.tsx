import { IElection } from "@/app/dashboard/election/_types/election";
import ElectionResultCards from "@/app/dashboard//election/[id]/_components/election-card-components";
import ElectionDetails from "@/app/dashboard/election/[id]/_components/election-information";
import Candidates from "../../candidate/_components/candidates-table";
import { ICandidate } from "../../candidate/types/candidate";

const election: IElection = {
    id: 4,
    name: "Bangladesh National Election",
    startDate: 1754723576945,
    endDate: 1754723546047,
    description: "Bangladesh National Election organized by bangladesh election commission"
};

const candidates: ICandidate[] = [
    {
        voteCount: 1,
        id: 0,
        active: true,
        name: "Monir Hossain",
        image: "dsnala"
    },
    {
        voteCount: 2,
        id: 1,
        active: true,
        name: "Monir Hossain",
        image: "dsnala"
    },
    {
        voteCount: 2,
        id: 1,
        active: true,
        name: "Monir Hossain",
        image: "dsnala"
    },
    {
        voteCount: 2,
        id: 1,
        active: true,
        name: "Monir Hossain",
        image: "dsnala"
    }, {
        voteCount: 2,
        id: 1,
        active: true,
        name: "Monir Hossain",
        image: "dsnala"
    },
    {
        voteCount: 2,
        id: 1,
        active: true,
        name: "Monir Hossain",
        image: "dsnala"
    }
]

export default async function ElectionById({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <div className="min-h-screen py-8">
            <div className="flex flex-col gap-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <ElectionDetails election={election} />
                <div className="gap-5 flex flex-col">
                    <ElectionResultCards election={election} />
                </div>
                <div className="flex flex-col gap-5">
                    <p>Candidates</p>
                    <Candidates candidates={candidates} />
                </div>
            </div>
        </div>
    );
}
