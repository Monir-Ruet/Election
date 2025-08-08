import { Card, CardContent } from "@/components/ui/card";
import { Vote, Users, TrendingUp } from "lucide-react";

export default function ElectionResultCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Candidates</p>
                            <p className="text-2xl font-bold">3</p>
                        </div>
                        <Vote className="h-8 w-8 text-green-600" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Voters</p>
                            <p className="text-2xl font-bold">8,492</p>
                        </div>
                        <Users className="h-8 w-8 text-purple-600" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Votes</p>
                            <p className="text-2xl font-bold">8,492</p>
                        </div>
                        <Users className="h-8 w-8 text-purple-600" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Avg. Participation</p>
                            <p className="text-2xl font-bold">67%</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-orange-600" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}