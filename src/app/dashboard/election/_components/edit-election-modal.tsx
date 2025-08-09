import { ElectionForm } from "@/app/dashboard/election/_components/create-election-form"
import { Edit } from "lucide-react"
import { IElection } from "../_types/election"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export function EditElectionForm({ election }: { election: IElection | undefined }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Edit size={17} />
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Edit Election</DialogTitle>
                    <DialogDescription>
                        Edit for a free and fare election.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-8">
                    <ElectionForm election={election} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
