import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Edit, Plus } from "lucide-react"
import { IElection } from "@/app/dashboard/election/_types/election"
import { CandidateForm } from "@/app/dashboard/candidate/_components/candidate-form"
import { ICandidate } from "../types/candidate"

export function AddCandidateForm({
    election,
    candidate
}: {
    election: IElection,
    candidate?: ICandidate
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {
                    candidate ?
                        <Edit size={17} /> :
                        (
                            <Button className="w-fit bg-green-500 text-white font-bold" variant="outline">
                                <Plus />
                                Candidate
                            </Button>
                        )
                }
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>{candidate ? "Edit Candidate" : "Add Candidates"}</DialogTitle>
                    <DialogDescription>
                        {candidate ? "Edit" : "Add"} the participants for the election titled {election.name}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-8">
                    <CandidateForm election={election} candidate={candidate} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
