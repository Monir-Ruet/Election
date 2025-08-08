import { ElectionData } from "@/app/dashboard/election/_types/election";
import ElectionResultCards from "./_components/result-card-components";
import { ChartBarLabel } from "@/components/ui/chart-bar-stacked";
import ElectionDetails from "./_components/election-details";

const election: ElectionData = {
    id: 4,
    name: "Bangladesh National Election",
    startDate: 1754667450524,
    endDate: 1754667450525,
    description: "Bangladesh National Election organized by bangladesh election commission"
};

const chart = [
    { month: "January", count: 18 },
    { month: "February", count: 305 },
    { month: "March", count: 237 },
    { month: "April", count: 73 },
    { month: "May", count: 209 },
    { month: "June", count: 214 },
    { month: "June", count: 214 },
    { month: "June", count: 214 },
    { month: "June", count: 214 },
    { month: "June", count: 214 },
    { month: "June", count: 214 },
    { month: "June", count: 214 },
    { month: "June", count: 214 },
    { month: "June", count: 214 }
]

export default async function ElectionById({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <div className="min-h-screen py-8">
            <div className="flex flex-col gap-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <ElectionDetails election={election} />
                <div className="gap-5 flex flex-col">
                    <ElectionResultCards />
                    <div className="space-y-8 w-[80%] mx-auto">
                        <ChartBarLabel className="w-full" chartData={chart} />
                    </div>
                </div>
            </div>
        </div>
    );
}
