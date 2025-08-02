"use client";
import { ChartBarLabel } from "@/components/ui/chart-bar-stacked";
import { useState } from "react";

const chartData = [
  { month: "January", count: 186 },
  { month: "February", count: 305 },
  { month: "March", count: 237 },
  { month: "April", count: 73 },
  { month: "May", count: 209 },
  { month: "June", count: 214 },
]

export default function Count() {
    const [chart, setChartData] = useState(chartData);
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <ChartBarLabel chartData={chart}/>
        </div>
    );
}