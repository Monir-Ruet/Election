import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart with a label"

interface IChartData {
    month: string
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
    chartData
    }: {
    chartData?: IChartData[]
}) {
    return (
        <Card className="w-full max-w-xl">
          <CardHeader>
              <CardTitle>Voting Result</CardTitle>
              <CardDescription>National Election 2025</CardDescription>
          </CardHeader>
          <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData} margin={{ top: 20}}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />}/>
                    <Bar dataKey="count" fill="var(--color-primary)" radius={8}>
                      <LabelList position="top" offset={12} className="fill-foreground" fontSize={12}/>
                    </Bar>
                </BarChart>
              </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 leading-none font-medium">
                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground leading-none">
                Showing total visitors for the last 6 months
              </div>
          </CardFooter>
        </Card>
    )
}
