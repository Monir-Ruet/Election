import { Card, CardContent } from "@/components/ui/card";
import { Vote, Users, TrendingUp } from "lucide-react";
import { IElection } from "@/app/dashboard/election/_types/election";
import { ICandidate } from "@/app/dashboard/candidate/types/candidate";
import { GetVoterCount } from "@/services/election-service";

export default async function ElectionResultCards(
    {
        election,
        candidates
    }: {
        election: IElection,
        candidates: ICandidate[]
    }) {
    const totalVotes = candidates.map(m => m.voteCount).reduce((a, b) => a + b, 0);
    const totalVoterCount = (await GetVoterCount())?.data ?? 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Candidates</p>
                            <p className="text-2xl font-bold">{candidates.length}</p>
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
                            <p className="text-2xl font-bold">{totalVoterCount}</p>
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
                            <p className="text-2xl font-bold">{totalVotes}</p>
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
                            <p className="text-2xl font-bold">{totalVoterCount == 0 ? 0 : Math.floor(totalVotes / totalVoterCount * 100)}%</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-orange-600" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}