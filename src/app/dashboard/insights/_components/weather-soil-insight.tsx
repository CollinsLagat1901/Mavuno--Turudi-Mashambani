'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Droplets, Sun, Thermometer, TestTube, Zap } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';

const soilPhData = [
  { month: 'Jan', ph: 6.7 },
  { month: 'Feb', ph: 6.8 },
  { month: 'Mar', ph: 6.8 },
  { month: 'Apr', ph: 6.9 },
];

const rainfallData = [
    { day: 'Mon', rainfall: 0 },
    { day: 'Tue', rainfall: 2 },
    { day: 'Wed', rainfall: 1 },
    { day: 'Thu', rainfall: 5 },
    { day: 'Fri', rainfall: 8 },
    { day: 'Sat', rainfall: 3 },
    { day: 'Sun', rainfall: 1 },
];

const chartConfig = {
  ph: {
    label: 'Soil pH',
    color: 'hsl(var(--primary))',
  },
  rainfall: {
    label: 'Rainfall (mm)',
    color: 'hsl(var(--secondary))',
  },
} satisfies ChartConfig;

export default function WeatherSoilInsight() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Land’s Condition</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold text-sm mb-2">7-Day Rainfall Forecast (mm)</h4>
          <ChartContainer config={chartConfig} className="h-32 w-full">
            <AreaChart data={rainfallData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Area dataKey="rainfall" type="natural" fill="var(--color-rainfall)" fillOpacity={0.4} stroke="var(--color-rainfall)" />
            </AreaChart>
          </ChartContainer>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-2">Soil pH Trend</h4>
          <ChartContainer config={chartConfig} className="h-32 w-full">
            <AreaChart data={soilPhData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Area dataKey="ph" type="natural" fill="var(--color-ph)" fillOpacity={0.4} stroke="var(--color-ph)" />
            </AreaChart>
          </ChartContainer>
        </div>

        <div className="p-4 bg-accent rounded-lg">
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0"><Zap className="text-primary" /></div>
                <div>
                    <h4 className="font-semibold text-primary">AI Note</h4>
                    <p className="text-sm text-accent-foreground">
                    Soil pH is stable at 6.8, ideal for maize and beans. With rainfall expected to start in 4 days, now is the perfect time to prepare your land for planting.
                    </p>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
