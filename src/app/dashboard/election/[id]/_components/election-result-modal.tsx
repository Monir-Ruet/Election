import { Button } from "@/components/ui/button"
import { ChartBarLabel } from "@/components/ui/chart-bar-stacked"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { IElection } from "../../_types/election"
import { ICandidate } from "@/app/dashboard/candidate/types/candidate"

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

export function ElectionResult({
    election,
}: {
    election: IElection,
}) {
    const chartData = candidates?.map(candidate => {
        return {
            name: candidate.name,
            count: candidate.voteCount
        }
    })
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Result</Button>
            </DialogTrigger>
            <DialogContent className="w-full flex-col flex gap-10">
                <DialogHeader>
                    <DialogTitle>Election Result for {election && election.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-10 w-full">
                    <ChartBarLabel chartData={chartData} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
