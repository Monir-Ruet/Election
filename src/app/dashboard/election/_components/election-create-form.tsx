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
import { ElectionData } from "../_types/election"

export function CreateElectionForm({ election }: { election: ElectionData | undefined }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="float-end bg-green-500 text-white font-bold" variant="outline">
                    <Plus />
                    Create Election
                </Button>
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
