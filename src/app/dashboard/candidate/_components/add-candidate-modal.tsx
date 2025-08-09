import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { IElection } from "@/app/dashboard/election/_types/election"
import { CandidateForm } from "@/app/dashboard/candidate/_components/candidate-form"

export function CreateCandidateForm({ election }: { election: IElection }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-fit bg-green-500 text-white font-bold">
                    <Plus />
                    Candidate
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Add Candidates</DialogTitle>
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
