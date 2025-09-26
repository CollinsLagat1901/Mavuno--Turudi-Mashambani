'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Line, LineChart, CartesianGrid, XAxis, Tooltip, Legend } from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { Zap } from 'lucide-react';

const marketData = [
  { date: 'Sep 1', Maize: 38, Beans: 82, Tomatoes: 58 },
  { date: 'Sep 7', Maize: 39, Beans: 81, Tomatoes: 60 },
  { date: 'Sep 14', Maize: 40, Beans: 80, Tomatoes: 62 },
  { date: 'Sep 21', Maize: 41, Beans: 80, Tomatoes: 61 },
  { date: 'Sep 28', Maize: 42, Beans: 79, Tomatoes: 63 },
];

const chartConfig = {
  Maize: {
    label: 'Maize (KES/kg)',
    color: 'hsl(var(--primary))',
  },
  Beans: {
    label: 'Beans (KES/kg)',
    color: 'hsl(var(--secondary))',
  },
  Tomatoes: {
    label: 'Tomatoes (KES/kg)',
    color: 'hsl(var(--destructive))',
  },
} satisfies ChartConfig;

export default function MarketInsight() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Regional Market Trends</CardTitle>
        <CardDescription>Price movements for top crops in the last 30 days.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <LineChart data={marketData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <Tooltip content={<ChartTooltipContent indicator="dot" />} />
            <Legend />
            <Line dataKey="Maize" type="monotone" stroke="var(--color-Maize)" strokeWidth={2} dot={false} />
            <Line dataKey="Beans" type="monotone" stroke="var(--color-Beans)" strokeWidth={2} dot={false} />
            <Line dataKey="Tomatoes" type="monotone" stroke="var(--color-Tomatoes)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>

        <div className="p-4 bg-accent rounded-lg">
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0"><Zap className="text-primary" /></div>
                <div>
                    <h4 className="font-semibold text-primary">AI Comment</h4>
                    <p className="text-sm text-accent-foreground">
                    Maize is showing steady price growth (+5% this month), indicating strong and sustained demand. Beans are stable, while Tomatoes show slight volatility.
                    </p>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
