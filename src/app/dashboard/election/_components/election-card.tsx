import { Card, CardHeader, CardDescription, CardTitle, CardAction, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { BadgeCheckIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IElection } from "../_types/election"
import { ElectionType } from "../_types/election-type"
import { EditElectionForm } from "./edit-election-modal"
import { AddCandidateForm } from "../../candidate/_components/candidate-modal"

export function ElectionCard(
    {
        data,
        type
    }:
        {
            data: IElection[],
            type: ElectionType
        }) {
    return (
        <div className="flex flex-col gap-4 md:gap-6">
            {
                data.map((election, index) => {
                    return (
                        <Card key={index} className="@container/card">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{election.name}</CardTitle>
                                <CardAction>
                                    {
                                        type === ElectionType.PENDING &&
                                        (
                                            <EditElectionForm election={election} />
                                        )
                                    }
                                </CardAction>
                                <CardDescription className="line-clamp-2">{election.description}</CardDescription>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-2.5 text-sm">
                                <div className="flex flex-row gap-3">
                                    <Link href={`/dashboard/election/${election.id}`}>
                                        <Button>View</Button>
                                    </Link>
                                    {
                                        type === ElectionType.PENDING &&
                                        (
                                            <AddCandidateForm election={election} />
                                        )
                                    }
                                    {
                                        type === ElectionType.RUNNING &&
                                        (
                                            <Link href={`/vote/login/${election.id}`}>
                                                <Button className="w-fit bg-blue-500 text-white font-bold">Vote</Button>
                                            </Link>
                                        )
                                    }
                                    <Badge
                                        variant="secondary"
                                        className={cn(type == ElectionType.RUNNING ? "bg-green-500" : (
                                            type == ElectionType.PENDING ? "bg-yellow-500" :
                                                "bg-red-500"), "text-white")}>
                                        <BadgeCheckIcon />
                                        {type == ElectionType.RUNNING ? "Running" : (
                                            type == ElectionType.PENDING ? "Pending" :
                                                "Archived")}
                                    </Badge>
                                </div>
                                <div className="text-muted-foreground">{new Date(election.startTime).toDateString()} - {new Date(election.endTime).toDateString()}</div>
                            </CardFooter>
                        </Card>
                    )
                })
            }
        </div>
    )
}