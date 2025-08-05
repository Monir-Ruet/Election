"use client"
import { useState } from "react";
import { ChartBarLabel } from "@/components/ui/chart-bar-stacked";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


const chart = [
    { month: "January", count: 186 },
    { month: "February", count: 305 },
    { month: "March", count: 237 },
    { month: "April", count: 73 },
    { month: "May", count: 209 },
    { month: "June", count: 214 }
]

export default function ResultChart() {
    const [chartData, setChartData] = useState(chart);

    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full">
            <CarouselContent>
                {
                    chart.map((_, index) => {
                        return (
                            <CarouselItem key={index} className="basis-1/2">
                                <ChartBarLabel className="w-full" key={index} chartData={chartData} />
                            </CarouselItem>

                        )
                    })
                }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}