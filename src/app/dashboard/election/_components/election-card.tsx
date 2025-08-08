import { Card, CardHeader, CardDescription, CardTitle, CardAction, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Edit, BadgeCheckIcon, View } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ElectionData } from "../_types/election"
import { ElectionType } from "../_types/election-type"
import { EditElectionForm } from "./election-edit-form"

export function ElectionCard(
    {
        data,
        type
    }:
        {
            data: ElectionData[],
            type: ElectionType
        }) {
    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            {
                data.map((election, index) => {
                    return (
                        <Card key={index} className="@container/card">
                            <CardHeader>
                                <CardDescription className="line-clamp-2">{election.description}</CardDescription>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{election.name}</CardTitle>
                                <CardAction>
                                    {
                                        type === ElectionType.PENDING &&
                                        (
                                            <EditElectionForm election={election} />
                                        )
                                    }

                                </CardAction>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-2.5 text-sm">
                                <div className="flex flex-row gap-3">
                                    <Link href={`/dashboard/election/${election.id}`}>
                                        <Button>View</Button>
                                    </Link>
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
                                <div className="text-muted-foreground">{new Date(election.startDate).toDateString()} - {new Date(election.endDate).toDateString()}</div>
                            </CardFooter>
                        </Card>
                    )
                })
            }
        </div>
    )
}