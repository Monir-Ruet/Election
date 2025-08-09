'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

type ElectionCountdownProps = {
    now: number | null,
    start: number | null;
    end: number | null;
};

export function ElectionCountdown({ now, start, end }: ElectionCountdownProps) {
    useEffect(() => {
        if (!now || !start || !end) return;

        let title = '';
        if (now < start) {
            title = `Starts in: ${formatTimeDiff(start - now)}`;
        } else if (now >= start && now <= end) {
            title = `Ends in: ${formatTimeDiff(end - now)}`;
        } else {
            title = 'Election Finished';
        }

        document.title = title;
    }, [now, start, end]);

    if (now === null || start == null || end == null) {
        return <span className="text-gray-400">
            <Loader2 />
        </span>;
    }

    if (now < start) {
        return (
            <div className='text-center'>
                <div className="text-yellow-600 font-bold">Before Election</div>
                <div className='font-stretch-125%'>{formatTimeDiff(start - now)}</div>
            </div>
        );
    }

    if (now >= start && now <= end) {
        return (
            <div className='text-center'>
                <div className="text-green-600 font-bold">Running</div>
                <div className='font-stretch-125%'>{formatTimeDiff(end - now)}</div>
            </div>
        );
    }

    return <span className="text-red-600 font-bold">Finished</span>;
}

function formatTimeDiff(diff: number) {
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
