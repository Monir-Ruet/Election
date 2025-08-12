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
import { IVoter } from "@/app/dashboard/voter/_types/Voter"
import AddVoterForm from "@/app/dashboard/voter/_components/voter-form"

export default function AddVoterModal({ voter }: { voter: IVoter | undefined }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {
                    voter ? <Edit size={20} /> :
                        (
                            <Button className="w-fit bg-green-500 text-white font-bold" variant="outline">
                                <Plus />Voter
                            </Button>
                        )
                }

            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Voter</DialogTitle>
                    <DialogDescription>
                        voters who are eligible to vote for elections
                    </DialogDescription>
                </DialogHeader>
                <div className="py-8">
                    <AddVoterForm voter={voter} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
