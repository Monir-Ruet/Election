import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Edit } from "lucide-react"
import { IElection } from "@/app/dashboard/election/_types/election"
import { CandidateForm } from "@/app/dashboard/candidate/_components/candidate-form"
import { ICandidate } from "@/app/dashboard/candidate/types/candidate"

export function EditCandidateForm(
    {
        election,
        candidate
    }: {
        election: IElection,
        candidate: ICandidate
    }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Edit size={17} />
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Update Candidates</DialogTitle>
                    <DialogDescription>
                        Add the participants for the election titled {election.name}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-8">
                    <CandidateForm election={election} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
