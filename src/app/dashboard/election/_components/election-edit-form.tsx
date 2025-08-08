import { ElectionForm } from "@/app/dashboard/election/_components/create-election-form"
import { Edit } from "lucide-react"
import { ElectionData } from "../_types/election"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export function EditElectionForm({ election }: { election: ElectionData | undefined }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Edit size={17} />
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Election</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-8">
                    <ElectionForm election={election} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
