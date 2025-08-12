'use client'

import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ElectionCountdown } from "../../_components/election-countdown";
import { IElection } from "../../_types/election";
import { ElectionResult } from "./election-result-modal";

export default function ElectionInformation(
    {
        election,
    }: {
        election: IElection,
    }) {
    const router = useRouter();
    const [now, setNow] = useState<number | null>(null);

    const start = typeof election.startTime === 'string' ? new Date(election.startTime).getTime() : election.startTime;
    const end = typeof election.endTime === 'string' ? new Date(election.endTime).getTime() : election.endTime;

    useEffect(() => {
        setNow(Date.now());
        const interval = setInterval(() => {
            setNow(Date.now());
            if (Date.now() > end) {
                clearInterval(interval);
                return;
            }
            if (Math.abs(start - Date.now()) <= 1000) {
                router.refresh();
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-4xl font-bold">{election.name}</h1>
                        <p className="font-semibold">{election.description}</p>
                    </div>
                    <div className="flex flex-row gap-5 items-center">
                        <ElectionCountdown start={start} end={end} now={now} />
                        {
                            now && now > end &&
                            (
                                <ElectionResult election={election} />
                            )
                        }
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}