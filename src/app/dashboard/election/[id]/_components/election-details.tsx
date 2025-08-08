import { Card, CardContent } from "@/components/ui/card";
import { ElectionCountdown } from "@/app/dashboard/election/_components/election-countdown";
import { ElectionData } from "@/app/dashboard/election/_types/election";

export default function ElectionDetails({ election }: { election: ElectionData }) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-4xl font-bold">{election.name}</h1>
                        <p className="font-semibold">{election.description}</p>
                    </div>
                    <ElectionCountdown startTime={election.startDate} endTime={election.endDate} />
                </div>
            </CardContent>
        </Card>
    )
}