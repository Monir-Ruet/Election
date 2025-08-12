"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // ✅ use shadcn/ui version
import { ICandidate } from "@/app/dashboard/candidate/types/candidate";
import { IElection } from "@/app/dashboard/election/_types/election";
import { useState } from "react";
import { Vote } from "@/services/voter-service";
import { toast } from "sonner";

export default function VoteForm({
    nid,
    election,
    candidates
}: {
    nid: string,
    election: IElection,
    candidates: ICandidate[]
}) {
    const [candidateId, setCandidateId] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let voteResult = await Vote(nid, election.id.toString(), candidateId);
        if (voteResult)
            toast.success("Vote complete");
        else toast.error("Vote failed");
    }

    return (
        <div className="absolute left-1/2 top-1/2 -translate-1/2 mx-auto w-[30%] flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Ballot Box</CardTitle>
                    <CardDescription>Select a candidate to vote</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <RadioGroup
                            defaultValue="1"
                            className="flex flex-col gap-5"
                            onValueChange={(value) => setCandidateId(value)}
                        >
                            {candidates.map((candidate) => (
                                <div key={candidate.id} className="flex flex-row gap-5 items-center justify-between">
                                    <div className="flex flex-row items-center gap-2">
                                        {candidate.image ? (
                                            <Image src={candidate.image} width={15} height={15} alt="candidate_photo" />
                                        ) : (
                                            <img
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADn0lEQVR4nO2Z3UtTYRzHd9cfURddaHRnduFVpGzTbW2TTKVUdEYvlGDQRRKRBiX2opmFb+TCIRXa1Kxoc2Za9CKEGlFMxVTyZSdtBzXdcabsG88ZzrnNdY7pzin2gy+cPef3+53v5znPc+DsSCThCEc4/s+wjzl20BRjpG2OnzTFQBDZ2Gs3TU05I3mbt1MMLZhxaq2IF/uoYztnAHbmRWCc9oawORq4Awi5bKj1AJgZPncAYpQkDED9WZ+6+1FafAe6rGyo1RpIpVJWl/Ivixvgx8Q8bpdWID4+3mPaW3K5HM8eW0B9mxYfgN3mwMULlwIa91WiNhGN9U/EBaCvNnAy762HdUZxAHy1jkOhUPIGUCpVGLSOCQ9QVa4PajTtoAyVeQn4oj+Al6UqyLzO1VTXCg9w8sQpP9OZyXLcPa9Af60aLpMWMK/q2TUVZDJ33pncs8IDaDVa1kxGkgzl5xT4rPc37aumQveSSzuSLjzAyqwHMxxIpEat1vzbAFKpVHiAuus5awDKsyJQoYv0M+w7Tmr0haeEB3A9iobhosJjrEIXgcoAAL7jpMZl3Cs8APP+JmDW8F5CMGnAdJUKD0C03HmaN8Dyqxxe19hSgIWeGt4AC733xAMwPToBlyWVs3mSOz1qEw8A0VxfB2BO5ACQiDmrhXd/OhQvNHPWNuC5KsjGVWHO+mJDvelQvZGhZhtQvxt4GuuGIXqy3z1Ws23DfemQAVRLgkqUAJ2d4ygo6saho+0YeGsCBgxAhw54sNMtcjxgYM+RHJJLamihAT72/EBO3jvEJj33qPhqM1ZisqoK38vKPL/JOe/cnLx3bA9BAMgMKtMsawwRKQ6bMD/vxExrKz5HRbGi6+vBML+gSjP55SccaUVb+3hoAdpejEGW4m9mRS1P++BaWkJfXByssbFwLS6yY+vly1JMbM+QAAwNzOBAuv/Me+vY2Tdwjox47oBzeJgdC1ajzrCwvbcc4EpJb1AjK+q6UesB6Co2cKopLOndWoDhwVnIU82czOQn3/IAkGMuNfJUM0YGZ7cOoKHxKycj7OZMasGHPTHojo6B8lAL5zpj89AmANgcs4EakOc3VyNE1fuOs+JTU1DUvSl/rzcFaqLLfc3LTFbKfWQl3+dVk537er07YOQMMDXu3GWnGLtvE01G8KfPZkib2eY/+xRDT04uREj4BPkmRT7reC8neQq3Dfw3kqeaV827r23kbT4c4QiH5J+J39DZkHjG5LKJAAAAAElFTkSuQmCC"
                                                alt="candidate"
                                            />
                                        )}
                                        <span>{candidate.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={`${candidate.id}`} id={`${candidate.id}`} />
                                    </div>
                                </div>
                            ))}

                            <Button type="submit">Vote</Button>
                        </RadioGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
