"use client"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart with a label"

interface IChartData {
  name: string
  count: number
}

const chartConfig = {
  desktop: {
    label: "desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartBarLabel(
  {
    chartData,
    className
  }: {
    chartData?: IChartData[]
    className?: string
  }) {
  return (
    <ChartContainer className={className} config={chartConfig}>
      <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} tickFormatter={(value) => value.slice(0, 5)} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="count" fill="var(--color-primary)" radius={8}>
          <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
