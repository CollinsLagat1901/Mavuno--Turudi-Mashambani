'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig
} from "@/components/ui/chart"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts"

const chartData = [
  { month: "January", Maize: 41, Beans: 80, Tomatoes: 55 },
  { month: "February", Maize: 40, Beans: 79, Tomatoes: 58 },
  { month: "March", Maize: 42, Beans: 82, Tomatoes: 60 },
  { month: "April", Maize: 45, Beans: 85, Tomatoes: 65 },
  { month: "May", Maize: 44, Beans: 84, Tomatoes: 68 },
  { month: "June", Maize: 46, Beans: 86, Tomatoes: 70 },
]

const chartConfig = {
  Maize: {
    label: "Maize",
    color: "hsl(var(--primary))",
  },
  Beans: {
    label: "Beans",
    color: "hsl(var(--secondary))",
  },
  Tomatoes: {
    label: "Tomatoes",
    color: "hsl(var(--destructive))",
  }
} satisfies ChartConfig

export default function MarketPrices() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Prices Overview</CardTitle>
        <CardDescription>Monthly price trends for top crops (KES/kg)</CardDescription>
      </CardHeader>
      <CardContent>
         <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <LineChart accessibilityLayer data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `KES ${value}`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Legend />
            <Line dataKey="Maize" type="monotone" stroke="var(--color-Maize)" strokeWidth={2} dot={true} />
            <Line dataKey="Beans" type="monotone" stroke="var(--color-Beans)" strokeWidth={2} dot={true}/>
            <Line dataKey="Tomatoes" type="monotone" stroke="var(--color-Tomatoes)" strokeWidth={2} dot={true}/>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
