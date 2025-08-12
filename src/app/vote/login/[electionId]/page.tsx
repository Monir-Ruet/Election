import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import VoterLogin from "@/app/vote/login/_components/voter-login";
import { GetElectionById } from "@/services/election-service";
import { redirect } from "next/navigation";
import { IElection } from "@/app/dashboard/election/_types/election";

export default async function VoterLoginPage({ params }: { params: { electionId: string } }) {
    const { electionId } = await params;
    let election: IElection = await GetElectionById(Number(electionId));
    if (!election)
        redirect("/not-found")
    return (
        <div className="absolute left-1/2 top-1/2 -translate-1/2 mx-auto w-[30%] flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome</CardTitle>
                    <CardDescription>
                        Login with your credentials to vote
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <VoterLogin election={election} />
                </CardContent>
            </Card>
        </div>
    );
}
