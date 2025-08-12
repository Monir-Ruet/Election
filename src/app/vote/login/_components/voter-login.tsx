"use client"
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircleIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { IElection } from "@/app/dashboard/election/_types/election";
import { useRouter } from "next/navigation";
import { VoterByNid } from "@/services/voter-service";

export default function VoterLogin({
    election
}: {
    election: IElection
}) {
    const router = useRouter();
    const [nid, setNid] = useState("");
    const [isAlertShow, setAlertShow] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsPending(true)
        const voter = await VoterByNid(nid);
        if (voter == null) {
            setAlertShow(true)
            setIsPending(false)
            setMessage("There is no voter with this nid")
        } else {
            router.push("/vote");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
                {
                    isAlertShow && (
                        <Alert variant="destructive">
                            <AlertCircleIcon />
                            <AlertTitle>{message}</AlertTitle>
                        </Alert>
                    )
                }

                <Label htmlFor="nid">Nid</Label>
                <Input
                    onChange={(e) => setNid(e.target.value)}
                    id="nid"
                    type="nid"
                    placeholder="eg . 1234567890"
                    required
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                    {
                        isPending ? <Loader2 /> : "Sign In"
                    }
                </Button>
            </div>
        </form>
    )
}