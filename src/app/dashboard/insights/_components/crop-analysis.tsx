'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle, Zap } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';

const chartData = [
  { crop: 'Maize', profitMargin: 25, fill: 'hsl(var(--primary))' },
  { crop: 'Tomatoes', profitMargin: 35, fill: 'hsl(var(--destructive))' },
  { crop: 'Beans', profitMargin: 20, fill: 'hsl(var(--secondary))' },
];

const chartConfig = {
  profitMargin: {
    label: 'Profit Margin (%)',
  },
} satisfies ChartConfig;

const analysisPoints = [
    { text: 'Profitability: +25% estimated profit margin.', icon: <CheckCircle className="text-green-500" /> },
    { text: 'Weather Fit: Ideal for the upcoming short rains season.', icon: <CheckCircle className="text-green-500" /> },
    { text: 'Soil Match: Perfect for your farm\'s loamy soil (pH 6.8).', icon: <CheckCircle className="text-green-500" /> },
    { text: 'Market Demand: High demand projected in Nakuru and Nairobi.', icon: <CheckCircle className="text-green-500" /> },
];

export default function CropAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Crop Analysis: Maize</CardTitle>
        <CardDescription>
          Here&apos;s why Maize is the top recommendation for your farm this season.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {analysisPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0">{point.icon}</div>
                    <p className="text-sm">{point.text}</p>
                </div>
            ))}
            <div className="p-4 bg-accent rounded-lg">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0"><Zap className="text-primary" /></div>
                    <div>
                        <h4 className="font-semibold text-primary">AI Summary</h4>
                        <p className="text-sm text-accent-foreground">
                        Maize offers the highest stability and a strong return this season based on your soil type, the rainfall forecast, and current market trends (+5% price increase).
                        </p>
                    </div>
                </div>
            </div>
          </div>
          <div>
            <h4 className="text-center font-semibold mb-2">Profit Margin Comparison</h4>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 20, bottom: 5, left: -20 }}
                accessibilityLayer
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="crop"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="profitMargin" radius={8}>
                  {chartData.map((entry) => (
                    <div key={entry.crop} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
