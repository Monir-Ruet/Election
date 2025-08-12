'use client'

import { Button } from "@/components/ui/button"
import { ChartBarLabel } from "@/components/ui/chart-bar-stacked"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { IElection } from "../../_types/election"
import { ICandidate } from "@/app/dashboard/candidate/types/candidate"
import { GetCandidatesByElectionId } from "@/services/election-service"
import { useEffect, useState } from "react"

interface Chart {
    name: string,
    count: number
}

export function ElectionResult({
    election,
}: {
    election: IElection,
}) {
    const [candidates, setCandidates] = useState<ICandidate[]>([]);
    const [chartData, setChartData] = useState<Chart[]>([]);

    useEffect(() => {
        GetCandidatesByElectionId(election.id).then(res => {
            const candidateData: ICandidate[] = res.data
            setCandidates(candidateData)
            const data = candidateData?.map(candidate => {
                return {
                    name: candidate.name,
                    count: candidate.voteCount
                }
            })
            setChartData(data)
        })
    }, [])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Result</Button>
            </DialogTrigger>
            <DialogContent className="w-full flex-col flex gap-10">
                <DialogHeader>
                    <DialogTitle>Election Result for {election && election.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-10 w-full">
                    <ChartBarLabel chartData={chartData} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
