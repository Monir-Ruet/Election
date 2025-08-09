import { ElectionForm } from "@/app/dashboard/election/_components/create-election-form"
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
import { IElection } from "../_types/election"

export function CreateElectionForm({ election }: { election: IElection | undefined }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-fit bg-green-500 text-white font-bold" variant="outline">
                    <Plus />
                    Create Election
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Create Election</DialogTitle>
                    <DialogDescription>
                        Create for a free and fare election.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-8">
                    <ElectionForm election={election} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
